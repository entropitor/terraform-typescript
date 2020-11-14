import { promises as fs } from 'fs';
import * as path from 'path';

import {
  createResource,
  ctyNumber,
  ctyObject,
  ctyString,
  Severity,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';

import { FsClient } from './fsClient';

/**
 * The type of a dynamic/any value. The first part is a Buffer with the cty encoding of the actual type
 */
// type Dynamic<T> = [Buffer, T];

const ctor = createResource({
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

export const fsFileResource = ctor<FsClient>({
  applyChange({ client, plannedPrivateData, plannedState, priorState }) {
    return async () => {
      if (plannedState == null) {
        const fileName = path.resolve(
          client.config.root_dir,
          priorState!.file_name,
        );
        await fs.rm(fileName);

        return SyncResponse.right({
          newState: null,
          privateData: plannedPrivateData,
        });
      }

      const fileName = path.resolve(
        client.config.root_dir,
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
  read({ client, currentState, privateData }) {
    return async () => {
      if (currentState == null) {
        return SyncResponse.right({
          newState: null,
          privateData,
        });
      }

      const fileName = path.resolve(
        client.config.root_dir,
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
});
