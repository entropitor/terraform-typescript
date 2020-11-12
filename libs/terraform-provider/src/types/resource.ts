import { AttributePath } from "src/generated/tfplugin5/AttributePath";
import { Diagnostic } from "src/generated/tfplugin5/Diagnostic";
import { Schema } from "src/generated/tfplugin5/Schema";
import { GrpcAsyncResponse } from "./response";

export type ValidateResult = {
  diagnostics: Diagnostic[];
};
export type ApplyChangeResult<S> = {
  diagnostics: Diagnostic[];
  privateData: Buffer;
  newState: S | null;
};
export type PlanChangeResult<S> = {
  diagnostics: Diagnostic[];
  plannedPrivateData: Buffer;
  plannedState: S | null;
  requiresReplace: AttributePath[];
};
export type UpgradeResult<S> = {
  diagnostics: Diagnostic[];
  upgradedState: S;
};
export type ReadResourceResult<S> = {
  diagnostics: Diagnostic[];
  privateData: Buffer;
  newState: S;
};
export interface Resource<S> {
  getSchema(): Schema;

  validate(args: { config: S }): GrpcAsyncResponse<ValidateResult>;

  planChange(args: {
    config: S | null;
    priorPrivateData: Buffer;
    priorState: S | null;
    proposedNewState: S | null;
  }): GrpcAsyncResponse<PlanChangeResult<S>>;

  applyChange(args: {
    config: S;
    plannedPrivateData: Buffer;
    priorState: S | null;
    plannedState: S | null;
  }): GrpcAsyncResponse<ApplyChangeResult<S>>;

  upgrade(args: {
    version: number;
    rawState: any;
  }): GrpcAsyncResponse<UpgradeResult<S>>;

  read(args: {
    currentState: S;
    privateData: Buffer;
  }): GrpcAsyncResponse<ReadResourceResult<S>>;
}
