import { CtyType } from './ctyType';

export type SchemaPropertyDescriptor =
  | {
      ctyType: CtyType;
      source:
        | 'required-in-config'
        | 'optional-in-config'
        | 'computed-but-overridable'
        | 'computed';
      type: 'attribute';
    }
  | {
      itemType: SchemaBlockDescriptor;
      maxItems?: number;
      minItems?: number;
      type: 'list' | 'set';
    }
  | {
      // "single" or "group"
      itemType: SchemaBlockDescriptor;
      required: boolean;
      type: 'single';
    }
  | {
      itemType: SchemaBlockDescriptor;
      type: 'map';
    };

export type AttributePropertyDescriptor = SchemaPropertyDescriptor & {
  type: 'attribute';
};
export type ListPropertyDescriptor = SchemaPropertyDescriptor & {
  type: 'list';
};

export type SchemaBlockDescriptor = {
  description: string;
  properties: {
    [key: string]: SchemaPropertyDescriptor;
  };
};

export type SchemaDescriptor = {
  block: SchemaBlockDescriptor;
};

export const createSchemaDescriptor = <T extends SchemaDescriptor>(t: T): T => {
  return t;
};

export const isOptional = (
  attributePropertyDescriptor: AttributePropertyDescriptor,
) =>
  attributePropertyDescriptor.source === 'optional-in-config' ||
  attributePropertyDescriptor.source === 'computed-but-overridable';
export const isComputed = (
  attributePropertyDescriptor: AttributePropertyDescriptor,
) =>
  attributePropertyDescriptor.source === 'computed' ||
  attributePropertyDescriptor.source === 'computed-but-overridable';
export const isRequired = (
  attributePropertyDescriptor: AttributePropertyDescriptor,
) => attributePropertyDescriptor.source === 'required-in-config';
