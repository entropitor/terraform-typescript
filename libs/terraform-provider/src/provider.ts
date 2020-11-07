import { GrpcResponse } from "@terraform-typescript/grpc-utils";
import { AttributePath } from "./generated/tfplugin5/AttributePath";
import { Diagnostic } from "./generated/tfplugin5/Diagnostic";
import { Schema } from "./generated/tfplugin5/Schema";

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
  state: State | null;
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

export type PrepareConfigureResult<C> = {
  diagnostics: Diagnostic[];
  preparedConfig: C;
};
export type ConfigureResult = {
  diagnostics: Diagnostic[];
};
export interface Provider<
  ProviderSchemaConfig,
  R extends { [key: string]: any },
  D extends { [key: string]: [any, any] }
> {
  getSchema(): Schema;
  getResources(): Resources<R>;
  getDataSources(): DataSources<D>;
  prepareProviderConfig(args: {
    config: ProviderSchemaConfig;
  }): Response<PrepareConfigureResult<ProviderSchemaConfig>>;
  configure(arsg: {
    config: ProviderSchemaConfig;
    preparedConfig: ProviderSchemaConfig;
  }): Response<ConfigureResult>;
}

export type ProviderSchema<P> = P extends Provider<infer S, any, any>
  ? S
  : never;
