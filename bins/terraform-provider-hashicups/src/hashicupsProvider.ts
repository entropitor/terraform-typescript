import * as Either from "fp-ts/Either";

import {
  ctyNumber,
  ctyObject,
  ctyString,
  ctyType,
  Diagnostic,
  Provider,
  Resource,
  Severity,
  StringKind,
} from "@terraform-typescript/terraform-provider";
import {
  dataSourceCoffees,
  DataSourceCoffeesConfig,
  DataSourceCoffeesState,
} from "./dataSourceCoffees";

interface SchemaType {
  username: string;
  password: string;
}
let config: SchemaType | null = null;

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
          },
          {
            name: "password",
            type: ctyType(ctyString()),
            sensitive: true,
          },
        ],
        block_types: [],
        deprecated: false,
        description: "hashicups",
        description_kind: StringKind.PLAIN,
      },
    };
  },
  async configure(cfg) {
    config = cfg;

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
  prepareProviderConfig(_cfg) {
    const diagnostics: Diagnostic[] = [];

    return Either.right({
      diagnostics,
    });
  },
};
