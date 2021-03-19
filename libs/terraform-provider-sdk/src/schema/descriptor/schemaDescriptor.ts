import { SchemaBlockDescriptor } from './blockDescriptor';

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
