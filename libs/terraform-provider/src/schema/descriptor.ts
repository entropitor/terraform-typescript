import { CtyType } from './ctyType';

export type SchemaPropertyDescriptor =
  | {
      ctyType: CtyType;
      source:
        | 'required-in-config'
        | 'optional-in-config'
        | 'computed-but-overridable'
        | 'computed';
      type: 'raw';
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

export type RawPropertyDescriptor = SchemaPropertyDescriptor & { type: 'raw' };
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

export const isOptional = (rawPropertyDescriptor: RawPropertyDescriptor) =>
  rawPropertyDescriptor.source === 'optional-in-config' ||
  rawPropertyDescriptor.source === 'computed-but-overridable';
export const isComputed = (rawPropertyDescriptor: RawPropertyDescriptor) =>
  rawPropertyDescriptor.source === 'computed' ||
  rawPropertyDescriptor.source === 'computed-but-overridable';
export const isRequired = (rawPropertyDescriptor: RawPropertyDescriptor) =>
  rawPropertyDescriptor.source === 'required-in-config';
