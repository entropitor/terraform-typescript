import * as TF from "./tfplugin5";
import { GrpcResponse } from "@terraform-typescript/grpc-utils";

type AttributePath = TF.messages.tfplugin5.AttributePath;
type Diagnostic = TF.messages.tfplugin5.Diagnostic;
type Schema = TF.messages.tfplugin5.Schema;

type Response<T> = Promise<GrpcResponse<T>> | GrpcResponse<T>;

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
  validate(args: { config: S }): Response<ValidateResult>;
  planChange(args: {
    config: S | null;
    priorPrivateData: Buffer;
    priorState: S | null;
    proposedNewState: S | null;
  }): Response<PlanChangeResult<S>>;
  applyChange(args: {
    config: S;
    plannedPrivateData: Buffer;
    priorState: S | null;
    plannedState: S | null;
  }): Response<ApplyChangeResult<S>>;
  upgrade(args: { version: number; rawState: any }): Response<UpgradeResult<S>>;
  read(args: {
    currentState: S;
    privateData: Buffer;
  }): Response<ReadResourceResult<S>>;
}

export type ValidateDataSourceResult = {
  diagnostics: Diagnostic[];
};
export type ReadDataSourceResult<State> = {
  diagnostics: Diagnostic[];
  state: State;
};
export interface DataSource<Config, State extends Config> {
  getSchema(): Schema;
  validate(args: { config: Config }): Response<ValidateDataSourceResult>;
  read(args: { config: Config }): Response<ReadDataSourceResult<State>>;
}

type Resources<R extends { [key: string]: any }> = {
  [resourceName in keyof R]: Resource<R[resourceName]>;
};
type DataSources<D extends { [key: string]: [any, any] }> = {
  [dataSourceName in keyof D]: DataSource<
    D[dataSourceName][0],
    D[dataSourceName][1]
  >;
};

export type PrepareConfigureResult = {
  diagnostics: Diagnostic[];
};
export type ConfigureResult = {
  diagnostics: Diagnostic[];
};
export interface Provider<
  S,
  R extends { [key: string]: any },
  D extends { [key: string]: [any, any] }
> {
  getSchema(): Schema;
  getResources(): Resources<R>;
  getDataSources(): DataSources<D>;
  prepareProviderConfig(config: S): Response<PrepareConfigureResult>;
  configure(config: S): Response<ConfigureResult>;
}

export type ProviderSchema<P> = P extends Provider<infer S, any, any>
  ? S
  : never;
