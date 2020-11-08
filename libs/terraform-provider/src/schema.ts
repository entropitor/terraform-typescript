import { ctyType, CtyType, ctyString } from "./ctyType";
import { Schema } from "./generated/tfplugin5/Schema";
import { StringKind } from "./generated/tfplugin5/StringKind";

type AttributeDescriptor = {
  type: CtyType;
  inConfig: "required" | "optional" | "absent";
  computed?: boolean;
};
type SchemaDescriptor = {
  description: string;
  properties: {
    [key: string]: AttributeDescriptor;
  };
};

type TypeScriptType<Cty extends CtyType> = Cty["type"] extends "string"
  ? string
  : void;
type AttributeConfig<
  Descriptor extends AttributeDescriptor
> = Descriptor["inConfig"] extends "required"
  ? TypeScriptType<Descriptor["type"]>
  : Descriptor["inConfig"] extends "optional"
  ? TypeScriptType<Descriptor["type"]> | null
  : void;
export type SchemaConfig<Descriptor extends SchemaDescriptor> = {
  [attributeName in keyof Descriptor["properties"]]: AttributeConfig<
    Descriptor["properties"][attributeName]
  >;
};

export const createSchema = (descriptor: SchemaDescriptor): Schema => {
  return {
    version: 1,
    block: {
      attributes: Object.entries(descriptor.properties).map(
        ([attributeName, attributeDescriptor]) => {
          return {
            name: attributeName,
            type: ctyType(attributeDescriptor.type),
            optional: attributeDescriptor.inConfig === "optional" || undefined,
            required: attributeDescriptor.inConfig === "required" || undefined,
            computed:
              attributeDescriptor.inConfig === "absent" ||
              attributeDescriptor.computed ||
              undefined,
          };
        }
      ),
      block_types: [],
      deprecated: false,
      version: 1,
      description: descriptor.description,
      description_kind: StringKind.PLAIN,
    },
  };
};
