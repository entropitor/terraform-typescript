/**
 * Implementing https://learn.hashicorp.com/tutorials/terraform/provider-setup
 */
import * as Either from "fp-ts/Either";
import {
  ctyString,
  ctyType,
  Diagnostic,
  Provider,
  Severity,
  StringKind,
} from "@terraform-typescript/terraform-provider";
import {
  dataSourceCoffees,
  DataSourceCoffeesConfig,
  DataSourceCoffeesState,
} from "./dataSourceCoffees";
import { createApiClient, HashicupsApiClient } from "./apiClient";

interface SchemaType {
  username: string | null;
  password: string | null;
}

export const hashicupsProvider: Provider<
  SchemaType,
  HashicupsApiClient,
  {},
  {
    hashicups_coffees: [DataSourceCoffeesConfig, DataSourceCoffeesState];
  }
> = {
  getSchema() {
    return {
      version: 1,
      block: {
        version: 1,
        attributes: [
          {
            name: "username",
            type: ctyType(ctyString()),
            optional: true,
          },
          {
            name: "password",
            type: ctyType(ctyString()),
            // sensitive: true,
            optional: true,
          },
        ],
        block_types: [],
        deprecated: false,
        description: "hashicups",
        description_kind: StringKind.PLAIN,
      },
    };
  },
  async configure({ preparedConfig }) {
    return Either.right({
      diagnostics: [],
      client: createApiClient({
        username: preparedConfig.username!,
        password: preparedConfig.password!,
      }),
    });
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
    const diagnostics: Diagnostic[] = [];

    const username = config.username || process.env.HASHICUPS_USERNAME || null;
    const password = config.password || process.env.HASHICUPS_PASSWORD || null;

    if (username == null) {
      diagnostics.push({
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
      });
    }

    if (password == null) {
      diagnostics.push({
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
      });
    }

    return Either.right({
      preparedConfig: {
        username,
        password,
      },
      diagnostics,
    });
  },
};
