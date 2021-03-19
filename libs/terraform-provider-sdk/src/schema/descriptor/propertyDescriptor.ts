// This const is exported in this file but not in the global package to ensure typescript
// can properly infer the 'unique symbol'

import { AsyncResponse } from '../../types/response';
import { CtyType } from '../ctyType';
import { Description, DescriptionLike, parseDescription } from '../description';

import type { SchemaBlockDescriptor } from './blockDescriptor';

/**
 * Ensure that users should use the constructors defined below instead of type literals
 */
export const propertyDescriptorBrand = Symbol('PropertyDescriptorBrand');

export type AttributeSource =
  | 'required-in-config'
  | 'optional-in-config'
  | 'computed-but-overridable'
  | 'computed';
export type SchemaPropertyDescriptor =
  | {
      brand: typeof propertyDescriptorBrand;
      ctyType: CtyType;
      description: Description;
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
  description: DescriptionLike,
) =>
  ({
    brand: propertyDescriptorBrand,
    ctyType,
    description: parseDescription(description),
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
