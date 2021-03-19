import type { SchemaPropertyDescriptor } from './propertyDescriptor';

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
