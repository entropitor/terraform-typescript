import { AttributePath } from '../generated/tfplugin5/AttributePath';
import { SchemaDescriptor } from '../schema/descriptor';
import { SchemaConfig } from '../schema/SchemaConfig';
import { SchemaState } from '../schema/SchemaState';

import { AsyncResponse } from './response';

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
    plannedPrivateData: Buffer;
    plannedState: SchemaState<SD> | null;
    priorState: SchemaState<SD> | null;
  }): AsyncResponse<ApplyChangeResult<SchemaState<SD>>>;

  getSchemaDescriptor(): SD;

  planChange(args: {
    client: Client;
    config: SchemaConfig<SD> | null;
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
  dataSource: Omit<Resource<SD, Client>, 'getSchemaDescriptor'>,
): Resource<SD, Client> => {
  return {
    ...dataSource,
    getSchemaDescriptor() {
      return descriptor;
    },
  };
};
