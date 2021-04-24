import {
  AsyncResponse,
  Attribute,
  createDataSource,
  Property,
  schema,
  schemaBlock,
  SchemaState,
  Severity,
  SyncResponse,
} from '@entropitor/terraform-provider-sdk';

import { HashicupsApiClient } from './apiClient';

const schemaDescriptor = schema(
  schemaBlock('Order data source', {
    id: Attribute.required.number('The id of the order'),
    items: Property.list(
      schemaBlock('items', {
        coffee_description: Attribute.computed.string(
          'The description of the coffee',
        ),
        coffee_id: Attribute.computed.number('The id of the coffee'),
        coffee_image: Attribute.computed.string('The image of the coffee'),
        coffee_name: Attribute.computed.string('The name of the coffee'),
        coffee_price: Attribute.computed.number('The price of the coffee'),
        coffee_teaser: Attribute.computed.string(
          'The teaser description of the coffee',
        ),
        quantity: Attribute.computed.number('The amount of coffees'),
      }),
    ),
  }),
);

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
