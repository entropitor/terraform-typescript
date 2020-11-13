import {
  AsyncResponse,
  createResource,
  createSchemaDescriptor,
} from '@terraform-typescript/terraform-provider';

import { HashicupsApiClient } from './apiClient';

export const orderResourceSchemaDescriptor = createSchemaDescriptor({
  description: 'Order resource',
  properties: {},
});

const ctor = createResource(orderResourceSchemaDescriptor);
export const orderResource = ctor<HashicupsApiClient>({
  applyChange() {
    return AsyncResponse.left([]);
  },
  planChange() {
    return AsyncResponse.left([]);
  },
  read() {
    return AsyncResponse.left([]);
  },
  upgrade() {
    return AsyncResponse.left([]);
  },
  validate() {
    return AsyncResponse.left([]);
  },
});
