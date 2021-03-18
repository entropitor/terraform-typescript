import { AsyncResponse } from '../types/response';

import {
  ctyAny,
  ctyBoolean,
  ctyList,
  ctyMap,
  ctyNumber,
  ctyObject,
  ctySet,
  ctyString,
  ctyTuple,
  CtyType,
} from './ctyType';
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
      // Hard to type without infinite stuff
      validate?: (list: any) => AsyncResponse<any>;
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
) => {
  const withoutValidation = {
    brand: propertyDescriptorBrand,
    ctyType,
    source,
    type: 'attribute',
  } as const;

  const withValidation = (
    validate: (
      attribute: AttributePropertyConfigBySource<S, CT>,
    ) => AsyncResponse<AttributePropertyConfigBySource<S, CT>>,
  ) =>
    ({
      ...withoutValidation,
      validate: validate as AttributePropertyDescriptor['validate'],
    } as const);

  return {
    ...withoutValidation,
    withValidation,
  };
};
export const Attribute = {
  computed: {
    any: validatedAttribute('computed', ctyAny),
    boolean: validatedAttribute('computed', ctyBoolean),
    list: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed', ctyList(itemType)),
    map: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed', ctyMap(itemType)),
    number: validatedAttribute('computed', ctyNumber),
    object: <R extends Record<string, CtyType>>(itemTypes: R) =>
      validatedAttribute('computed', ctyObject(itemTypes)),
    set: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed', ctySet(itemType)),
    string: validatedAttribute('computed', ctyString),
    tuple: <T extends CtyType[]>(...itemTypes: T) =>
      validatedAttribute('computed', ctyTuple(...itemTypes)),
  },
  computedButOverridable: {
    any: validatedAttribute('computed-but-overridable', ctyAny),
    boolean: validatedAttribute('computed-but-overridable', ctyBoolean),
    list: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed-but-overridable', ctyList(itemType)),
    map: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed-but-overridable', ctyMap(itemType)),
    number: validatedAttribute('computed-but-overridable', ctyNumber),
    object: <R extends Record<string, CtyType>>(itemTypes: R) =>
      validatedAttribute('computed-but-overridable', ctyObject(itemTypes)),
    set: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed-but-overridable', ctySet(itemType)),
    string: validatedAttribute('computed-but-overridable', ctyString),
    tuple: <T extends CtyType[]>(...itemTypes: T) =>
      validatedAttribute('computed-but-overridable', ctyTuple(...itemTypes)),
  },
  optional: {
    any: validatedAttribute('optional-in-config', ctyAny),
    boolean: validatedAttribute('optional-in-config', ctyBoolean),
    list: <C extends CtyType>(itemType: C) =>
      validatedAttribute('optional-in-config', ctyList(itemType)),
    map: <C extends CtyType>(itemType: C) =>
      validatedAttribute('optional-in-config', ctyMap(itemType)),
    number: validatedAttribute('optional-in-config', ctyNumber),
    object: <R extends Record<string, CtyType>>(itemTypes: R) =>
      validatedAttribute('optional-in-config', ctyObject(itemTypes)),
    set: <C extends CtyType>(itemType: C) =>
      validatedAttribute('optional-in-config', ctySet(itemType)),
    string: validatedAttribute('optional-in-config', ctyString),
    tuple: <T extends CtyType[]>(...itemTypes: T) =>
      validatedAttribute('optional-in-config', ctyTuple(...itemTypes)),
  },
  required: {
    any: validatedAttribute('required-in-config', ctyAny),
    boolean: validatedAttribute('required-in-config', ctyBoolean),
    list: <C extends CtyType>(itemType: C) =>
      validatedAttribute('required-in-config', ctyList(itemType)),
    map: <C extends CtyType>(itemType: C) =>
      validatedAttribute('required-in-config', ctyMap(itemType)),
    number: validatedAttribute('required-in-config', ctyNumber),
    object: <R extends Record<string, CtyType>>(itemTypes: R) =>
      validatedAttribute('required-in-config', ctyObject(itemTypes)),
    set: <C extends CtyType>(itemType: C) =>
      validatedAttribute('required-in-config', ctySet(itemType)),
    string: validatedAttribute('required-in-config', ctyString),
    tuple: <T extends CtyType[]>(...itemTypes: T) =>
      validatedAttribute('required-in-config', ctyTuple(...itemTypes)),
  },
};

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
