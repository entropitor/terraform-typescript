import { ctyNumber, ctyString, ctyType } from "./ctyType";
import { StringKind } from "./generated/tfplugin5/StringKind";
import { Provider, Resource } from "./provider";
import * as Either from "fp-ts/Either";
import * as grpc from "@grpc/grpc-js";

interface FsFile {
  nb_foos: number;
}
const fsFile: Resource<FsFile> = {
  validate(config) {
    if (config.nb_foos < 5) {
      return [
        {
          severity: "ERROR",
          attribute: {
            steps: [
              {
                attribute_name: "nb_foos",
              },
            ],
          },
          detail: "Do you not give a foo?",
          summary: "You need more foo's",
        },
      ];
    }
    return [];
  },
  getSchema() {
    return {
      version: 1,
      block: {
        version: 1,
        attributes: [
          {
            name: "nb_foos",
            type: ctyType(ctyNumber()),
            description: "The number of foos",
            required: true,
            optional: false,
            computed: false,
            deprecated: false,
            description_kind: StringKind.PLAIN,
            sensitive: false,
          },
        ],
        block_types: [],
        deprecated: false,
        description: "test resource",
        description_kind: StringKind.PLAIN,
      },
    };
  },
  planChange(args) {
    console.error(args);
    return Either.left({
      code: grpc.status.UNIMPLEMENTED,
    });
  },
};

interface FsProviderSchemaType {
  foo: string;
}
let config: FsProviderSchemaType | null = null;

export const fsProvider: Provider<FsProviderSchemaType, any> = {
  getSchema() {
    return {
      version: 1,
      block: {
        version: 1,
        attributes: [
          {
            name: "foo",
            type: ctyType(ctyString()),
            description: "The foo value",
            description_kind: StringKind.PLAIN,
            required: false,
            optional: false,
            computed: false,
            sensitive: false,
            deprecated: false,
          },
        ],
        block_types: [],
        // blockTypes: [],
        deprecated: false,
        description: "test schema",
        description_kind: StringKind.PLAIN,
      },
    };
  },
  configure(cfg) {
    config = cfg;
    return [];
  },
  getResources() {
    return {
      fs_file: fsFile,
    };
  },
  prepareProviderConfig(cfg) {
    if (cfg.foo !== "bar") {
      return [
        {
          severity: "ERROR",
          attribute: {
            steps: [
              {
                attribute_name: "foo",
              },
            ],
          },
          detail: "That's not a good foo, only bar is a good foo",
          summary: "Bad foo",
        },
      ];
    }

    return [];
  },
};
