/**
 * Implementing https://learn.hashicorp.com/tutorials/terraform/provider-setup
 */
import {
  createSchema,
  createSchemaDescriptor,
  ctyString,
  Provider,
  responseDo,
  SchemaConfig,
  Severity,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';

import { createApiClient, HashicupsApiClient } from './apiClient';
import {
  dataSourceCoffees,
  dataSourceCoffeesSchemaDescriptor,
} from './dataSourceCoffees';
import {
  dataSourceOrder,
  dataSourceOrderSchemaDescriptor,
} from './dataSourceOrder';

const schemaDescriptor = createSchemaDescriptor({
  description: 'hashicups',
  properties: {
    password: {
      ctyType: ctyString,
      source: 'optional-in-config',
      type: 'raw',
    },
    username: {
      ctyType: ctyString,
      source: 'computed-but-overridable',
      type: 'raw',
    },
  },
});

type ProviderConfig = SchemaConfig<typeof schemaDescriptor>;

export const hashicupsProvider: Provider<
  ProviderConfig,
  HashicupsApiClient,
  {},
  {
    hashicups_coffees: typeof dataSourceCoffeesSchemaDescriptor;
    hashicups_order: typeof dataSourceOrderSchemaDescriptor;
  }
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
      hashicups_coffees: dataSourceCoffees,
      hashicups_order: dataSourceOrder,
    };
  },
  getResources() {
    return {};
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

    return responseDo
      .sequenceSL(() => {
        return {
          password: passwordTask,
          username: usernameTask,
        };
      })
      .return(({ password, username }) => ({
        preparedConfig: {
          password,
          username,
        },
      }));
  },
};
