import {
  AsyncResponse,
  attribute,
  computedValue,
  createCRUDResource,
  ctyNumber,
  ctyString,
  listProperty,
  schema,
  SchemaState,
  SyncResponse,
} from '@entropitor/terraform-provider-sdk';
import { schemaBlock } from '@entropitor/terraform-provider-sdk/dist/src/schema/descriptor';

import { ApiOrder, HashicupsApiClient } from './apiClient';

const schemaDescriptor = schema(
  schemaBlock('Order resource', {
    // TODO move to resource itself (?)
    id: attribute('computed', ctyString),
    items: listProperty(
      schemaBlock('the items in the order', {
        coffee: listProperty(
          schemaBlock('the coffee you want to order', {
            description: attribute('computed', ctyString),
            id: attribute('required-in-config', ctyNumber),
            image: attribute('computed', ctyString),
            name: attribute('computed', ctyString),
            price: attribute('computed', ctyNumber),
            teaser: attribute('computed', ctyString),
          }),
          {
            maxItems: 1,
          },
        ),
        quantity: attribute('required-in-config', ctyNumber),
      }),
    ),
    last_updated: attribute('computed-but-overridable', ctyString),
  }),
);

const ctor = createCRUDResource(schemaDescriptor);

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
  create({ client, plannedPrivateData, plannedState }) {
    return async () => {
      const orderItems = plannedState.items.map((item) => {
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
    };
  },

  delete({ client, plannedPrivateData, priorState }) {
    return async () => {
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

  update({ client, hasStateChange, plannedPrivateData, plannedState }) {
    return async () => {
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

  upgrade({ rawState }) {
    return AsyncResponse.right({
      upgradedState: rawState,
    });
  },

  validate() {
    return AsyncResponse.right({});
  },
});
