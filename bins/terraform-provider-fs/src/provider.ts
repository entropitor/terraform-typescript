import * as TF from "./tfplugin5";
import { GrpcResponse } from "@terraform-typescript/grpc-utils";

type AttributePath = TF.messages.tfplugin5.AttributePath;
type Diagnostic = TF.messages.tfplugin5.Diagnostic;
type Schema = TF.messages.tfplugin5.Schema;

export type ApplyChangeResult<S> = {
  diagnostics: Diagnostic[];
  private: Buffer;
  newState: S;
};
export type PlanChangeResult<S> = {
  diagnostics: Diagnostic[];
  plannedPrivate: Buffer;
  plannedState: S;
  requiresReplace: AttributePath[];
};
export interface Resource<S> {
  getSchema(): Schema;
  validate(config: S): Diagnostic[];
  planChange(args: {
    config: S;
    priorPrivate: Buffer;
    priorState: S;
    proposedNewState: S;
  }): GrpcResponse<PlanChangeResult<S>>;
  applyChange(args: {
    config: S;
    plannedPrivate: Buffer;
    priorState: S;
    plannedState: S;
  }): GrpcResponse<ApplyChangeResult<S>>;
}

type Resources<R> = {
  [resourceName in keyof R]: Resource<R[resourceName]>;
};

export interface Provider<S, R> {
  getSchema(): Schema;
  getResources(): Resources<R>;
  prepareProviderConfig(config: S): Diagnostic[];
  configure(config: S): Diagnostic[];
}

export type ProviderSchema<P> = P extends Provider<infer S, any> ? S : never;
