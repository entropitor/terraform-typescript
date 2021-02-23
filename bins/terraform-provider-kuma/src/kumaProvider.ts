import {
  AsyncResponse,
  attribute,
  createSchema,
  ctyString,
  Provider,
  schema,
} from '@entropitor/terraform-provider-sdk';
import { schemaBlock } from '@entropitor/terraform-provider-sdk/dist/src/schema/descriptor';

import { createKumaClient, KumaClient } from './kumaClient';
import { resourceMesh } from './resourceMesh';

const schemaDescriptor = schema(
  schemaBlock('kuma', {
    apiToken: attribute('required-in-config', ctyString),
    host: attribute('required-in-config', ctyString),
  }),
);

export const kumaProvider: Provider<typeof schemaDescriptor, KumaClient> = {
  configure({ config }) {
    return AsyncResponse.right({
      client: createKumaClient({
        apiToken: config.apiToken,
        host: config.host,
      }),
    });
  },

  getDataSources: () => ({}),

  getResources: () => ({
    kuma_mesh: resourceMesh,
  }),

  getSchema: () => createSchema(schemaDescriptor),

  prepareProviderConfig({ config }) {
    return AsyncResponse.right({
      preparedConfig: {
        apiToken: config.apiToken,
        host: config.host,
      },
    });
  },
};
