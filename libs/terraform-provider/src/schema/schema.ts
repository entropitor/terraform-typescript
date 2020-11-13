import {
  _tfplugin5_Schema_Block as SchemaBlock,
  Schema,
} from '../generated/tfplugin5/Schema';
import { StringKind } from '../generated/tfplugin5/StringKind';

import { ctyTypeToBuffer } from './ctyType';
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
          computed: isComputed || undefined,
          name: attributeName,
          optional: isOptional || undefined,
          required:
            attributeDescriptor.source === 'required-in-config' || undefined,
          type: ctyTypeToBuffer(attributeDescriptor.ctyType),
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
            block: createBlock(blockDescriptor.itemType),
            max_items: blockDescriptor.maxItems || undefined,
            min_items: blockDescriptor.minItems || undefined,
            nesting: 'LIST',
            type_name: propertyName,
          };
        }

        throw new Error('unsupported');
      }),
    deprecated: false,
    description: descriptor.description,
    description_kind: StringKind.PLAIN,
    version: 1,
  };
};
export const createSchema = (descriptor: SchemaDescriptor): Schema => {
  return {
    block: createBlock(descriptor),
    version: 1,
  };
};
