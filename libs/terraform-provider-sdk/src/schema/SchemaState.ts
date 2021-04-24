import type { ForceTypescriptComputation } from '../ForceTypescriptComputation';

import { CtyToTypescript } from './ctyType';
import {
  AttributePropertyDescriptor,
  ListPropertyDescriptor,
  SchemaBlockDescriptor,
  SchemaDescriptor,
  SchemaPropertyDescriptor,
} from './descriptor';
import { SmartOmit } from './SmartOmit';

type AttributePropertyState<
  Descriptor extends AttributePropertyDescriptor
> = Descriptor['source'] extends 'required-in-config'
  ? CtyToTypescript<Descriptor['ctyType']>
  : Descriptor['source'] extends
      | 'optional-in-config'
      | 'computed-but-overridable'
  ? CtyToTypescript<Descriptor['ctyType']> | null
  : Descriptor['source'] extends 'computed'
  ? CtyToTypescript<Descriptor['ctyType']>
  : never;

export type ListPropertyState<
  Descriptor extends ListPropertyDescriptor
> = ForceTypescriptComputation<Array<BlockState<Descriptor['itemType']>>>;

type PropertyState<
  Descriptor extends SchemaPropertyDescriptor
> = Descriptor extends AttributePropertyDescriptor
  ? AttributePropertyState<Descriptor>
  : Descriptor extends ListPropertyDescriptor
  ? ListPropertyState<Descriptor>
  : never;

export type BlockState<
  Descriptor extends SchemaBlockDescriptor
> = ForceTypescriptComputation<
  SmartOmit<
    {
      [propertyName in keyof Descriptor['properties']]: PropertyState<
        Descriptor['properties'][propertyName]
      >;
    }
  >
>;

export type SchemaState<Descriptor extends SchemaDescriptor> = BlockState<
  Descriptor['block']
>;
