import { ctyNumber, ctyObject, ctyString, ctyType } from "./ctyType";
import { StringKind } from "./generated/tfplugin5/StringKind";
import { Provider, Resource } from "./provider";
import * as Either from "fp-ts/Either";
import * as grpc from "@grpc/grpc-js";
import { serializeDynamicValue } from "./dynamicValue";

import * as path from "path";
import { promises as fs } from "fs";
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
  validate({ config }) {
    const diagnostics: Diagnostic[] = [];
    if (config.body.nb_foos < 5) {
      diagnostics.push({
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
      });
    }

    return Either.right({
      diagnostics,
    });
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
      plannedPrivateData: Buffer.from("test"),
      plannedState: args.proposedNewState,
      requiresReplace: [],
    });
  },
  async applyChange({ plannedPrivateData, plannedState }) {
    const fileName = path.resolve(config!.root_dir, plannedState.file_name);
    await fs.writeFile(fileName, JSON.stringify(plannedState.body, null, 2));

    return Either.right({
      diagnostics: [],
      newState: plannedState,
      privateData: plannedPrivateData,
    });
  },
  upgrade(args) {
    console.error(args);
    return Either.right({
      diagnostics: [],
      upgradedState: args.rawState,
    });
  },
  async read({ currentState, privateData }) {
    const fileName = path.resolve(config!.root_dir, currentState.file_name);
    const body = await fs.readFile(fileName);

    return Either.right({
      diagnostics: [],
      newState: {
        ...currentState,
        body: JSON.parse(body.toString()),
      },
      privateData,
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
  async configure(cfg) {
    config = cfg;

    await fs.mkdir(cfg.root_dir, {
      recursive: true,
    });

    return Either.right({
      diagnostics: [],
    });
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

    return Either.right({
      diagnostics,
    });
  },
};
