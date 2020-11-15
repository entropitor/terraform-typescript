import {
  AsyncResponse,
  computedValue,
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
        type: 'attribute',
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
                    type: 'attribute',
                  },
                  id: {
                    ctyType: ctyNumber,
                    source: 'required-in-config',
                    type: 'attribute',
                  },
                  image: {
                    ctyType: ctyString,
                    source: 'computed',
                    type: 'attribute',
                  },
                  name: {
                    ctyType: ctyString,
                    source: 'computed',
                    type: 'attribute',
                  },
                  price: {
                    ctyType: ctyNumber,
                    source: 'computed',
                    type: 'attribute',
                  },
                  teaser: {
                    ctyType: ctyString,
                    source: 'computed',
                    type: 'attribute',
                  },
                },
              },
              maxItems: 1,
              type: 'list',
            },
            quantity: {
              ctyType: ctyNumber,
              source: 'required-in-config',
              type: 'attribute',
            },
          },
        },
        type: 'list',
      },
      last_updated: {
        ctyType: ctyString,
        source: 'computed-but-overridable',
        type: 'attribute',
      },
    },
  },
});

const ctor = createResource(schemaDescriptor);

type StateOrder = SchemaState<typeof schemaDescriptor>;
type StateItem = StateOrder['items'][0];

const transformOrder = (
  order: ApiOrder,
  lastUpdatedAt: Date | null,
): StateOrder => {
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
    last_updated: lastUpdatedAt?.toISOString() ?? null,
  };
};

export const orderResource = ctor<HashicupsApiClient>({
  applyChange({
    client,
    config,
    hasStateChange,
    plannedPrivateData,
    plannedState,
    priorState,
  }) {
    return async () => {
      // priorState == null => create
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
          const order = await client.order.create(orderItems);
          return SyncResponse.right({
            newState: transformOrder(order, null),
            privateData: plannedPrivateData,
          });
        } catch (error) {
          return SyncResponse.fromError('Failure to create order', error);
        }
      }

      // plannedState == null => delete
      if (plannedState == null) {
        const orderId = parseInt(priorState.id, 10);
        try {
          await client.order.delete(orderId);
          return SyncResponse.right({
            newState: null,
            privateData: plannedPrivateData,
          });
        } catch (error) {
          return SyncResponse.fromError('Failure to delete order', error);
        }
      }

      // else: update
      const orderId = parseInt(plannedState.id, 10);
      if (hasStateChange(['items'])) {
        const orderItems = plannedState.items.map((item) => {
          // We have a list with maxItem=1 so there is only one coffee
          const coffee = item.coffee[0];

          return {
            coffee: {
              id: coffee.id,
            },
            quantity: item.quantity,
          };
        });

        try {
          await client.order.update(orderId, orderItems);
          const order = await client.order.get(orderId);
          return SyncResponse.right({
            newState: transformOrder(order, new Date()),
            privateData: plannedPrivateData,
          });
        } catch (error) {
          return SyncResponse.fromError('Failure to update order', error);
        }
      }

      return SyncResponse.right({
        newState: plannedState,
        privateData: plannedPrivateData,
      });
    };
  },
  planChange({ hasProposedStateChange, priorPrivateData, proposedNewState }) {
    if (proposedNewState != null && hasProposedStateChange(['items'])) {
      // @ts-expect-error SchemaState doesn't take computedValue symbol into account
      proposedNewState.last_updated = computedValue; // eslint-disable-line no-param-reassign
    }

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
      const order = await client.order.get(id);

      return SyncResponse.right({
        newState: transformOrder(
          order,
          currentState.last_updated != null
            ? new Date(currentState.last_updated)
            : null,
        ),
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
