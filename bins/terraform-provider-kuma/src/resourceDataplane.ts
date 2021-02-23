/* eslint-disable sonarjs/no-identical-functions */
import {
  AsyncResponse,
  attribute,
  createCRUDResource,
  ctyNumber,
  ctyString,
  listProperty,
  schema,
  SchemaState,
  SyncResponse,
} from '@entropitor/terraform-provider-sdk';
import { schemaBlock } from '@entropitor/terraform-provider-sdk/src/schema/descriptor';

import { Dataplane, KumaClient } from './kumaClient';

const schemaDescriptor = schema(
  schemaBlock('Dataplane Resource', {
    mesh: attribute('computed', ctyString),
    name: attribute('computed', ctyString),
    networking: listProperty(
      schemaBlock('networking', {
        address: attribute('computed', ctyString),
        gateway: listProperty(
          schemaBlock('gateway', {
            tags: attribute('computed', ctyString),
          }),
          { maxItems: 1 },
        ),
        inbound: listProperty(
          schemaBlock('gateway', {
            port: attribute('computed', ctyNumber),
            servicePort: attribute('computed', ctyNumber),
            tags: attribute('computed', ctyString),
          }),
        ),
        outbound: listProperty(
          schemaBlock('gateway', {
            port: attribute('computed', ctyNumber),
            service: attribute('computed', ctyString),
          }),
        ),
      }),
      {
        maxItems: 1,
        minItems: 1,
      },
    ),
  }),
);

type StateDataplane = SchemaState<typeof schemaDescriptor>;

const resourceCtor = createCRUDResource(schemaDescriptor);

const transformDataplane = (dataplane: Dataplane): StateDataplane => {
  return {
    mesh: dataplane.mesh,
    name: dataplane.name,
    networking: [
      {
        address: dataplane.networking.address,
        gateway: [
          {
            tags: JSON.stringify(dataplane.networking.gateway.tags),
          },
        ],
        inbound: dataplane.networking.inbound.map((inbound) => {
          return {
            port: inbound.port,
            servicePort: inbound.servicePort,
            tags: JSON.stringify(inbound.tags),
          };
        }),
        outbound: dataplane.networking.outbound.map((outbound) => {
          return {
            port: outbound.port,
            service: outbound.service,
          };
        }),
      },
    ],
  };
};

export const resourceDataplane = resourceCtor<KumaClient>({
  create({ client, plannedPrivateData, plannedState }) {
    return async () => {
      const dataplane: Dataplane = {
        mesh: plannedState.mesh,
        name: plannedState.name,
        networking: {
          address: plannedState.networking[0].address,
          gateway: {
            tags: JSON.parse(plannedState.networking[0].gateway[0].tags),
          },
          inbound: plannedState.networking[0].inbound.map((inbound) => {
            return {
              port: inbound.port,
              servicePort: inbound.servicePort,
              tags: JSON.parse(inbound.tags),
            };
          }),
          outbound: plannedState.networking[0].outbound.map((outbound) => {
            return {
              port: outbound.port,
              service: outbound.service,
            };
          }),
        },
      };

      try {
        const newDataplane = await client.upsertDataplane(dataplane);
        return SyncResponse.right({
          newState: transformDataplane(newDataplane),
          privateData: plannedPrivateData,
        });
      } catch (error) {
        return SyncResponse.fromError('Error creating dataplane', error);
      }
    };
  },

  delete({ client, plannedPrivateData, priorState }) {
    return async () => {
      const { mesh, name: dataplane } = priorState;
      try {
        await client.deleteDataplaneByName(mesh, dataplane);
        return SyncResponse.right({
          newState: null,
          privateData: plannedPrivateData,
        });
      } catch (error) {
        return SyncResponse.fromError('Error deleting dataplane', error);
      }
    };
  },

  planChange({ priorPrivateData, proposedNewState }) {
    // if (proposedNewState != null && hasProposedStateChange(['items'])) {
    //   // @ts-expect-error SchemaState doesn't take computedValue symbol into account
    //   proposedNewState.last_updated = computedValue; // eslint-disable-line no-param-reassign
    // }

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

      const { mesh, name } = currentState;
      const dataplane = await client.getDataplane(mesh, name);

      return SyncResponse.right({
        newState: transformDataplane(dataplane),
        privateData,
      });
    };
  },

  update({ client, hasStateChange, plannedPrivateData, plannedState }) {
    return async () => {
      if (hasStateChange(['networking'])) {
        const dataplane: Dataplane = {
          mesh: plannedState.mesh,
          name: plannedState.name,
          networking: {
            address: plannedState.networking[0].address,
            gateway: {
              tags: JSON.parse(plannedState.networking[0].gateway[0].tags),
            },
            inbound: plannedState.networking[0].inbound.map((inbound) => {
              return {
                port: inbound.port,
                servicePort: inbound.servicePort,
                tags: JSON.parse(inbound.tags),
              };
            }),
            outbound: plannedState.networking[0].outbound.map((outbound) => {
              return {
                port: outbound.port,
                service: outbound.service,
              };
            }),
          },
        };

        try {
          const newDataplane = await client.upsertDataplane(dataplane);
          return SyncResponse.right({
            newState: transformDataplane(newDataplane),
            privateData: plannedPrivateData,
          });
        } catch (error) {
          return SyncResponse.fromError('Error creating dataplane', error);
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
