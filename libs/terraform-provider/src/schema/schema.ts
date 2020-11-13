import { ctyTypeToBuffer } from './ctyType';
import {
  Schema,
  _tfplugin5_Schema_Block as SchemaBlock,
} from '../generated/tfplugin5/Schema';
import { StringKind } from '../generated/tfplugin5/StringKind';
import {
  RawPropertyDescriptor,
  SchemaBlockDescriptor,
  SchemaDescriptor,
  SchemaPropertyDescriptor,
} from './descriptor';

export const createBlock = (descriptor: SchemaBlockDescriptor): SchemaBlock => {
  return {
    attributes: Object.entries(descriptor.properties)
      .filter(
        ([_propertyName, propertyDescriptor]) =>
          propertyDescriptor.type === 'raw',
      )
      .map(([attributeName, propertyDescriptor]) => {
        const attributeDescriptor = propertyDescriptor as RawPropertyDescriptor;

        const isOptional =
          attributeDescriptor.source === 'optional-in-config' ||
          attributeDescriptor.source === 'computed-but-overridable';
        const isComputed =
          attributeDescriptor.source === 'computed' ||
          attributeDescriptor.source === 'computed-but-overridable';

        return {
          name: attributeName,
          type: ctyTypeToBuffer(attributeDescriptor.ctyType),
          optional: isOptional || undefined,
          required:
            attributeDescriptor.source === 'required-in-config' || undefined,
          computed: isComputed || undefined,
        };
      }),
    block_types: Object.entries(descriptor.properties)
      .filter(
        ([_propertyName, propertyDescriptor]) =>
          propertyDescriptor.type !== 'raw',
      )
      .map(([propertyName, propertyDescriptor]) => {
        const blockDescriptor = propertyDescriptor as Exclude<
          SchemaPropertyDescriptor,
          RawPropertyDescriptor
        >;

        if (blockDescriptor.type === 'list') {
          return {
            type_name: propertyName,
            block: createBlock(blockDescriptor.itemType),
            nesting: 'LIST',
            min_items: blockDescriptor.minItems || undefined,
            max_items: blockDescriptor.maxItems || undefined,
          };
        }

        throw new Error('unsupported');
      }),
    deprecated: false,
    version: 1,
    description: descriptor.description,
    description_kind: StringKind.PLAIN,
  };
};
export const createSchema = (descriptor: SchemaDescriptor): Schema => {
  return {
    version: 1,
    block: createBlock(descriptor),
  };
};
