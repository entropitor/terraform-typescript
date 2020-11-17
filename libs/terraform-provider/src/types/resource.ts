import * as Either from 'fp-ts/lib/Either';

import { AttributePath } from '../generated/tfplugin5/AttributePath';
import { SchemaDescriptor } from '../schema/descriptor';
import { SchemaConfig } from '../schema/SchemaConfig';
import { SchemaState } from '../schema/SchemaState';

import { AsyncResponse } from './response';
import { PathOf } from './utils/hasChange';

type ValidateResult = {};

type ApplyChangeResult<S> = {
  newState: S | null;
  privateData: Buffer;
};

type PlanChangeResult<S> = {
  plannedPrivateData: Buffer;
  plannedState: S | null;
  requiresReplace: AttributePath[];
};

type UpgradeResult<S> = {
  upgradedState: S;
};

type ReadResourceResult<S> = {
  newState: S | null;
  privateData: Buffer;
};

export interface Resource<SD extends SchemaDescriptor, Client> {
  applyChange(args: {
    client: Client;
    config: SchemaConfig<SD>;
    hasStateChange: (path: PathOf<SchemaState<SD>>) => boolean;
    plannedPrivateData: Buffer;
    plannedState: SchemaState<SD> | null;
    priorState: SchemaState<SD> | null;
  }): AsyncResponse<ApplyChangeResult<SchemaState<SD>>>;

  getSchemaDescriptor(): SD;

  planChange(args: {
    client: Client;
    config: SchemaConfig<SD> | null;
    hasProposedStateChange: (path: PathOf<SchemaState<SD>>) => boolean;
    priorPrivateData: Buffer;
    priorState: SchemaState<SD> | null;
    proposedNewState: SchemaState<SD> | null;
  }): AsyncResponse<PlanChangeResult<SchemaState<SD>>>;

  read(args: {
    client: Client;
    currentState: SchemaState<SD> | null;
    privateData: Buffer;
  }): AsyncResponse<ReadResourceResult<SchemaState<SD>>>;

  upgrade(args: {
    client: Client;
    rawState: any;
    version: number;
  }): AsyncResponse<UpgradeResult<SchemaState<SD>>>;

  validate(args: { config: SchemaConfig<SD> }): AsyncResponse<ValidateResult>;
}

// TODO add "id" field?
export const createResource = <SD extends SchemaDescriptor>(descriptor: SD) => <
  Client = void
>(
  resource: Omit<Resource<SD, Client>, 'getSchemaDescriptor'>,
): Resource<SD, Client> => {
  return {
    ...resource,
    getSchemaDescriptor() {
      return descriptor;
    },
  };
};

type CRUDResource<SD extends SchemaDescriptor, Client> = Pick<
  Resource<SD, Client>,
  'validate' | 'upgrade' | 'read' | 'planChange'
> & {
  create(args: {
    client: Client;
    config: SchemaConfig<SD>;
    plannedPrivateData: Buffer;
    plannedState: SchemaState<SD>;
  }): AsyncResponse<ApplyChangeResult<SchemaState<SD>>>;

  delete(args: {
    client: Client;
    config: SchemaConfig<SD>;
    plannedPrivateData: Buffer;
    priorState: SchemaState<SD>;
  }): AsyncResponse<ApplyChangeResult<SchemaState<SD>>>;

  update(args: {
    client: Client;
    config: SchemaConfig<SD>;
    hasStateChange: (path: PathOf<SchemaState<SD>>) => boolean;
    plannedPrivateData: Buffer;
    plannedState: SchemaState<SD>;
    priorState: SchemaState<SD>;
  }): AsyncResponse<ApplyChangeResult<SchemaState<SD>>>;
};

export const createCRUDResource = <SD extends SchemaDescriptor>(
  descriptor: SD,
) => <Client = void>(
  crudResource: CRUDResource<SD, Client>,
): Resource<SD, Client> => {
  return {
    ...crudResource,
    applyChange({ plannedState, priorState, ...args }) {
      if (priorState == null) {
        if (plannedState == null) {
          throw new Error('plannedState and priorState both null');
        }
        return crudResource.create({ ...args, plannedState });
      }
      if (plannedState == null) {
        return crudResource.delete({ ...args, priorState });
      }

      return crudResource.update({ plannedState, priorState, ...args });
    },
    getSchemaDescriptor() {
      return descriptor;
    },
  };
};
