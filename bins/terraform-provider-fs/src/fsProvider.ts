import { ctyNumber, ctyObject, ctyString, ctyType } from "./ctyType";
import { StringKind } from "./generated/tfplugin5/StringKind";
import { Provider, Resource } from "./provider";
import * as Either from "fp-ts/Either";
import * as grpc from "@grpc/grpc-js";
import { serializeDynamicValue } from "./dynamicValue";

import * as path from "path";
import * as fs from "fs";
import {
  Diagnostic,
  _tfplugin5_Diagnostic_Severity as Severity,
} from "./generated/tfplugin5/Diagnostic";

interface FsFile {
  file_name: string;
  body: {
    nb_foos: number;
  };
}
const fsFile: Resource<FsFile> = {
  validate(config) {
    if (config.body.nb_foos < 5) {
      return [
        {
          severity: Severity.ERROR,
          attribute: {
            steps: [
              {
                attribute_name: "body",
              },
              {
                element_key_string: "nb_foos",
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
            name: "file_name",
            type: ctyType(ctyString()),
            description: "The name of the file to manage",
            required: true,
            optional: false,
            computed: false,
            deprecated: false,
            description_kind: StringKind.PLAIN,
            sensitive: false,
          },
          {
            name: "body",
            type: ctyType(
              ctyObject({
                nb_foos: ctyNumber(),
              })
            ),
            description: "The body of the file",
            description_kind: StringKind.PLAIN,
            required: true,
            optional: false,
            computed: false,
            deprecated: false,
            sensitive: false,
          },
        ],
        block_types: [],
        deprecated: false,
        description: "a file resource",
        description_kind: StringKind.PLAIN,
      },
    };
  },
  planChange(args) {
    console.error(args);
    return Either.right({
      diagnostics: [],
      plannedPrivate: Buffer.from("test"),
      plannedState: args.proposedNewState,
      requiresReplace: [],
    });
  },
  applyChange(args) {
    console.error(args);
    return Either.right({
      diagnostics: [],
      newState: args.plannedState,
      private: args.plannedPrivate,
    });
  },
  upgrade(args) {
    console.error(args);
    return Either.right({
      diagnostics: [],
      upgradedState: args.rawState,
    });
  },
  read(args) {
    console.error(args);
    return Either.right({
      diagnostics: [],
      newState: args.currentState,
      private: args.private,
    });
  },
};

interface FsProviderSchemaType {
  root_dir: string;
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
            name: "root_dir",
            type: ctyType(ctyString()),
            description: "The root dir where all files will be stored",
            description_kind: StringKind.PLAIN,
            required: true,
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
    const diagnostics: Diagnostic[] = [];

    if (!path.isAbsolute(cfg.root_dir)) {
      diagnostics.push({
        severity: Severity.ERROR,
        attribute: {
          steps: [
            {
              attribute_name: "root_dir",
            },
          ],
        },
        detail: "You need to provide an absolute path as root_dir",
        summary: "Relative root_dir",
      });
    }

    return diagnostics;
  },
};
