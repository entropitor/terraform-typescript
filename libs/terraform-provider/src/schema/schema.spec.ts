import { ctyString, ctyTypeToBuffer, ctyNumber } from "./ctyType";
import { StringKind } from "../generated/tfplugin5/StringKind";
import { createSchema } from "./schema";
import { Equals, expectTypeToBeTrue } from "../testUtils";
import { createSchemaDescriptor } from "./descriptor";
import { SchemaConfig } from "./SchemaConfig";
import { SchemaState } from "./SchemaState";

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
    const descriptor = createSchemaDescriptor({
      description: "Test schema",
      properties: {
        username: {
          type: "raw",
          ctyType: ctyString,
          source: "computed-but-overridable",
        },
        password: {
          type: "raw",
          ctyType: ctyString,
          source: "required-in-config",
        },
        url: {
          type: "raw",
          ctyType: ctyString,
          source: "computed",
        },
      },
    });

    expect(createSchema(descriptor)).toEqual({
      version: 1,
      block: {
        version: 1,
        attributes: [
          {
            name: "username",
            type: ctyTypeToBuffer(ctyString),
            optional: true,
            computed: true,
          },
          {
            name: "password",
            type: ctyTypeToBuffer(ctyString),
            required: true,
          },
          {
            name: "url",
            type: ctyTypeToBuffer(ctyString),
            computed: true,
          },
        ],
        block_types: [],
        deprecated: false,
        description: "Test schema",
        description_kind: StringKind.PLAIN,
      },
    });

    type ComputedConfig = SchemaConfig<typeof descriptor>;
    expectTypeToBeTrue<
      Equals<
        ComputedConfig,
        {
          username: string | null;
          password: string;
        }
      >
    >();

    type ComputedState = SchemaState<typeof descriptor>;
    expectTypeToBeTrue<
      Equals<
        ComputedState,
        {
          username: string;
          password: string;
          url: string;
        }
      >
    >();
  });

  it("should create a more complex schema with attributes and list block_types", () => {
    const descriptor = createSchemaDescriptor({
      description: "Test schema",
      properties: {
        coffees: {
          type: "list",
          itemType: {
            description: "Test description",
            properties: {
              id: {
                type: "raw",
                ctyType: ctyNumber,
                source: "computed",
              },
              name: {
                type: "raw",
                ctyType: ctyString,
                source: "computed",
              },
              teaser: {
                type: "raw",
                ctyType: ctyString,
                source: "computed",
              },
              description: {
                type: "raw",
                ctyType: ctyString,
                source: "computed",
              },
              price: {
                type: "raw",
                ctyType: ctyNumber,
                source: "computed",
              },
              image: {
                type: "raw",
                ctyType: ctyString,
                source: "computed",
              },
              ingredients: {
                type: "list",
                itemType: {
                  description: "ingredients description",
                  properties: {
                    ingredient_id: {
                      type: "raw",
                      ctyType: ctyNumber,
                      source: "computed",
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    expect(createSchema(descriptor)).toEqual({
      version: 1,
      block: {
        deprecated: false,
        description: "Test schema",
        description_kind: StringKind.PLAIN,
        attributes: [],
        block_types: [
          {
            type_name: "coffees",
            nesting: "LIST",
            block: {
              version: 1,
              deprecated: false,
              description: "Test description",
              description_kind: StringKind.PLAIN,
              attributes: [
                {
                  name: "id",
                  type: ctyTypeToBuffer(ctyNumber),
                  computed: true,
                },
                {
                  name: "name",
                  type: ctyTypeToBuffer(ctyString),
                  computed: true,
                },
                {
                  name: "teaser",
                  type: ctyTypeToBuffer(ctyString),
                  computed: true,
                },
                {
                  name: "description",
                  type: ctyTypeToBuffer(ctyString),
                  computed: true,
                },
                {
                  name: "price",
                  type: ctyTypeToBuffer(ctyNumber),
                  computed: true,
                },
                {
                  name: "image",
                  type: ctyTypeToBuffer(ctyString),
                  computed: true,
                },
              ],
              block_types: [
                {
                  type_name: "ingredients",
                  nesting: "LIST",
                  block: {
                    attributes: [
                      {
                        name: "ingredient_id",
                        type: ctyTypeToBuffer(ctyNumber),
                        computed: true,
                      },
                    ],
                    block_types: [],
                    deprecated: false,
                    description: "ingredients description",
                    description_kind: StringKind.PLAIN,
                    version: 1,
                  },
                },
              ],
            },
          },
        ],
        version: 1,
      },
    });

    type ComputedConfig = SchemaConfig<typeof descriptor>;
    expectTypeToBeTrue<Equals<ComputedConfig, {}>>();

    type ComputedState = SchemaState<typeof descriptor>;
    expectTypeToBeTrue<
      Equals<
        ComputedState,
        {
          coffees: Array<{
            id: number;
            name: string;
            teaser: string;
            description: string;
            price: number;
            image: string;
            ingredients: Array<{
              ingredient_id: number;
            }>;
          }>;
        }
      >
    >();
  });
});
