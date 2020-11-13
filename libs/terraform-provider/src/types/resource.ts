import { AttributePath } from '../generated/tfplugin5/AttributePath';
import { Schema } from '../generated/tfplugin5/Schema';

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
  newState: S;
  privateData: Buffer;
};

export interface Resource<S> {
  applyChange(args: {
    config: S;
    plannedPrivateData: Buffer;
    plannedState: S | null;
    priorState: S | null;
  }): AsyncResponse<ApplyChangeResult<S>>;

  getSchema(): Schema;

  planChange(args: {
    config: S | null;
    priorPrivateData: Buffer;
    priorState: S | null;
    proposedNewState: S | null;
  }): AsyncResponse<PlanChangeResult<S>>;

  read(args: {
    currentState: S;
    privateData: Buffer;
  }): AsyncResponse<ReadResourceResult<S>>;

  upgrade(args: {
    rawState: any;
    version: number;
  }): AsyncResponse<UpgradeResult<S>>;

  validate(args: { config: S }): AsyncResponse<ValidateResult>;
}
