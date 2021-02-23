import {
  AsyncResponse,
  attribute,
  createCRUDResource,
  ctyString,
  schema,
  SyncResponse,
} from '@entropitor/terraform-provider-sdk';
import { schemaBlock } from '@entropitor/terraform-provider-sdk/src/schema/descriptor';

import { KumaClient } from './kumaClient';

const schemaDescriptor = schema(
  schemaBlock('Mesh Resource', {
    name: attribute('computed', ctyString),
  }),
);

const resourceCtor = createCRUDResource(schemaDescriptor);

export const resourceMesh = resourceCtor<KumaClient>({
  create({ client, plannedPrivateData, plannedState }) {
    return async () => {
      try {
        const mesh = await client.upsertMesh({ name: plannedState.name });
        return SyncResponse.right({
          newState: {
            id: mesh.name,
            name: mesh.name,
          },
          privateData: plannedPrivateData,
        });
      } catch (error) {
        return SyncResponse.fromError('Error creating mesh resource', error);
      }
    };
  },

  delete({ client, plannedPrivateData, priorState }) {
    return async () => {
      const meshName = priorState.name;
      try {
        await client.deleteMeshByName(meshName);
        return SyncResponse.right({
          newState: null,
          privateData: plannedPrivateData,
        });
      } catch (error) {
        return SyncResponse.fromError('Error deleting mesh resource', error);
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
      const { name } = currentState;
      const mesh = await client.getMesh(name);

      return SyncResponse.right({
        newState: {
          id: mesh.name,
          name: mesh.name,
        },
        privateData,
      });
    };
  },

  update({ plannedPrivateData, plannedState }) {
    return AsyncResponse.right({
      newState: plannedState,
      privateData: plannedPrivateData,
    });
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
