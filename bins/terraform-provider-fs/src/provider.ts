import * as TF from "./tfplugin5";
import { GrpcResponse } from "@terraform-typescript/grpc-utils";

type AttributePath = TF.messages.tfplugin5.AttributePath;
type Diagnostic = TF.messages.tfplugin5.Diagnostic;
type Schema = TF.messages.tfplugin5.Schema;

export type ValidateResult = {
  diagnostics: Diagnostic[];
};
export type ApplyChangeResult<S> = {
  diagnostics: Diagnostic[];
  privateData: Buffer;
  newState: S;
};
export type PlanChangeResult<S> = {
  diagnostics: Diagnostic[];
  plannedPrivateData: Buffer;
  plannedState: S;
  requiresReplace: AttributePath[];
};
export type UpgradeResult<S> = {
  diagnostics: Diagnostic[];
  upgradedState: S;
};
export type ReadResult<S> = {
  diagnostics: Diagnostic[];
  privateData: Buffer;
  newState: S;
};

type Response<T> = Promise<GrpcResponse<T>> | GrpcResponse<T>;

export interface Resource<S> {
  getSchema(): Schema;
  validate(args: { config: S }): Response<ValidateResult>;
  planChange(args: {
    config: S;
    priorPrivateData: Buffer;
    priorState: S;
    proposedNewState: S;
  }): Response<PlanChangeResult<S>>;
  applyChange(args: {
    config: S;
    plannedPrivateData: Buffer;
    priorState: S;
    plannedState: S;
  }): Response<ApplyChangeResult<S>>;
  upgrade(args: { version: number; rawState: any }): Response<UpgradeResult<S>>;
  read(args: { currentState: S; privateData: Buffer }): Response<ReadResult<S>>;
}

type Resources<R> = {
  [resourceName in keyof R]: Resource<R[resourceName]>;
};

export type PrepareConfigureResult = {
  diagnostics: Diagnostic[];
};
export type ConfigureResult = {
  diagnostics: Diagnostic[];
};
export interface Provider<S, R> {
  getSchema(): Schema;
  getResources(): Resources<R>;
  prepareProviderConfig(config: S): Response<PrepareConfigureResult>;
  configure(config: S): Response<ConfigureResult>;
}

export type ProviderSchema<P> = P extends Provider<infer S, any> ? S : never;
