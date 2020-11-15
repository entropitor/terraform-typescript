import { CtyType } from './ctyType';

// This const is exported in this file but not in the global package to ensure typescript
// can properly infer the 'unique symbol'
/**
 * Ensure that users should use the constructors defined below instead of type literals
 */
export const propertyDescriptorBrand = Symbol('PropertyDescriptorBrand');

export type SchemaPropertyDescriptor =
  | {
      brand: typeof propertyDescriptorBrand;
      ctyType: CtyType;
      source:
        | 'required-in-config'
        | 'optional-in-config'
        | 'computed-but-overridable'
        | 'computed';
      type: 'attribute';
    }
  | {
      brand: typeof propertyDescriptorBrand;
      itemType: SchemaBlockDescriptor;
      maxItems?: number;
      minItems?: number;
      type: 'list' | 'set';
    }
  | {
      brand: typeof propertyDescriptorBrand;
      // "single" or "group"
      itemType: SchemaBlockDescriptor;
      required: boolean;
      type: 'single';
    }
  | {
      brand: typeof propertyDescriptorBrand;
      itemType: SchemaBlockDescriptor;
      type: 'map';
    };

export type AttributePropertyDescriptor = SchemaPropertyDescriptor & {
  type: 'attribute';
};
export const attribute = <
  CT extends CtyType,
  S extends AttributePropertyDescriptor['source']
>(
  source: S,
  ctyType: CT,
) =>
  ({
    brand: propertyDescriptorBrand,
    ctyType,
    source,
    type: 'attribute',
  } as const);

export type ListPropertyDescriptor = SchemaPropertyDescriptor & {
  type: 'list';
};
export const listProperty = <SBD extends SchemaBlockDescriptor>(
  itemType: SBD,
  minMax: {
    maxItems?: number;
    minItems?: number;
  } = {},
) =>
  ({
    ...minMax,
    brand: propertyDescriptorBrand,
    itemType,
    type: 'list',
  } as const);

export const schemaBlockDescriptorBrand = Symbol('SchemaBlockDescriptorBrand');
export type SchemaBlockDescriptor = {
  brand: typeof schemaBlockDescriptorBrand;
  description: string;
  properties: Record<string, SchemaPropertyDescriptor>;
};

export const schemaBlock = <P extends Record<string, SchemaPropertyDescriptor>>(
  description: string,
  properties: P,
) =>
  ({
    brand: schemaBlockDescriptorBrand,
    description,
    properties,
  } as const);

export const schemaDescriptorBrand = Symbol('SchemaDescriptorBrand');
export type SchemaDescriptor = {
  block: SchemaBlockDescriptor;
  brand: typeof schemaDescriptorBrand;
};

export const schema = <SBD extends SchemaBlockDescriptor>(block: SBD) =>
  ({
    block,
    brand: schemaDescriptorBrand,
  } as const);

export const isOptional = (
  attributePropertyDescriptor: AttributePropertyDescriptor,
) =>
  attributePropertyDescriptor.source === 'optional-in-config' ||
  attributePropertyDescriptor.source === 'computed-but-overridable';
export const isComputed = (
  attributePropertyDescriptor: AttributePropertyDescriptor,
) =>
  attributePropertyDescriptor.source === 'computed' ||
  attributePropertyDescriptor.source === 'computed-but-overridable';
export const isRequired = (
  attributePropertyDescriptor: AttributePropertyDescriptor,
) => attributePropertyDescriptor.source === 'required-in-config';
