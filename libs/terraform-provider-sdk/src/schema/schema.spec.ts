import { StringKind } from '../generated/tfplugin5/StringKind';
import { Equals, expectTypeToBeTrue } from '../testUtils';

import { ctyNumber, ctyString, ctyTypeToBuffer } from './ctyType';
import { attribute, listProperty, schema, schemaBlock } from './descriptor';
import { createSchema } from './schema';
import { SchemaConfig } from './SchemaConfig';
import { SchemaState } from './SchemaState';

describe('createSchema', () => {
  it('should create a simple schema', () => {
    expect(createSchema(schema(schemaBlock('Empty schema', {})))).toEqual({
      block: {
        attributes: [],
        block_types: [],
        deprecated: false,
        description: 'Empty schema',
        description_kind: StringKind.PLAIN,
        version: 0,
      },
      version: 0,
    });
  });

  it('should create a simple schema with attributes', () => {
    const descriptor = schema(
      schemaBlock('Test schema', {
        password: attribute('required-in-config', ctyString),
        url: attribute('computed', ctyString),
        username: attribute('computed-but-overridable', ctyString),
      }),
    );

    expect(createSchema(descriptor)).toEqual({
      block: {
        attributes: [
          {
            computed: undefined,
            deprecated: false,
            description: '',
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
            description: '',
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
            description: '',
            description_kind: StringKind.PLAIN,
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
        coffees: listProperty(
          schemaBlock('Test description', {
            description: attribute('computed', ctyString),
            id: attribute('computed', ctyNumber),
            image: attribute('computed', ctyString),
            ingredients: listProperty(
              schemaBlock('ingredients description', {
                ingredient_id: attribute('computed', ctyNumber),
              }),
            ),
            name: attribute('computed', ctyString),
            price: attribute('computed', ctyNumber),
            teaser: attribute('computed', ctyString),
          }),
        ),
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
                  description: '',
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
                  description: '',
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
                  description: '',
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
                  description: '',
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
                  description: '',
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
                  description: '',
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
                        description: '',
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
            max_items: undefined,
            min_items: undefined,
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
});
