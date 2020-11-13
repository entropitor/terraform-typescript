import { AttributePath } from "src/generated/tfplugin5/AttributePath";
import { Schema } from "src/generated/tfplugin5/Schema";
import { AsyncResponse } from "./response";

type ValidateResult = {};

type ApplyChangeResult<S> = {
  privateData: Buffer;
  newState: S | null;
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
  privateData: Buffer;
  newState: S;
};

export interface Resource<S> {
  getSchema(): Schema;

  validate(args: { config: S }): AsyncResponse<ValidateResult>;

  planChange(args: {
    config: S | null;
    priorPrivateData: Buffer;
    priorState: S | null;
    proposedNewState: S | null;
  }): AsyncResponse<PlanChangeResult<S>>;

  applyChange(args: {
    config: S;
    plannedPrivateData: Buffer;
    priorState: S | null;
    plannedState: S | null;
  }): AsyncResponse<ApplyChangeResult<S>>;

  upgrade(args: {
    version: number;
    rawState: any;
  }): AsyncResponse<UpgradeResult<S>>;

  read(args: {
    currentState: S;
    privateData: Buffer;
  }): AsyncResponse<ReadResourceResult<S>>;
}
