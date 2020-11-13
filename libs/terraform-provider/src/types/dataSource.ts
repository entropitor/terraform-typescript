import { SchemaDescriptor } from "src/schema/descriptor";
import { SchemaConfig } from "src/schema/SchemaConfig";
import { SchemaState } from "src/schema/SchemaState";
import { Schema } from "../generated/tfplugin5/Schema";
import { AsyncResponse } from "./response";

type ValidateDataSourceResult = {};

type ReadDataSourceResult<State> = {
  state: State | null;
};

export interface DataSource<S extends SchemaDescriptor, Client> {
  getSchema(): Schema;

  validate(args: {
    config: SchemaConfig<S>;
  }): AsyncResponse<ValidateDataSourceResult>;

  read(args: {
    config: SchemaConfig<S>;
    client: Client;
  }): AsyncResponse<ReadDataSourceResult<SchemaState<S>>>;
}
