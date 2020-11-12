import { GrpcResponse } from "@terraform-typescript/grpc-utils";
import { Diagnostic } from "src/generated/tfplugin5/Diagnostic";
import { Schema } from "src/generated/tfplugin5/Schema";
import { DataSource } from "./datasource";
import { Resource } from "./resource";
import { GrpcAsyncResponse } from "./response";

type Resources<R extends { [key: string]: any }> = {
  [resourceName in keyof R]: Resource<R[resourceName]>;
};
type DataSources<D extends { [key: string]: [any, any] }, Client> = {
  [dataSourceName in keyof D]: DataSource<
    D[dataSourceName][0],
    D[dataSourceName][1],
    Client
  >;
};

export type PrepareConfigureResult<C> = {
  diagnostics: Diagnostic[];
  preparedConfig: C;
};
export type ConfigureResult<Client> = {
  diagnostics: Diagnostic[];
  client: Client;
};
export interface Provider<
  ProviderSchemaConfig,
  Client,
  R extends { [key: string]: any },
  D extends { [key: string]: [any, any] }
> {
  getSchema(): Schema;

  getResources(): Resources<R>;

  getDataSources(): DataSources<D, Client>;

  prepareProviderConfig(args: {
    config: ProviderSchemaConfig;
  }): GrpcAsyncResponse<PrepareConfigureResult<ProviderSchemaConfig>>;

  configure(arsg: {
    config: ProviderSchemaConfig;
    preparedConfig: ProviderSchemaConfig;
  }): GrpcAsyncResponse<ConfigureResult<Client>>;
}

export type ProviderSchema<P> = P extends Provider<infer S, any, any, any>
  ? S
  : never;
