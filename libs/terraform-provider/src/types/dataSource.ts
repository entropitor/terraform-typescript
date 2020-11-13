import { SchemaDescriptor } from 'src/schema/descriptor';
import { SchemaConfig } from 'src/schema/SchemaConfig';
import { SchemaState } from 'src/schema/SchemaState';
import { AsyncResponse } from './response';

type ValidateDataSourceResult = {};

type ReadDataSourceResult<State> = {
  state: State | null;
};

export interface DataSource<S extends SchemaDescriptor, Client> {
  getSchemaDescriptor(): S;

  validate(args: {
    config: SchemaConfig<S>;
  }): AsyncResponse<ValidateDataSourceResult>;

  read(args: {
    config: SchemaConfig<S>;
    client: Client;
  }): AsyncResponse<ReadDataSourceResult<SchemaState<S>>>;
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
