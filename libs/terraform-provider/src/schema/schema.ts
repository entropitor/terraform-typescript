import { ctyTypeToBuffer, CtyType, CtyToTypescript } from "./ctyType";
import {
  Schema,
  _tfplugin5_Schema_Block as SchemaBlock,
} from "../generated/tfplugin5/Schema";
import { StringKind } from "../generated/tfplugin5/StringKind";

type PropertyDescriptor =
  | {
      type: "raw";
      ctyType: CtyType;
      source:
        | "required-in-config"
        | "optional-in-config"
        | "computed-but-overridable"
        | "computed";
    }
  | {
      type: "list" | "set";
      minItems?: number;
      maxItems?: number;
      itemType: BlockDescriptor;
    }
  | {
      type: "single";
      required: boolean; // "single" or "group"
      itemType: BlockDescriptor;
    }
  | {
      type: "map";
      itemType: BlockDescriptor;
    };
type BlockDescriptor = {
  description: string;
  properties: {
    [key: string]: PropertyDescriptor;
  };
};
// TODO make subtype with block field to later support schema version
type SchemaDescriptor = BlockDescriptor;

type RawPropertyDescriptor = Extract<PropertyDescriptor, { type: "raw" }>;
type RawPropertyConfig<
  Descriptor extends RawPropertyDescriptor
> = Descriptor["source"] extends "required-in-config"
  ? CtyToTypescript<Descriptor["ctyType"]>
  : Descriptor["source"] extends
      | "optional-in-config"
      | "computed-but-overridable"
  ? CtyToTypescript<Descriptor["ctyType"]> | null
  : void;
type RawPropertyState<
  Descriptor extends RawPropertyDescriptor
> = Descriptor["source"] extends "required-in-config"
  ? CtyToTypescript<Descriptor["ctyType"]>
  : Descriptor["source"] extends "optional-in-config"
  ? CtyToTypescript<Descriptor["ctyType"]> | null
  : Descriptor["source"] extends "computed" | "computed-but-overridable"
  ? CtyToTypescript<Descriptor["ctyType"]>
  : never;

type ListPropertyDescriptor = PropertyDescriptor & { type: "list" };
type ListPropertyConfig<Descriptor extends ListPropertyDescriptor> = Array<
  BlockConfig<Descriptor["itemType"]>
>;
type ListPropertyState<Descriptor extends ListPropertyDescriptor> = Array<
  BlockState<Descriptor["itemType"]>
>;

type PropertyConfig<
  Descriptor extends PropertyDescriptor
> = Descriptor extends RawPropertyDescriptor
  ? RawPropertyConfig<Descriptor>
  : Descriptor extends ListPropertyDescriptor
  ? ListPropertyConfig<Descriptor>
  : void;

export type BlockConfig<Descriptor extends BlockDescriptor> = {
  [propertyName in keyof Descriptor["properties"]]: PropertyConfig<
    Descriptor["properties"][propertyName]
  >;
};

export type SchemaConfig<Descriptor extends SchemaDescriptor> = BlockConfig<
  Descriptor
>;

type PropertyState<
  Descriptor extends PropertyDescriptor
> = Descriptor extends RawPropertyDescriptor
  ? RawPropertyState<Descriptor>
  : Descriptor extends ListPropertyDescriptor
  ? ListPropertyState<Descriptor>
  : void;

export type BlockState<Descriptor extends BlockDescriptor> = {
  [propertyName in keyof Descriptor["properties"]]: PropertyState<
    Descriptor["properties"][propertyName]
  >;
};

export type SchemaState<Descriptor extends SchemaDescriptor> = BlockState<
  Descriptor
>;

export const createSchemaDescriptor = <T extends SchemaDescriptor>(t: T): T => {
  return t;
};

export const createBlock = (descriptor: BlockDescriptor): SchemaBlock => {
  return {
    attributes: Object.entries(descriptor.properties)
      .filter(
        ([_propertyName, propertyDescriptor]) =>
          propertyDescriptor.type === "raw"
      )
      .map(([attributeName, propertyDescriptor]) => {
        const attributeDescriptor = propertyDescriptor as RawPropertyDescriptor;

        const isOptional =
          attributeDescriptor.source === "optional-in-config" ||
          attributeDescriptor.source === "computed-but-overridable";
        const isComputed =
          attributeDescriptor.source === "computed" ||
          attributeDescriptor.source === "computed-but-overridable";

        return {
          name: attributeName,
          type: ctyTypeToBuffer(attributeDescriptor.ctyType),
          optional: isOptional || undefined,
          required:
            attributeDescriptor.source === "required-in-config" || undefined,
          computed: isComputed || undefined,
        };
      }),
    block_types: Object.entries(descriptor.properties)
      .filter(
        ([_propertyName, propertyDescriptor]) =>
          propertyDescriptor.type !== "raw"
      )
      .map(([propertyName, propertyDescriptor]) => {
        const blockDescriptor = propertyDescriptor as Exclude<
          PropertyDescriptor,
          RawPropertyDescriptor
        >;

        if (blockDescriptor.type === "list") {
          return {
            type_name: propertyName,
            block: createBlock(blockDescriptor.itemType),
            nesting: "LIST",
            min_items: blockDescriptor.minItems || undefined,
            max_items: blockDescriptor.maxItems || undefined,
          };
        }

        throw new Error("unsupported");
      }),
    deprecated: false,
    version: 1,
    description: descriptor.description,
    description_kind: StringKind.PLAIN,
  };
};
export const createSchema = (descriptor: SchemaDescriptor): Schema => {
  return {
    version: 1,
    block: createBlock(descriptor),
  };
};
