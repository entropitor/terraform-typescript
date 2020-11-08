import { ctyString, ctyType, CtyType } from "./ctyType";
import { StringKind } from "./generated/tfplugin5/StringKind";
import { createSchema, SchemaConfig } from "./schema";
import { Equals, expectTypeToBeTrue } from "./testUtils";

describe("createSchema", () => {
  it("should create a simple schema", () => {
    expect(
      createSchema({
        description: "Empty schema",
        properties: {},
      })
    ).toEqual({
      version: 1,
      block: {
        version: 1,
        attributes: [],
        block_types: [],
        deprecated: false,
        description: "Empty schema",
        description_kind: StringKind.PLAIN,
      },
    });
  });

  it("should create a simple schema with attributes", () => {
    const descriptor = {
      description: "Test schema",
      properties: {
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
      },
    } as const;

    expect(createSchema(descriptor)).toEqual({
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
        description: "Test schema",
        description_kind: StringKind.PLAIN,
      },
    });

    type ExpectedConfig = {
      readonly username: string | null;
      readonly password: string;
      readonly url: void;
    };
    expectTypeToBeTrue<
      Equals<SchemaConfig<typeof descriptor>, ExpectedConfig>
    >();
  });
});
