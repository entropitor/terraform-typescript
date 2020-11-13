import { Schema } from "../generated/tfplugin5/Schema";
import { AsyncResponse } from "./response";

type ValidateDataSourceResult = {};

type ReadDataSourceResult<State> = {
  state: State | null;
};

export interface DataSource<Config, State, Client> {
  getSchema(): Schema;

  validate(args: { config: Config }): AsyncResponse<ValidateDataSourceResult>;

  read(args: {
    config: Config;
    client: Client;
  }): AsyncResponse<ReadDataSourceResult<State>>;
}
