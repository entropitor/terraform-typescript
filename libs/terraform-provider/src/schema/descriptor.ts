import { CtyType } from "./ctyType";

export type SchemaPropertyDescriptor =
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
      itemType: SchemaBlockDescriptor;
    }
  | {
      type: "single";
      required: boolean; // "single" or "group"
      itemType: SchemaBlockDescriptor;
    }
  | {
      type: "map";
      itemType: SchemaBlockDescriptor;
    };

export type RawPropertyDescriptor = SchemaPropertyDescriptor & { type: "raw" };
export type ListPropertyDescriptor = SchemaPropertyDescriptor & {
  type: "list";
};

export type SchemaBlockDescriptor = {
  description: string;
  properties: {
    [key: string]: SchemaPropertyDescriptor;
  };
};

// TODO make subtype with block field to later support schema version
export type SchemaDescriptor = SchemaBlockDescriptor;

export const createSchemaDescriptor = <T extends SchemaDescriptor>(t: T): T => {
  return t;
};
