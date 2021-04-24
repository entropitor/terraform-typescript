import type { ForceTypescriptComputation } from '../ForceTypescriptComputation';

import { CtyToTypescript } from './ctyType';
import type {
  AttributePropertyDescriptor,
  ListPropertyDescriptor,
  SchemaBlockDescriptor,
  SchemaDescriptor,
  SchemaPropertyDescriptor,
} from './descriptor';
import { SmartOmit } from './SmartOmit';

export type AttributePropertyConfigBySource<
  AttributeSource extends AttributePropertyDescriptor['source'],
  CT extends AttributePropertyDescriptor['ctyType']
> = AttributeSource extends 'required-in-config'
  ? CtyToTypescript<CT>
  : AttributeSource extends 'optional-in-config' | 'computed-but-overridable'
  ? CtyToTypescript<CT> | null
  : never;

type AttributePropertyConfig<
  Descriptor extends AttributePropertyDescriptor
> = AttributePropertyConfigBySource<
  Descriptor['source'],
  Descriptor['ctyType']
>;
type ListPropertyConfig<
  Descriptor extends ListPropertyDescriptor
> = ForceTypescriptComputation<
  Array<SchemaBlockConfig<Descriptor['itemType']>>
>;

export type SchemaPropertyConfig<
  Descriptor extends SchemaPropertyDescriptor
> = Descriptor extends AttributePropertyDescriptor
  ? AttributePropertyConfig<Descriptor>
  : Descriptor extends ListPropertyDescriptor
  ? ListPropertyConfig<Descriptor>
  : never;

export type SchemaBlockConfig<
  Descriptor extends SchemaBlockDescriptor
> = ForceTypescriptComputation<
  SmartOmit<
    {
      [propertyName in keyof Descriptor['properties']]: SchemaPropertyConfig<
        Descriptor['properties'][propertyName]
      >;
    }
  >
>;

export type SchemaConfig<
  Descriptor extends SchemaDescriptor
> = SchemaBlockConfig<Descriptor['block']>;
