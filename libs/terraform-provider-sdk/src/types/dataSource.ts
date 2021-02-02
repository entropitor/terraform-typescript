import { SchemaDescriptor } from '../schema/descriptor';
import { SchemaConfig } from '../schema/SchemaConfig';
import { SchemaState } from '../schema/SchemaState';

import { AsyncResponse } from './response';

type ValidateDataSourceResult = {};

type ReadDataSourceResult<State> = {
  state: State | null;
};

export interface DataSource<SD extends SchemaDescriptor, Client> {
  getSchemaDescriptor(): SD;

  read(args: {
    client: Client;
    config: SchemaConfig<SD>;
  }): AsyncResponse<ReadDataSourceResult<SchemaState<SD>>>;

  validate(args: {
    config: SchemaConfig<SD>;
  }): AsyncResponse<ValidateDataSourceResult>;
}

// TODO add "id" field?
export const createDataSource = <S extends SchemaDescriptor>(descriptor: S) => <
  Client = void
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
