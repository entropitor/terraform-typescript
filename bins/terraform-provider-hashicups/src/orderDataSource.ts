import {
  AsyncResponse,
  createDataSource,
  createSchemaDescriptor,
  ctyNumber,
  ctyString,
  SchemaState,
  Severity,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';

import { HashicupsApiClient } from './apiClient';

const schemaDescriptor = createSchemaDescriptor({
  description: 'Order data source',
  properties: {
    id: {
      ctyType: ctyNumber,
      source: 'required-in-config',
      type: 'raw',
    },
    items: {
      itemType: {
        description: 'items',
        properties: {
          coffee_description: {
            ctyType: ctyString,
            source: 'computed',
            type: 'raw',
          },
          coffee_id: {
            ctyType: ctyNumber,
            source: 'computed',
            type: 'raw',
          },
          coffee_image: {
            ctyType: ctyString,
            source: 'computed',
            type: 'raw',
          },
          coffee_name: {
            ctyType: ctyString,
            source: 'computed',
            type: 'raw',
          },
          coffee_price: {
            ctyType: ctyNumber,
            source: 'computed',
            type: 'raw',
          },
          coffee_teaser: {
            ctyType: ctyString,
            source: 'computed',
            type: 'raw',
          },
          quantity: {
            ctyType: ctyNumber,
            source: 'computed',
            type: 'raw',
          },
        },
      },
      type: 'list',
    },
  },
});

type Item = SchemaState<typeof schemaDescriptor>['items'][number];

const ctor = createDataSource(schemaDescriptor);

export const orderDataSource = ctor<HashicupsApiClient>({
  read({ client, config }) {
    return async () => {
      try {
        const order = await client.getOrder(config.id);
        return SyncResponse.right({
          state: {
            id: config.id,
            items: order.items.map(
              (orderItem): Item => ({
                coffee_description: orderItem.coffee.description,
                coffee_id: orderItem.coffee.id,
                coffee_image: orderItem.coffee.image,
                coffee_name: orderItem.coffee.name,
                coffee_price: orderItem.coffee.price,
                coffee_teaser: orderItem.coffee.teaser,
                quantity: orderItem.quantity,
              }),
            ),
          },
        });
      } catch (error) {
        return SyncResponse.left([
          {
            detail: error.toString(),
            severity: Severity.ERROR,
            summary: 'Failure to fetch',
          },
        ]);
      }
    };
  },
  validate() {
    return AsyncResponse.right({});
  },
});
