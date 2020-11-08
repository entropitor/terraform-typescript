import { ctyType, CtyType } from "./ctyType";
import { Schema } from "./generated/tfplugin5/Schema";

type AttributeDescriptor = {
  type: CtyType;
  inConfig: "required" | "optional" | "absent";
  computed?: boolean;
};
type SchemaDescriptor = {
  [key: string]: AttributeDescriptor;
};
export const createSchema = (config: SchemaDescriptor): Schema => {
  return {
    version: 1,
    block: {
      attributes: Object.entries(config).map(
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
    },
  };
};
