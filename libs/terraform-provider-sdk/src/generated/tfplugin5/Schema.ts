// Original file: src/proto/tfplugin5.proto

import type { Long } from '@grpc/proto-loader';

import type { StringKind as _tfplugin5_StringKind } from './StringKind';

export interface _tfplugin5_Schema_Attribute {
  computed?: boolean;
  deprecated?: boolean;
  description?: string;
  description_kind?: _tfplugin5_StringKind | keyof typeof _tfplugin5_StringKind;
  name?: string;
  optional?: boolean;
  required?: boolean;
  sensitive?: boolean;
  type?: Buffer | Uint8Array | string;
}

export interface _tfplugin5_Schema_Attribute__Output {
  computed?: boolean;
  deprecated?: boolean;
  description?: string;
  description_kind?: _tfplugin5_StringKind;
  name?: string;
  optional?: boolean;
  required?: boolean;
  sensitive?: boolean;
  type?: Buffer;
}

export interface _tfplugin5_Schema_Block {
  attributes?: _tfplugin5_Schema_Attribute[];
  block_types?: _tfplugin5_Schema_NestedBlock[];
  deprecated?: boolean;
  description?: string;
  description_kind?: _tfplugin5_StringKind | keyof typeof _tfplugin5_StringKind;
  version?: number | string | Long;
}

export interface _tfplugin5_Schema_Block__Output {
  attributes?: _tfplugin5_Schema_Attribute__Output[];
  block_types?: _tfplugin5_Schema_NestedBlock__Output[];
  deprecated?: boolean;
  description?: string;
  description_kind?: _tfplugin5_StringKind;
  version?: number;
}

export interface _tfplugin5_Schema_NestedBlock {
  block?: _tfplugin5_Schema_Block;
  max_items?: number | string | Long;
  min_items?: number | string | Long;
  nesting?:
    | _tfplugin5_Schema_NestedBlock_NestingMode
    | keyof typeof _tfplugin5_Schema_NestedBlock_NestingMode;
  type_name?: string;
}

export interface _tfplugin5_Schema_NestedBlock__Output {
  block?: _tfplugin5_Schema_Block__Output;
  max_items?: number;
  min_items?: number;
  nesting?: _tfplugin5_Schema_NestedBlock_NestingMode;
  type_name?: string;
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
  block?: _tfplugin5_Schema_Block;
  version?: number | string | Long;
}

export interface Schema__Output {
  block?: _tfplugin5_Schema_Block__Output;
  version?: number;
}
