import { CtyType } from './ctyType';

// This const is exported in this file but not in the global package to ensure typescript
// can properly infer the 'unique symbol'
/**
 * Ensure that users should use the constructors defined below instead of type literals
 */
export const brand = Symbol('descriptorBrand');

export type SchemaPropertyDescriptor =
  | {
      brand: typeof brand;
      ctyType: CtyType;
      source:
        | 'required-in-config'
        | 'optional-in-config'
        | 'computed-but-overridable'
        | 'computed';
      type: 'attribute';
    }
  | {
      brand: typeof brand;
      itemType: SchemaBlockDescriptor;
      maxItems?: number;
      minItems?: number;
      type: 'list' | 'set';
    }
  | {
      brand: typeof brand;
      // "single" or "group"
      itemType: SchemaBlockDescriptor;
      required: boolean;
      type: 'single';
    }
  | {
      brand: typeof brand;
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
    brand,
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
    brand,
    itemType,
    type: 'list',
  } as const);

export type SchemaBlockDescriptor = {
  description: string;
  properties: {
    [key: string]: SchemaPropertyDescriptor;
  };
};

export type SchemaDescriptor = {
  block: SchemaBlockDescriptor;
};

export const createSchemaDescriptor = <T extends SchemaDescriptor>(t: T): T => {
  return t;
};

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
