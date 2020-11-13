import {
  AsyncResponse,
  ctyNumber,
  ctyObject,
  ctyString,
  Diagnostic,
  Provider,
  Resource,
  Severity,
  StringKind,
  responseDo,
  SyncResponse,
  createSchemaDescriptor,
  SchemaConfig,
  createSchema,
} from '@terraform-typescript/terraform-provider';

import * as path from 'path';
import { promises as fs } from 'fs';

/**
 * The type of a dynamic/any value. The first part is a Buffer with the cty encoding of the actual type
 */
// type Dynamic<T> = [Buffer, T];

const fsFileSchemaDescriptor = createSchemaDescriptor({
  description: 'a file resource',
  properties: {
    file_name: {
      type: 'raw',
      ctyType: ctyString,
      // description: "The name of the file to manage",
      source: 'required-in-config',
    },
    body: {
      type: 'raw',
      ctyType: ctyObject({
        nb_foos: ctyNumber,
      }),
      // description: "The body of the file",
      source: 'required-in-config',
    },
    // extra: {
    //   type: "raw",
    //   ctyType: ctyAny,
    //   // description: "Som extra properties of the file",
    //   source: "optional-in-config",
    // },
  },
});
type FsFileConfig = SchemaConfig<typeof fsFileSchemaDescriptor>;

const fsFile: Resource<FsFileConfig> = {
  validate({ config }) {
    return async () => {
      if (config.body.nb_foos < 5) {
        return SyncResponse.left([
          {
            severity: Severity.ERROR,
            attribute: {
              steps: [
                {
                  attribute_name: 'body',
                },
                {
                  element_key_string: 'nb_foos',
                },
              ],
            },
            detail: 'Do you not give a foo?',
            summary: "You need more foo's",
          },
        ]);
      }

      return SyncResponse.right({});
    };
  },
  getSchema() {
    return createSchema(fsFileSchemaDescriptor);
  },
  planChange({ proposedNewState }) {
    return async () => {
      return SyncResponse.right({
        diagnostics: [],
        plannedPrivateData: Buffer.from('test'),
        plannedState: proposedNewState,
        requiresReplace: [
          {
            steps: [
              {
                attribute_name: 'file_name',
              },
            ],
          },
        ],
      });
    };
  },
  applyChange({ plannedPrivateData, plannedState, priorState }) {
    return async () => {
      if (plannedState == null) {
        const fileName = path.resolve(
          configuredConfig!.root_dir,
          priorState!.file_name,
        );
        await fs.rm(fileName);

        return SyncResponse.right({
          newState: null,
          privateData: plannedPrivateData,
        });
      }

      const fileName = path.resolve(
        configuredConfig!.root_dir,
        plannedState.file_name,
      );
      await fs.writeFile(
        fileName,
        JSON.stringify(
          {
            body: plannedState.body,
          },
          null,
          2,
        ),
      );

      console.error(plannedState);
      console.error(plannedPrivateData);

      return SyncResponse.right({
        newState: plannedState,
        privateData: plannedPrivateData,
      });
    };
  },
  upgrade(args) {
    return async () => {
      return SyncResponse.right({
        diagnostics: [],
        upgradedState: args.rawState,
      });
    };
  },
  read({ currentState, privateData }) {
    return async () => {
      const fileName = path.resolve(
        configuredConfig!.root_dir,
        currentState.file_name,
      );
      const fileBody = await fs.readFile(fileName);

      const content = JSON.parse(fileBody.toString());
      return SyncResponse.right({
        newState: {
          ...currentState,
          body: content.body,
        },
        privateData,
      });
    };
  },
};

const schemaDescriptor = createSchemaDescriptor({
  description: 'test schema',
  properties: {
    root_dir: {
      type: 'raw',
      ctyType: ctyString,
      // description: "The root dir where all files will be stored",
      source: 'required-in-config',
    },
  },
});

type FsProviderConfig = SchemaConfig<typeof schemaDescriptor>;
let configuredConfig: FsProviderConfig | null = null;

export const fsProvider: Provider<
  FsProviderConfig,
  null,
  {
    fs_file: FsFileConfig;
  },
  {}
> = {
  getSchema() {
    return createSchema(schemaDescriptor);
  },
  configure({ config }) {
    configuredConfig = config;

    return async () => {
      await fs.mkdir(config.root_dir, {
        recursive: true,
      });

      return SyncResponse.right({
        client: null,
      });
    };
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

    return responseDo
      .bind('preparedConfig', AsyncResponse.right(config))
      .doL(() => {
        if (!path.isAbsolute(config.root_dir)) {
          return AsyncResponse.left([
            {
              severity: Severity.ERROR,
              attribute: {
                steps: [
                  {
                    attribute_name: 'root_dir',
                  },
                ],
              },
              detail: 'You need to provide an absolute path as root_dir',
              summary: 'Relative root_dir',
            },
          ]);
        }

        return AsyncResponse.right(null);
      })
      .done();
  },
};
