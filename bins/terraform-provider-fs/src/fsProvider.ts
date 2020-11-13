import { promises as fs } from 'fs';
import * as path from 'path';

import {
  AsyncResponse,
  createSchema,
  createSchemaDescriptor,
  ctyNumber,
  ctyObject,
  ctyString,
  Provider,
  Resource,
  responseDo,
  SchemaConfig,
  Severity,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';

/**
 * The type of a dynamic/any value. The first part is a Buffer with the cty encoding of the actual type
 */
// type Dynamic<T> = [Buffer, T];

let configuredConfig: FsProviderConfig | null = null;

const fsFileSchemaDescriptor = createSchemaDescriptor({
  description: 'a file resource',
  properties: {
    body: {
      ctyType: ctyObject({
        nb_foos: ctyNumber,
      }),
      // description: "The body of the file",
      source: 'required-in-config',

      type: 'raw',
    },
    file_name: {
      ctyType: ctyString,
      // description: "The name of the file to manage",
      source: 'required-in-config',

      type: 'raw',
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

      return SyncResponse.right({
        newState: plannedState,
        privateData: plannedPrivateData,
      });
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
  upgrade(args) {
    return async () => {
      return SyncResponse.right({
        diagnostics: [],
        upgradedState: args.rawState,
      });
    };
  },
  validate({ config }) {
    return async () => {
      if (config.body.nb_foos < 5) {
        return SyncResponse.left([
          {
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
            severity: Severity.ERROR,
            summary: "You need more foo's",
          },
        ]);
      }

      return SyncResponse.right({});
    };
  },
};

const schemaDescriptor = createSchemaDescriptor({
  description: 'test schema',
  properties: {
    root_dir: {
      ctyType: ctyString,
      // description: "The root dir where all files will be stored",
      source: 'required-in-config',

      type: 'raw',
    },
  },
});

type FsProviderConfig = SchemaConfig<typeof schemaDescriptor>;

export const fsProvider: Provider<
  FsProviderConfig,
  null,
  {
    fs_file: FsFileConfig;
  },
  {}
> = {
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
  getDataSources() {
    return {};
  },
  getResources() {
    return {
      fs_file: fsFile,
    };
  },
  getSchema() {
    return createSchema(schemaDescriptor);
  },
  prepareProviderConfig({ config }) {
    return responseDo
      .bind('preparedConfig', AsyncResponse.right(config))
      .doL(() => {
        if (!path.isAbsolute(config.root_dir)) {
          return AsyncResponse.left([
            {
              attribute: {
                steps: [
                  {
                    attribute_name: 'root_dir',
                  },
                ],
              },
              detail: 'You need to provide an absolute path as root_dir',
              severity: Severity.ERROR,
              summary: 'Relative root_dir',
            },
          ]);
        }

        return AsyncResponse.right(null);
      })
      .done();
  },
};
