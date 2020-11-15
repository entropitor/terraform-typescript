import { CtyToTypescript } from './ctyType';
import {
  AttributePropertyDescriptor,
  ListPropertyDescriptor,
  SchemaBlockDescriptor,
  SchemaDescriptor,
  SchemaPropertyDescriptor,
} from './descriptor';
import { SmartOmit } from './SmartOmit';

type AttributePropertyConfig<
  Descriptor extends AttributePropertyDescriptor
> = Descriptor['source'] extends 'required-in-config'
  ? CtyToTypescript<Descriptor['ctyType']>
  : Descriptor['source'] extends
      | 'optional-in-config'
      | 'computed-but-overridable'
  ? CtyToTypescript<Descriptor['ctyType']> | null
  : never;
type ListPropertyConfig<Descriptor extends ListPropertyDescriptor> = Array<
  BlockConfig<Descriptor['itemType']>
>;

type PropertyConfig<
  Descriptor extends SchemaPropertyDescriptor
> = Descriptor extends AttributePropertyDescriptor
  ? AttributePropertyConfig<Descriptor>
  : Descriptor extends ListPropertyDescriptor
  ? ListPropertyConfig<Descriptor>
  : never;

export type BlockConfig<Descriptor extends SchemaBlockDescriptor> = SmartOmit<
  {
    [propertyName in keyof Descriptor['properties']]: PropertyConfig<
      Descriptor['properties'][propertyName]
    >;
  }
>;

export type SchemaConfig<Descriptor extends SchemaDescriptor> = BlockConfig<
  Descriptor['block']
>;
