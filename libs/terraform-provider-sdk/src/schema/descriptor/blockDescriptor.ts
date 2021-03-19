import { Description, DescriptionLike, parseDescription } from '../description';

import type { SchemaPropertyDescriptor } from './propertyDescriptor';

export const schemaBlockDescriptorBrand = Symbol('SchemaBlockDescriptorBrand');
export type SchemaBlockDescriptor = {
  brand: typeof schemaBlockDescriptorBrand;
  description: Description;
  properties: Record<string, SchemaPropertyDescriptor>;
};

export const schemaBlock = <P extends Record<string, SchemaPropertyDescriptor>>(
  description: DescriptionLike,
  properties: P,
) =>
  ({
    brand: schemaBlockDescriptorBrand,
    description: parseDescription(description),
    properties,
  } as const);
