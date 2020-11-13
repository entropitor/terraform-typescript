import { Schema } from "src/generated/tfplugin5/Schema";
import { AsyncResponse } from "./response";

export type ValidateDataSourceResult = {};

export type ReadDataSourceResult<State> = {
  state: State | null;
};

export interface DataSource<Config, State extends Config, Client> {
  getSchema(): Schema;

  validate(args: { config: Config }): AsyncResponse<ValidateDataSourceResult>;

  read(args: {
    config: Config;
    client: Client;
  }): AsyncResponse<ReadDataSourceResult<State>>;
}
