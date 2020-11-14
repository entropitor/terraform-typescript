import {
  AsyncResponse,
  createResource,
  createSchemaDescriptor,
  ctyNumber,
  ctyString,
} from '@terraform-typescript/terraform-provider';

import { HashicupsApiClient } from './apiClient';

const schemaDescriptor = createSchemaDescriptor({
  description: 'Order resource',
  properties: {
    items: {
      itemType: {
        description: 'the items in the order',
        properties: {
          coffee: {
            itemType: {
              description: 'the coffee you want to order',
              properties: {
                description: {
                  ctyType: ctyString,
                  source: 'computed',
                  type: 'raw',
                },
                id: {
                  ctyType: ctyNumber,
                  source: 'required-in-config',
                  type: 'raw',
                },
                image: {
                  ctyType: ctyString,
                  source: 'computed',
                  type: 'raw',
                },
                name: {
                  ctyType: ctyString,
                  source: 'computed',
                  type: 'raw',
                },
                price: {
                  ctyType: ctyNumber,
                  source: 'computed',
                  type: 'raw',
                },
                teaser: {
                  ctyType: ctyString,
                  source: 'computed',
                  type: 'raw',
                },
              },
            },
            maxItems: 1,
            type: 'list',
          },
          quantity: {
            ctyType: ctyNumber,
            source: 'required-in-config',
            type: 'raw',
          },
        },
      },
      type: 'list',
    },
  },
});

const ctor = createResource(schemaDescriptor);

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
