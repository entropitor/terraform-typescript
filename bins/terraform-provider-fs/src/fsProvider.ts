import { promises as fs } from 'fs';
import * as path from 'path';

import {
  AsyncResponse,
  attribute,
  createSchema,
  ctyString,
  Provider,
  schema,
  Severity,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';
import { schemaBlock } from '@terraform-typescript/terraform-provider/dist/src/schema/descriptor';

import { FsClient } from './fsClient';
import { fsFileResource } from './fsFileResource';

const schemaDescriptor = schema(
  schemaBlock('test schema', {
    // description: "The root dir where all files will be stored",
    root_dir: attribute('required-in-config', ctyString),
  }),
);

export const fsProvider: Provider<typeof schemaDescriptor, FsClient> = {
  configure({ config }) {
    return async () => {
      await fs.mkdir(config.root_dir, {
        recursive: true,
      });

      return SyncResponse.right({
        client: {
          config,
        },
      });
    };
  },
  getDataSources() {
    return {};
  },
  getResources() {
    return {
      fs_file: fsFileResource,
    };
  },
  getSchema() {
    return createSchema(schemaDescriptor);
  },
  prepareProviderConfig({ config }) {
    return AsyncResponse.Do.bind('preparedConfig', AsyncResponse.right(config))
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
