import { Schema } from '../generated/tfplugin5/Schema';
import { SchemaDescriptor } from '../schema/descriptor';
import { SchemaConfig } from '../schema/SchemaConfig';

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

export type PrepareConfigureResult<C> = {
  preparedConfig: C;
};

type ConfigureResult<Client> = {
  client: Client;
};

export type Provider<
  ProviderSchemaDescriptor extends SchemaDescriptor,
  Client,
  R extends Record<string, SchemaDescriptor> = Record<string, SchemaDescriptor>,
  D extends Record<string, SchemaDescriptor> = Record<string, SchemaDescriptor>
> = {
  configure(args: {
    config: SchemaConfig<ProviderSchemaDescriptor>;
    preparedConfig: SchemaConfig<ProviderSchemaDescriptor>;
  }): AsyncResponse<ConfigureResult<Client>>;

  getDataSources(): DataSources<D, Client>;

  getResources(): Resources<R, Client>;

  getSchema(): Schema;

  prepareProviderConfig(args: {
    config: SchemaConfig<ProviderSchemaDescriptor>;
  }): AsyncResponse<
    PrepareConfigureResult<SchemaConfig<ProviderSchemaDescriptor>>
  >;
};
