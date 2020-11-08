import { ctyType, CtyType } from "./ctyType";
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
