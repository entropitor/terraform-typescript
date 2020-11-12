import { Schema } from "src/generated/tfplugin5/Schema";
import { Diagnostic } from "src/generated/tfplugin5/Diagnostic";
import { GrpcAsyncResponse } from "./response";

export type ValidateDataSourceResult = {
  diagnostics: Diagnostic[];
};
export type ReadDataSourceResult<State> = {
  diagnostics: Diagnostic[];
  state: State | null;
};
export interface DataSource<Config, State extends Config, Client> {
  getSchema(): Schema;

  validate(args: {
    config: Config;
  }): GrpcAsyncResponse<ValidateDataSourceResult>;

  read(args: {
    config: Config;
    client: Client;
  }): GrpcAsyncResponse<ReadDataSourceResult<State>>;
}
