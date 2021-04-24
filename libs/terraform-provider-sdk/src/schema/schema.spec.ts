import { StringKind } from '../generated/tfplugin5/StringKind';
import { Equals, expectTypeToBeTrue } from '../testUtils';

import { ctyNumber, ctyString, ctyTypeToBuffer } from './ctyType';
import { Description, markdown, plain } from './description';
import { Attribute, Property, schema, schemaBlock } from './descriptor';
import { Size } from './descriptor/property';
import { createSchema } from './schema';
import { SchemaConfig } from './SchemaConfig';
import { SchemaState } from './SchemaState';

describe('createSchema', () => {
  it('should create a simple schema', () => {
    expect(
      createSchema(schema(schemaBlock(markdown('Empty schema'), {}))),
    ).toEqual({
      block: {
        attributes: [],
        block_types: [],
        deprecated: false,
        description: 'Empty schema',
        description_kind: StringKind.MARKDOWN,
        version: 0,
      },
      version: 0,
    });
  });

  it('should create a simple schema with attributes', () => {
    const descriptor = schema(
      schemaBlock('Test schema', {
        password: Attribute.required.string('The password for the provider'),
        url: Attribute.computed.string(plain('The url of the api')),
        username: Attribute.computedButOverridable.string(
          Description.markdown('The username for the provider'),
        ),
      }),
    );

    expect(createSchema(descriptor)).toEqual({
      block: {
        attributes: [
          {
            computed: undefined,
            deprecated: false,
            description: 'The password for the provider',
            description_kind: StringKind.PLAIN,
            name: 'password',
            optional: undefined,
            required: true,
            sensitive: false,
            type: ctyTypeToBuffer(ctyString),
          },
          {
            computed: true,
            deprecated: false,
            description: 'The url of the api',
            description_kind: StringKind.PLAIN,
            name: 'url',
            optional: undefined,
            required: undefined,
            sensitive: false,
            type: ctyTypeToBuffer(ctyString),
          },
          {
            computed: true,
            deprecated: false,
            description: 'The username for the provider',
            description_kind: StringKind.MARKDOWN,
            name: 'username',
            optional: true,
            required: undefined,
            sensitive: false,
            type: ctyTypeToBuffer(ctyString),
          },
        ],
        block_types: [],
        deprecated: false,
        description: 'Test schema',
        description_kind: StringKind.PLAIN,
        version: 0,
      },
      version: 0,
    });

    type ComputedConfig = SchemaConfig<typeof descriptor>;
    expectTypeToBeTrue<
      Equals<
        ComputedConfig,
        {
          password: string;
          username: string | null;
        }
      >
    >();

    type ComputedState = SchemaState<typeof descriptor>;
    expectTypeToBeTrue<
      Equals<
        ComputedState,
        {
          password: string;
          url: string;
          username: string | null;
        }
      >
    >();
  });

  it('should create a more complex schema with attributes and list block_types', () => {
    const descriptor = schema(
      schemaBlock('Test schema', {
        coffees: Property.list(
          schemaBlock('Test description', {
            description: Attribute.computed.string('Description of the coffee'),
            id: Attribute.computed.number('The id of the coffee'),
            image: Attribute.computed.string('The image showing the coffee'),
            ingredients: Property.list(
              schemaBlock('ingredients description', {
                ingredient_id: Attribute.computed.number(
                  'The id of the ingredient',
                ),
              }),
            ),
            name: Attribute.computed.string('the name of the coffee'),
            price: Attribute.computed.number('The price of the coffee'),
            teaser: Attribute.computed.string(
              'The teaser description of the coffee',
            ),
          }),
        ).withSizeConstraint(Size.between(1, 3)),
      }),
    );
    expect(createSchema(descriptor)).toEqual({
      block: {
        attributes: [],
        block_types: [
          {
            block: {
              attributes: [
                {
                  computed: true,
                  deprecated: false,
                  description: 'Description of the coffee',
                  description_kind: StringKind.PLAIN,
                  name: 'description',
                  optional: undefined,
                  required: undefined,
                  sensitive: false,
                  type: ctyTypeToBuffer(ctyString),
                },
                {
                  computed: true,
                  deprecated: false,
                  description: 'The id of the coffee',
                  description_kind: StringKind.PLAIN,
                  name: 'id',
                  optional: undefined,
                  required: undefined,
                  sensitive: false,
                  type: ctyTypeToBuffer(ctyNumber),
                },
                {
                  computed: true,
                  deprecated: false,
                  description: 'The image showing the coffee',
                  description_kind: StringKind.PLAIN,
                  name: 'image',
                  optional: undefined,
                  required: undefined,
                  sensitive: false,
                  type: ctyTypeToBuffer(ctyString),
                },
                {
                  computed: true,
                  deprecated: false,
                  description: 'the name of the coffee',
                  description_kind: StringKind.PLAIN,
                  name: 'name',
                  optional: undefined,
                  required: undefined,
                  sensitive: false,
                  type: ctyTypeToBuffer(ctyString),
                },
                {
                  computed: true,
                  deprecated: false,
                  description: 'The price of the coffee',
                  description_kind: StringKind.PLAIN,
                  name: 'price',
                  optional: undefined,
                  required: undefined,
                  sensitive: false,
                  type: ctyTypeToBuffer(ctyNumber),
                },
                {
                  computed: true,
                  deprecated: false,
                  description: 'The teaser description of the coffee',
                  description_kind: StringKind.PLAIN,
                  name: 'teaser',
                  optional: undefined,
                  required: undefined,
                  sensitive: false,
                  type: ctyTypeToBuffer(ctyString),
                },
              ],
              block_types: [
                {
                  block: {
                    attributes: [
                      {
                        computed: true,
                        deprecated: false,
                        description: 'The id of the ingredient',
                        description_kind: StringKind.PLAIN,
                        name: 'ingredient_id',
                        optional: undefined,
                        required: undefined,
                        sensitive: false,
                        type: ctyTypeToBuffer(ctyNumber),
                      },
                    ],
                    block_types: [],
                    deprecated: false,
                    description: 'ingredients description',
                    description_kind: StringKind.PLAIN,
                    version: 0,
                  },
                  max_items: undefined,
                  min_items: undefined,
                  nesting: 'LIST',
                  type_name: 'ingredients',
                },
              ],
              deprecated: false,
              description: 'Test description',
              description_kind: StringKind.PLAIN,
              version: 0,
            },
            max_items: 3,
            min_items: 1,
            nesting: 'LIST',
            type_name: 'coffees',
          },
        ],
        deprecated: false,
        description: 'Test schema',
        description_kind: StringKind.PLAIN,
        version: 0,
      },
      version: 0,
    });

    type ComputedConfig = SchemaConfig<typeof descriptor>;
    expectTypeToBeTrue<Equals<ComputedConfig, {}>>();

    type ComputedState = SchemaState<typeof descriptor>;
    expectTypeToBeTrue<
      Equals<
        ComputedState,
        {
          coffees: Array<{
            description: string;
            id: number;
            image: string;
            ingredients: Array<{
              ingredient_id: number;
            }>;
            name: string;
            price: number;
            teaser: string;
          }>;
        }
      >
    >();
  });

  it('should create a more complex schema with attributes and nested list block_types', () => {
    const descriptor = schema(
      schemaBlock('Order resource', {
        // TODO move to resource itself (?)
        id: Attribute.computed.string('The id of the order'),
        items: Property.list(
          schemaBlock('the items in the order', {
            coffee: Property.list(
              schemaBlock('the coffee you want to order', {
                description: Attribute.computed.string(
                  'The description of the coffee',
                ),
                id: Attribute.required.number('The id of the coffee'),
                image: Attribute.computed.string('The image of the coffee'),
                name: Attribute.computed.string('The name of the coffee'),
                price: Attribute.computed.number('The price of the coffee'),
                teaser: Attribute.computed.string('The teaser of the coffee'),
              }),
            ).withSizeConstraint(Size.atMost(1)),
            quantity: Attribute.required.number('the amount of coffees'),
          }),
        ),
        last_updated: Attribute.computedButOverridable.string(
          'the time the order was last updated at',
        ),
      }),
    );

    expect(createSchema(descriptor)).toMatchInlineSnapshot(`
      Object {
        "block": Object {
          "attributes": Array [
            Object {
              "computed": true,
              "deprecated": false,
              "description": "The id of the order",
              "description_kind": 0,
              "name": "id",
              "optional": undefined,
              "required": undefined,
              "sensitive": false,
              "type": Object {
                "data": Array [
                  34,
                  115,
                  116,
                  114,
                  105,
                  110,
                  103,
                  34,
                ],
                "type": "Buffer",
              },
            },
            Object {
              "computed": true,
              "deprecated": false,
              "description": "the time the order was last updated at",
              "description_kind": 0,
              "name": "last_updated",
              "optional": true,
              "required": undefined,
              "sensitive": false,
              "type": Object {
                "data": Array [
                  34,
                  115,
                  116,
                  114,
                  105,
                  110,
                  103,
                  34,
                ],
                "type": "Buffer",
              },
            },
          ],
          "block_types": Array [
            Object {
              "block": Object {
                "attributes": Array [
                  Object {
                    "computed": undefined,
                    "deprecated": false,
                    "description": "the amount of coffees",
                    "description_kind": 0,
                    "name": "quantity",
                    "optional": undefined,
                    "required": true,
                    "sensitive": false,
                    "type": Object {
                      "data": Array [
                        34,
                        110,
                        117,
                        109,
                        98,
                        101,
                        114,
                        34,
                      ],
                      "type": "Buffer",
                    },
                  },
                ],
                "block_types": Array [
                  Object {
                    "block": Object {
                      "attributes": Array [
                        Object {
                          "computed": true,
                          "deprecated": false,
                          "description": "The description of the coffee",
                          "description_kind": 0,
                          "name": "description",
                          "optional": undefined,
                          "required": undefined,
                          "sensitive": false,
                          "type": Object {
                            "data": Array [
                              34,
                              115,
                              116,
                              114,
                              105,
                              110,
                              103,
                              34,
                            ],
                            "type": "Buffer",
                          },
                        },
                        Object {
                          "computed": undefined,
                          "deprecated": false,
                          "description": "The id of the coffee",
                          "description_kind": 0,
                          "name": "id",
                          "optional": undefined,
                          "required": true,
                          "sensitive": false,
                          "type": Object {
                            "data": Array [
                              34,
                              110,
                              117,
                              109,
                              98,
                              101,
                              114,
                              34,
                            ],
                            "type": "Buffer",
                          },
                        },
                        Object {
                          "computed": true,
                          "deprecated": false,
                          "description": "The image of the coffee",
                          "description_kind": 0,
                          "name": "image",
                          "optional": undefined,
                          "required": undefined,
                          "sensitive": false,
                          "type": Object {
                            "data": Array [
                              34,
                              115,
                              116,
                              114,
                              105,
                              110,
                              103,
                              34,
                            ],
                            "type": "Buffer",
                          },
                        },
                        Object {
                          "computed": true,
                          "deprecated": false,
                          "description": "The name of the coffee",
                          "description_kind": 0,
                          "name": "name",
                          "optional": undefined,
                          "required": undefined,
                          "sensitive": false,
                          "type": Object {
                            "data": Array [
                              34,
                              115,
                              116,
                              114,
                              105,
                              110,
                              103,
                              34,
                            ],
                            "type": "Buffer",
                          },
                        },
                        Object {
                          "computed": true,
                          "deprecated": false,
                          "description": "The price of the coffee",
                          "description_kind": 0,
                          "name": "price",
                          "optional": undefined,
                          "required": undefined,
                          "sensitive": false,
                          "type": Object {
                            "data": Array [
                              34,
                              110,
                              117,
                              109,
                              98,
                              101,
                              114,
                              34,
                            ],
                            "type": "Buffer",
                          },
                        },
                        Object {
                          "computed": true,
                          "deprecated": false,
                          "description": "The teaser of the coffee",
                          "description_kind": 0,
                          "name": "teaser",
                          "optional": undefined,
                          "required": undefined,
                          "sensitive": false,
                          "type": Object {
                            "data": Array [
                              34,
                              115,
                              116,
                              114,
                              105,
                              110,
                              103,
                              34,
                            ],
                            "type": "Buffer",
                          },
                        },
                      ],
                      "block_types": Array [],
                      "deprecated": false,
                      "description": "the coffee you want to order",
                      "description_kind": 0,
                      "version": 0,
                    },
                    "max_items": 1,
                    "min_items": undefined,
                    "nesting": "LIST",
                    "type_name": "coffee",
                  },
                ],
                "deprecated": false,
                "description": "the items in the order",
                "description_kind": 0,
                "version": 0,
              },
              "max_items": undefined,
              "min_items": undefined,
              "nesting": "LIST",
              "type_name": "items",
            },
          ],
          "deprecated": false,
          "description": "Order resource",
          "description_kind": 0,
          "version": 0,
        },
        "version": 0,
      }
    `);

    type ComputedConfig = SchemaConfig<typeof descriptor>;
    expectTypeToBeTrue<
      Equals<
        ComputedConfig,
        {
          items: Array<{
            coffee: Array<{ id: number }>;
            quantity: number;
          }>;
          last_updated: string | null;
        }
      >
    >();

    type ComputedState = SchemaState<typeof descriptor>;
    expectTypeToBeTrue<
      Equals<
        ComputedState,
        {
          id: string;
          items: Array<{
            coffee: Array<{
              description: string;
              id: number;
              image: string;
              name: string;
              price: number;
              teaser: string;
            }>;
            quantity: number;
          }>;
          last_updated: string | null;
        }
      >
    >();
  });
});
