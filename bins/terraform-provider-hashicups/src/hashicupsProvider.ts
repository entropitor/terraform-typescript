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

interface SchemaType {}
let config: SchemaType | null = null;

export const hashicupsProvider: Provider<SchemaType, {}> = {
  getSchema() {
    return {
      version: 1,
      block: {
        version: 1,
        attributes: [],
        block_types: [],
        // blockTypes: [],
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
  prepareProviderConfig(_cfg) {
    const diagnostics: Diagnostic[] = [];

    return Either.right({
      diagnostics,
    });
  },
};
