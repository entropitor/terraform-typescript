import { Schema } from "./generated/tfplugin5/Schema";

export const createSchema = (_args: any): Schema => {
  return {
    version: 1,
    block: {
      attributes: [],
      block_types: [],
      deprecated: false,
      version: 1,
    },
  };
};
