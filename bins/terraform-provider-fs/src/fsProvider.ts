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

import * as path from "path";
import { promises as fs } from "fs";

/**
 * The type of a dynamic value. The first part is a Buffer with the cty encoding of the actual type
 */
type Dynamic<T> = [Buffer, T];

interface FsFile {
  file_name: string;
  body: {
    nb_foos: number;
  };
  // extra: Dynamic<any>;
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
          // {
          //   name: "extra",
          //   type: ctyType(ctyAny()),
          //   description: "Som extra properties of the file",
          //   description_kind: StringKind.PLAIN,
          //   required: false,
          //   optional: true,
          //   computed: false,
          //   deprecated: false,
          //   sensitive: false,
          // },
        ],
        block_types: [],
        deprecated: false,
        description: "a file resource",
        description_kind: StringKind.PLAIN,
      },
    };
  },
  planChange({ proposedNewState }) {
    return Either.right({
      diagnostics: [],
      plannedPrivateData: Buffer.from("test"),
      plannedState: proposedNewState,
      requiresReplace: [
        {
          steps: [
            {
              attribute_name: "file_name",
            },
          ],
        },
      ],
    });
  },
  async applyChange({ plannedPrivateData, plannedState, priorState }) {
    if (plannedState == null) {
      const fileName = path.resolve(
        configuredConfig!.root_dir,
        priorState!.file_name
      );
      await fs.rm(fileName);

      return Either.right({
        diagnostics: [],
        newState: null,
        privateData: plannedPrivateData,
      });
    }

    const fileName = path.resolve(
      configuredConfig!.root_dir,
      plannedState.file_name
    );
    await fs.writeFile(
      fileName,
      JSON.stringify(
        {
          body: plannedState.body,
        },
        null,
        2
      )
    );

    console.error(plannedState);
    console.error(plannedPrivateData);

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
    const fileName = path.resolve(
      configuredConfig!.root_dir,
      currentState.file_name
    );
    const fileBody = await fs.readFile(fileName);

    const content = JSON.parse(fileBody.toString());
    return Either.right({
      diagnostics: [],
      newState: {
        ...currentState,
        body: content.body,
      },
      privateData,
    });
  },
};

interface FsProviderSchemaType {
  root_dir: string;
}
let configuredConfig: FsProviderSchemaType | null = null;

export const fsProvider: Provider<
  FsProviderSchemaType,
  {
    fs_file: FsFile;
  },
  {}
> = {
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
  async configure({ config }) {
    configuredConfig = config;

    await fs.mkdir(config.root_dir, {
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
  getDataSources() {
    return {};
  },
  prepareProviderConfig({ config }) {
    const diagnostics: Diagnostic[] = [];

    if (!path.isAbsolute(config.root_dir)) {
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
      preparedConfig: config,
      diagnostics,
    });
  },
};
