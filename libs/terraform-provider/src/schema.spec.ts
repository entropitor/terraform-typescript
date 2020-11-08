import { ctyString, ctyType, CtyType } from "./ctyType";
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

  it("should create a simple schema with attributes", () => {
    expect(
      createSchema({
        username: {
          type: ctyString(),
          inConfig: "optional",
          computed: true,
        },
        password: {
          type: ctyString(),
          inConfig: "required",
        },
        url: {
          type: ctyString(),
          inConfig: "absent",
        },
      })
    ).toEqual({
      version: 1,
      block: {
        version: 1,
        attributes: [
          {
            name: "username",
            type: ctyType(ctyString()),
            optional: true,
            computed: true,
          },
          {
            name: "password",
            type: ctyType(ctyString()),
            required: true,
          },
          {
            name: "url",
            type: ctyType(ctyString()),
            computed: true,
          },
        ],
        block_types: [],
        deprecated: false,
      },
    });
  });
});
