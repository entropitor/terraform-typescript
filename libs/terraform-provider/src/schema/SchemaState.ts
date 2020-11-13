import { CtyToTypescript } from './ctyType';
import {
  ListPropertyDescriptor,
  RawPropertyDescriptor,
  SchemaBlockDescriptor,
  SchemaDescriptor,
  SchemaPropertyDescriptor,
} from './descriptor';
import { SmartOmit } from './SmartOmit';

type RawPropertyState<
  Descriptor extends RawPropertyDescriptor
> = Descriptor['source'] extends 'required-in-config'
  ? CtyToTypescript<Descriptor['ctyType']>
  : Descriptor['source'] extends 'optional-in-config'
  ? CtyToTypescript<Descriptor['ctyType']> | null
  : Descriptor['source'] extends 'computed' | 'computed-but-overridable'
  ? CtyToTypescript<Descriptor['ctyType']>
  : never;

type ListPropertyState<Descriptor extends ListPropertyDescriptor> = Array<
  BlockState<Descriptor['itemType']>
>;

type PropertyState<
  Descriptor extends SchemaPropertyDescriptor
> = Descriptor extends RawPropertyDescriptor
  ? RawPropertyState<Descriptor>
  : Descriptor extends ListPropertyDescriptor
  ? ListPropertyState<Descriptor>
  : never;

export type BlockState<Descriptor extends SchemaBlockDescriptor> = SmartOmit<
  {
    [propertyName in keyof Descriptor['properties']]: PropertyState<
      Descriptor['properties'][propertyName]
    >;
  }
>;

export type SchemaState<Descriptor extends SchemaDescriptor> = BlockState<
  Descriptor
>;
