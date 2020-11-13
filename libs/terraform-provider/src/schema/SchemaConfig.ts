import { CtyToTypescript } from "./ctyType";
import {
  SchemaBlockDescriptor,
  ListPropertyDescriptor,
  RawPropertyDescriptor,
  SchemaDescriptor,
  SchemaPropertyDescriptor,
} from "./descriptor";

type RawPropertyConfig<
  Descriptor extends RawPropertyDescriptor
> = Descriptor["source"] extends "required-in-config"
  ? CtyToTypescript<Descriptor["ctyType"]>
  : Descriptor["source"] extends
      | "optional-in-config"
      | "computed-but-overridable"
  ? CtyToTypescript<Descriptor["ctyType"]> | null
  : void;
type ListPropertyConfig<Descriptor extends ListPropertyDescriptor> = Array<
  BlockConfig<Descriptor["itemType"]>
>;

type PropertyConfig<
  Descriptor extends SchemaPropertyDescriptor
> = Descriptor extends RawPropertyDescriptor
  ? RawPropertyConfig<Descriptor>
  : Descriptor extends ListPropertyDescriptor
  ? ListPropertyConfig<Descriptor>
  : void;

export type BlockConfig<Descriptor extends SchemaBlockDescriptor> = {
  [propertyName in keyof Descriptor["properties"]]: PropertyConfig<
    Descriptor["properties"][propertyName]
  >;
};

export type SchemaConfig<Descriptor extends SchemaDescriptor> = BlockConfig<
  Descriptor
>;
