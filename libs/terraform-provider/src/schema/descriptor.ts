import { AsyncResponse } from '../types/response';

import { ctyString, CtyType } from './ctyType';
import type { AttributePropertyConfigBySource } from './SchemaConfig';

// This const is exported in this file but not in the global package to ensure typescript
// can properly infer the 'unique symbol'
/**
 * Ensure that users should use the constructors defined below instead of type literals
 */
export const propertyDescriptorBrand = Symbol('PropertyDescriptorBrand');

type AttributeSource =
  | 'required-in-config'
  | 'optional-in-config'
  | 'computed-but-overridable'
  | 'computed';
export type SchemaPropertyDescriptor =
  | {
      brand: typeof propertyDescriptorBrand;
      ctyType: CtyType;
      source: AttributeSource;
      type: 'attribute';
      // Using AttributePropertyConfigBySource for typing here resulted in infinte types
      validate?: (attribute: any | null) => AsyncResponse<any>;
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
export const validatedAttribute = <
  CT extends CtyType,
  S extends AttributePropertyDescriptor['source']
>(
  source: S,
  ctyType: CT,
) => (
  validate?: (
    attribute: AttributePropertyConfigBySource<S, CT>,
  ) => AsyncResponse<AttributePropertyConfigBySource<S, CT>>,
) =>
  ({
    brand: propertyDescriptorBrand,
    ctyType,
    source,
    type: 'attribute',
    validate: validate as AttributePropertyDescriptor['validate'],
  } as const);

export const Attribute = {
  optional: {
    string: validatedAttribute('optional-in-config', ctyString),
  } as const,
} as const;

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
