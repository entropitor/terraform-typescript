// Original file: src/proto/tfplugin5.proto

import { StringKind as _tfplugin5_StringKind } from '../tfplugin5/StringKind';
import { Long } from '@grpc/proto-loader';

export interface _tfplugin5_Schema_Attribute {
  'name'?: (string);
  'type'?: (Buffer | Uint8Array | string);
  'description'?: (string);
  'required'?: (boolean);
  'optional'?: (boolean);
  'computed'?: (boolean);
  'sensitive'?: (boolean);
  'descriptionKind'?: (_tfplugin5_StringKind | keyof typeof _tfplugin5_StringKind);
  'deprecated'?: (boolean);
}

export interface _tfplugin5_Schema_Attribute__Output {
  'name'?: (string);
  'type'?: (Buffer);
  'description'?: (string);
  'required'?: (boolean);
  'optional'?: (boolean);
  'computed'?: (boolean);
  'sensitive'?: (boolean);
  'descriptionKind'?: (_tfplugin5_StringKind);
  'deprecated'?: (boolean);
}

export interface _tfplugin5_Schema_Block {
  'version'?: (number | string | Long);
  'attributes'?: (_tfplugin5_Schema_Attribute)[];
  'blockTypes'?: (_tfplugin5_Schema_NestedBlock)[];
  'description'?: (string);
  'descriptionKind'?: (_tfplugin5_StringKind | keyof typeof _tfplugin5_StringKind);
  'deprecated'?: (boolean);
}

export interface _tfplugin5_Schema_Block__Output {
  'version'?: (Long);
  'attributes'?: (_tfplugin5_Schema_Attribute__Output)[];
  'blockTypes'?: (_tfplugin5_Schema_NestedBlock__Output)[];
  'description'?: (string);
  'descriptionKind'?: (_tfplugin5_StringKind);
  'deprecated'?: (boolean);
}

export interface _tfplugin5_Schema_NestedBlock {
  'typeName'?: (string);
  'block'?: (_tfplugin5_Schema_Block);
  'nesting'?: (_tfplugin5_Schema_NestedBlock_NestingMode | keyof typeof _tfplugin5_Schema_NestedBlock_NestingMode);
  'minItems'?: (number | string | Long);
  'maxItems'?: (number | string | Long);
}

export interface _tfplugin5_Schema_NestedBlock__Output {
  'typeName'?: (string);
  'block'?: (_tfplugin5_Schema_Block__Output);
  'nesting'?: (_tfplugin5_Schema_NestedBlock_NestingMode);
  'minItems'?: (Long);
  'maxItems'?: (Long);
}

// Original file: src/proto/tfplugin5.proto

export enum _tfplugin5_Schema_NestedBlock_NestingMode {
  INVALID = 0,
  SINGLE = 1,
  LIST = 2,
  SET = 3,
  MAP = 4,
  GROUP = 5,
}

export interface Schema {
  'version'?: (number | string | Long);
  'block'?: (_tfplugin5_Schema_Block);
}

export interface Schema__Output {
  'version'?: (Long);
  'block'?: (_tfplugin5_Schema_Block__Output);
}
