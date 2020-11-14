import {
  AsyncResponse,
  createResource,
  createSchemaDescriptor,
  ctyNumber,
  ctyString,
  SchemaState,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';

import { ApiOrder, HashicupsApiClient } from './apiClient';

const schemaDescriptor = createSchemaDescriptor({
  block: {
    description: 'Order resource',
    properties: {
      // TODO move to resource itself
      id: {
        ctyType: ctyString,
        source: 'computed',
        type: 'raw',
      },
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
  },
});

const ctor = createResource(schemaDescriptor);

type StateOrder = SchemaState<typeof schemaDescriptor>;
type StateItem = StateOrder['items'][0];

const transformOrder = (order: ApiOrder): StateOrder => {
  return {
    id: `${order.id}`,
    items: order.items.map(
      (item): StateItem => ({
        coffee: [
          {
            description: item.coffee.description,
            id: item.coffee.id,
            image: item.coffee.image,
            name: item.coffee.name,
            price: item.coffee.price,
            teaser: item.coffee.teaser,
          },
        ],
        quantity: item.quantity,
      }),
    ),
  };
};

export const orderResource = ctor<HashicupsApiClient>({
  applyChange({ client, config, priorState }) {
    // priorState == null => create
    return async () => {
      if (priorState == null) {
        const orderItems = config.items.map((item) => {
          // We have a list with maxItem=1 so there is only one coffee
          const coffee = item.coffee[0];

          return {
            coffee,
            quantity: item.quantity,
          };
        });

        try {
          const order = await client.createOrder(orderItems);
          return SyncResponse.right({
            newState: transformOrder(order),
            privateData: Buffer.from([]),
          });
        } catch (error) {
          return SyncResponse.fromError('Failure to create order', error);
        }
      }

      return SyncResponse.left([]);
    };
  },
  planChange({ priorPrivateData, proposedNewState }) {
    return AsyncResponse.right({
      plannedPrivateData: priorPrivateData,
      plannedState: proposedNewState,
      requiresReplace: [],
    });
  },
  read({ client, currentState, privateData }) {
    return async () => {
      if (currentState == null) {
        return SyncResponse.right({
          newState: null,
          privateData,
        });
      }

      const id = parseInt(currentState.id, 10);
      const order = await client.getOrder(id);

      return SyncResponse.right({
        newState: transformOrder(order),
        privateData,
      });
    };
  },
  upgrade({ rawState }) {
    return AsyncResponse.right({
      upgradedState: rawState,
    });
  },
  validate() {
    return AsyncResponse.right({});
  },
});
