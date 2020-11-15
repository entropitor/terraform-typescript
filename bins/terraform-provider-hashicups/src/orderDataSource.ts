import {
  AsyncResponse,
  attribute,
  createDataSource,
  ctyNumber,
  ctyString,
  listProperty,
  schema,
  SchemaState,
  Severity,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';

import { HashicupsApiClient } from './apiClient';

const schemaDescriptor = schema({
  description: 'Order data source',
  properties: {
    id: attribute('required-in-config', ctyNumber),
    items: listProperty({
      description: 'items',
      properties: {
        coffee_description: attribute('computed', ctyString),
        coffee_id: attribute('computed', ctyNumber),
        coffee_image: attribute('computed', ctyString),
        coffee_name: attribute('computed', ctyString),
        coffee_price: attribute('computed', ctyNumber),
        coffee_teaser: attribute('computed', ctyString),
        quantity: attribute('computed', ctyNumber),
      },
    }),
  },
});

type Item = SchemaState<typeof schemaDescriptor>['items'][number];

const ctor = createDataSource(schemaDescriptor);

export const orderDataSource = ctor<HashicupsApiClient>({
  read({ client, config }) {
    return async () => {
      try {
        const order = await client.order.get(config.id);
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
