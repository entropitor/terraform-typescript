/**
 * Implementing https://learn.hashicorp.com/tutorials/terraform/provider-setup
 */
import {
  AsyncResponse,
  Attribute,
  createSchema,
  Provider,
  schema,
  schemaBlock,
  Severity,
  SyncResponse,
} from '@entropitor/terraform-provider-sdk';

import { createApiClient, HashicupsApiClient } from './apiClient';
import { coffeesDataSource } from './coffeesDataSource';
import { orderDataSource } from './orderDataSource';
import { orderResource } from './orderResource';

const schemaDescriptor = schema(
  schemaBlock('hashicups', {
    password: Attribute.optional.string('The password for the provider'),
    username: Attribute.optional.string('The username for the provider'),
  }),
);

export const hashicupsProvider: Provider<
  typeof schemaDescriptor,
  HashicupsApiClient
> = {
  configure({ preparedConfig }) {
    return async () => {
      try {
        return SyncResponse.right({
          client: await createApiClient({
            password: preparedConfig.password!,
            username: preparedConfig.username!,
          }),
        });
      } catch (error) {
        return SyncResponse.left([
          {
            detail: error.message,
            severity: Severity.ERROR,
            summary: 'Wrong credentials (?)',
          },
        ]);
      }
    };
  },
  getDataSources() {
    return {
      hashicups_coffees: coffeesDataSource,
      hashicups_order: orderDataSource,
    };
  },
  getResources() {
    return {
      hashicups_order: orderResource,
    };
  },
  getSchema() {
    return createSchema(schemaDescriptor);
  },
  prepareProviderConfig({ config }) {
    const usernameTask = async () => {
      const username = config.username || process.env.HASHICUPS_USERNAME;
      if (username == null) {
        return SyncResponse.left([
          {
            attribute: {
              steps: [
                {
                  attribute_name: 'username',
                },
              ],
            },
            detail:
              'You did not set an username nor an env variable HASHICUPS_USERNAME',
            severity: Severity.ERROR,
            summary: 'Username missing',
          },
        ]);
      }
      return SyncResponse.right(username);
    };

    const passwordTask = async () => {
      const password = config.password || process.env.HASHICUPS_PASSWORD;
      if (password == null) {
        return SyncResponse.left([
          {
            attribute: {
              steps: [
                {
                  attribute_name: 'password',
                },
              ],
            },
            detail:
              'You did not set a password nor an env variable HASHICUPS_PASSWORD',
            severity: Severity.ERROR,
            summary: 'Password missing',
          },
        ]);
      }
      return SyncResponse.right(password);
    };

    return AsyncResponse.Do.sequenceSL(() => {
      return {
        password: passwordTask,
        username: usernameTask,
      };
    }).return(({ password, username }) => ({
      preparedConfig: {
        password,
        username,
      },
    }));
  },
};
