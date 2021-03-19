import {
  _tfplugin5_Schema_Block as SchemaBlock,
  Schema,
} from '../generated/tfplugin5/Schema';

import { ctyTypeToBuffer } from './ctyType';
import { toTerraformDescription } from './description';
import {
  AttributePropertyDescriptor,
  isComputed,
  isOptional,
  isRequired,
  SchemaBlockDescriptor,
  SchemaDescriptor,
  SchemaPropertyDescriptor,
} from './descriptor';

export const createBlock = (descriptor: SchemaBlockDescriptor): SchemaBlock => {
  return {
    attributes: Object.entries(descriptor.properties)
      .filter(
        ([_propertyName, propertyDescriptor]) =>
          propertyDescriptor.type === 'attribute',
      )
      .map(([attributeName, propertyDescriptor]) => {
        const attributeDescriptor = propertyDescriptor as AttributePropertyDescriptor;

        return {
          computed: isComputed(attributeDescriptor) || undefined,
          deprecated: false,
          ...toTerraformDescription(attributeDescriptor.description),
          name: attributeName,
          optional: isOptional(attributeDescriptor) || undefined,
          required: isRequired(attributeDescriptor) || undefined,
          sensitive: false,
          type: ctyTypeToBuffer(attributeDescriptor.ctyType),
        };
      }),
    block_types: Object.entries(descriptor.properties)
      .filter(
        ([_propertyName, propertyDescriptor]) =>
          propertyDescriptor.type !== 'attribute',
      )
      .map(([propertyName, propertyDescriptor]) => {
        const blockDescriptor = propertyDescriptor as Exclude<
          SchemaPropertyDescriptor,
          AttributePropertyDescriptor
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
    ...toTerraformDescription(descriptor.description),
    version: 0,
  };
};
export const createSchema = (descriptor: SchemaDescriptor): Schema => {
  return {
    block: createBlock(descriptor.block),
    version: 0,
  };
};
