import { SchemaDescriptor } from 'src/schema/descriptor';
import { Schema } from '../generated/tfplugin5/Schema';
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
  getSchema(): Schema;

  getResources(): Resources<R>;

  getDataSources(): DataSources<D, Client>;

  prepareProviderConfig(args: {
    config: ProviderSchemaConfig;
  }): AsyncResponse<PrepareConfigureResult<ProviderSchemaConfig>>;

  configure(arsg: {
    config: ProviderSchemaConfig;
    preparedConfig: ProviderSchemaConfig;
  }): AsyncResponse<ConfigureResult<Client>>;
}

export type ProviderSchema<P> = P extends Provider<infer S, any, any, any>
  ? S
  : never;
