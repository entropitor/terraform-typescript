/**
 * Implementing https://learn.hashicorp.com/tutorials/terraform/provider-setup
 */
import {
  createSchemaDescriptor,
  createSchema,
  ctyString,
  Provider,
  SchemaConfig,
  Severity,
  responseDo,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';
import {
  dataSourceCoffees,
  dataSourceCoffeesSchemaDescriptor,
} from './dataSourceCoffees';
import { createApiClient, HashicupsApiClient } from './apiClient';
import {
  dataSourceOrder,
  dataSourceOrderSchemaDescriptor,
} from './dataSourceOrder';

const schemaDescriptor = createSchemaDescriptor({
  description: 'hashicups',
  properties: {
    username: {
      type: 'raw',
      ctyType: ctyString,
      source: 'computed-but-overridable',
    },
    password: {
      type: 'raw',
      ctyType: ctyString,
      source: 'optional-in-config',
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
  getSchema() {
    return createSchema(schemaDescriptor);
  },
  configure({ preparedConfig }) {
    return async () => {
      try {
        return SyncResponse.right({
          client: await createApiClient({
            username: preparedConfig.username!,
            password: preparedConfig.password!,
          }),
        });
      } catch (error) {
        return SyncResponse.left([
          {
            severity: Severity.ERROR,
            detail: error.message,
            summary: 'Wrong credentials (?)',
          },
        ]);
      }
    };
  },
  getResources() {
    return {};
  },
  getDataSources() {
    return {
      hashicups_coffees: dataSourceCoffees,
      hashicups_order: dataSourceOrder,
    };
  },
  prepareProviderConfig({ config }) {
    const usernameTask = async () => {
      const username = config.username || process.env.HASHICUPS_USERNAME;
      if (username == null) {
        return SyncResponse.left([
          {
            severity: Severity.ERROR,
            attribute: {
              steps: [
                {
                  attribute_name: 'username',
                },
              ],
            },
            detail:
              'You did not set an username nor an env variable HASHICUPS_USERNAME',
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
            severity: Severity.ERROR,
            attribute: {
              steps: [
                {
                  attribute_name: 'password',
                },
              ],
            },
            detail:
              'You did not set a password nor an env variable HASHICUPS_PASSWORD',
            summary: 'Password missing',
          },
        ]);
      }
      return SyncResponse.right(password);
    };

    return responseDo
      .sequenceSL(() => {
        return {
          username: usernameTask,
          password: passwordTask,
        };
      })
      .return(({ username, password }) => ({
        preparedConfig: {
          username,
          password,
        },
      }));
  },
};
