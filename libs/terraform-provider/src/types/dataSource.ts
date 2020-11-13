import { SchemaDescriptor } from '../schema/descriptor';
import { SchemaConfig } from '../schema/SchemaConfig';
import { SchemaState } from '../schema/SchemaState';

import { AsyncResponse } from './response';

type ValidateDataSourceResult = {};

type ReadDataSourceResult<State> = {
  state: State | null;
};

export interface DataSource<S extends SchemaDescriptor, Client> {
  getSchemaDescriptor(): S;

  read(args: {
    client: Client;
    config: SchemaConfig<S>;
  }): AsyncResponse<ReadDataSourceResult<SchemaState<S>>>;

  validate(args: {
    config: SchemaConfig<S>;
  }): AsyncResponse<ValidateDataSourceResult>;
}

export const createDataSource = <S extends SchemaDescriptor>(descriptor: S) => <
  Client
>(
  dataSource: Omit<DataSource<S, Client>, 'getSchemaDescriptor'>,
): DataSource<S, Client> => {
  return {
    ...dataSource,
    getSchemaDescriptor() {
      return descriptor;
    },
  };
};
