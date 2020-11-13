import { Schema } from '../generated/tfplugin5/Schema';
import { SchemaDescriptor } from '../schema/descriptor';

import { DataSource } from './dataSource';
import { Resource } from './resource';
import { AsyncResponse } from './response';

type Resources<R extends { [key: string]: any }> = {
  [resourceName in keyof R]: Resource<R[resourceName]>;
};
type DataSources<D extends Record<string, SchemaDescriptor>, Client> = {
  [dataSourceName in keyof D]: DataSource<D[dataSourceName], Client>;
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
  R extends { [key: string]: any },
  D extends { [key: string]: SchemaDescriptor }
> {
  configure(arsg: {
    config: ProviderSchemaConfig;
    preparedConfig: ProviderSchemaConfig;
  }): AsyncResponse<ConfigureResult<Client>>;

  getDataSources(): DataSources<D, Client>;

  getResources(): Resources<R>;

  getSchema(): Schema;

  prepareProviderConfig(args: {
    config: ProviderSchemaConfig;
  }): AsyncResponse<PrepareConfigureResult<ProviderSchemaConfig>>;
}

export type ProviderSchema<P> = P extends Provider<infer S, any, any, any>
  ? S
  : never;
