import { Schema } from '../generated/tfplugin5/Schema';
import { SchemaDescriptor } from '../schema/descriptor';

import { DataSource } from './dataSource';
import { Resource } from './resource';
import { AsyncResponse } from './response';

export type StringKeys<T> = {
  [P in keyof T]: T[P] extends string ? P : never;
}[keyof T];

type Resources<R extends Record<string, SchemaDescriptor>, Client> = {
  [resourceName in StringKeys<R>]: Resource<R[resourceName], Client>;
};
type DataSources<D extends Record<string, SchemaDescriptor>, Client> = {
  [dataSourceName in StringKeys<D>]: DataSource<D[dataSourceName], Client>;
};

type PrepareConfigureResult<C> = {
  preparedConfig: C;
};

type ConfigureResult<Client> = {
  client: Client;
};

export interface Provider<
  ProviderSchemaConfig,
  Client,
  R extends { [key: string]: SchemaDescriptor },
  D extends { [key: string]: SchemaDescriptor }
> {
  configure(arsg: {
    config: ProviderSchemaConfig;
    preparedConfig: ProviderSchemaConfig;
  }): AsyncResponse<ConfigureResult<Client>>;

  getDataSources(): DataSources<D, Client>;

  getResources(): Resources<R, Client>;

  getSchema(): Schema;

  prepareProviderConfig(args: {
    config: ProviderSchemaConfig;
  }): AsyncResponse<PrepareConfigureResult<ProviderSchemaConfig>>;
}

export type ProviderSchema<P> = P extends Provider<infer S, any, any, any>
  ? S
  : never;
