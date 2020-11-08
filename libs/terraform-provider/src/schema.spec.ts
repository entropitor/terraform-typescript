import { ctyString, ctyType } from "./ctyType";
import { StringKind } from "./generated/tfplugin5/StringKind";
import { createSchema } from "./schema";

describe("createSchema", () => {
  it("should create a simple schema", () => {
    expect(createSchema({})).toEqual({
      version: 1,
      block: {
        version: 1,
        attributes: [],
        block_types: [],
        deprecated: false,
      },
    });
  });
});
