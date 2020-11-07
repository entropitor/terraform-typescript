/**
 * Implementing https://learn.hashicorp.com/tutorials/terraform/provider-setup
 */
import * as Either from "fp-ts/Either";
import {
  ctyString,
  ctyType,
  Diagnostic,
  Provider,
  StringKind,
} from "@terraform-typescript/terraform-provider";
import {
  dataSourceCoffees,
  DataSourceCoffeesConfig,
  DataSourceCoffeesState,
} from "./dataSourceCoffees";

interface SchemaType {
  username: string | null;
  password: string | null;
}
let configuredConfig: SchemaType | null = null;

export const hashicupsProvider: Provider<
  SchemaType,
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
    configuredConfig = preparedConfig;

    return Either.right({
      diagnostics: [],
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

    console.error(config.username || process.env.HASHICUPS_USERNAME);

    return Either.right({
      preparedConfig: {
        username: config.username || process.env.HASHICUPS_USERNAME || null,
        password: config.password || process.env.HASHICUPS_PASSWORD || null,
      },
      diagnostics,
    });
  },
};
