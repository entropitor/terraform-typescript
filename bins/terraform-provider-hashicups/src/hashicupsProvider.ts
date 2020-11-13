/**
 * Implementing https://learn.hashicorp.com/tutorials/terraform/provider-setup
 */
import * as Either from "fp-ts/Either";
import {
  createSchema,
  ctyString,
  Diagnostic,
  Provider,
  SchemaConfig,
  Severity,
} from "@terraform-typescript/terraform-provider";
import {
  dataSourceCoffees,
  DataSourceCoffeesConfig,
  DataSourceCoffeesState,
} from "./dataSourceCoffees";
import { createApiClient, HashicupsApiClient } from "./apiClient";
import {
  AsyncResponse,
  responseDo,
  SyncResponse,
} from "@terraform-typescript/terraform-provider/dist/src/types/response";

const schemaDescriptor = {
  description: "hashicups",
  properties: {
    username: {
      type: ctyString,
      inConfig: "optional",
      computed: true,
    },
    password: {
      type: ctyString,
      inConfig: "optional",
    },
  },
} as const;

type ProviderConfig = SchemaConfig<typeof schemaDescriptor>;

export const hashicupsProvider: Provider<
  ProviderConfig,
  HashicupsApiClient,
  {},
  {
    hashicups_coffees: [DataSourceCoffeesConfig, DataSourceCoffeesState];
  }
> = {
  getSchema() {
    return createSchema(schemaDescriptor);
  },
  configure({ preparedConfig }) {
    return async () => {
      return SyncResponse.right({
        client: await createApiClient({
          username: preparedConfig.username!,
          password: preparedConfig.password!,
        }),
      });
    };
  },
  getResources() {
    return {};
  },
  getDataSources() {
    return {
      hashicups_coffees: dataSourceCoffees,
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
                  attribute_name: "username",
                },
              ],
            },
            detail:
              "You did not set an username nor an env variable HASHICUPS_USERNAME",
            summary: "Username missing",
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
                  attribute_name: "password",
                },
              ],
            },
            detail:
              "You did not set a password nor an env variable HASHICUPS_PASSWORD",
            summary: "Password missing",
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
