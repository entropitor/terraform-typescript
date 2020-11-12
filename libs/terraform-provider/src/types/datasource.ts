import { Schema } from "src/generated/tfplugin5/Schema";
import { Diagnostic } from "src/generated/tfplugin5/Diagnostic";
import { AsyncResponse, GrpcAsyncResponse } from "./response";

export type ValidateDataSourceResult = {};

export type ReadDataSourceResult<State> = {
  diagnostics: Diagnostic[];
  state: State | null;
};

export interface DataSource<Config, State extends Config, Client> {
  getSchema(): Schema;

  validate(args: { config: Config }): AsyncResponse<ValidateDataSourceResult>;

  read(args: {
    config: Config;
    client: Client;
  }): GrpcAsyncResponse<ReadDataSourceResult<State>>;
}
