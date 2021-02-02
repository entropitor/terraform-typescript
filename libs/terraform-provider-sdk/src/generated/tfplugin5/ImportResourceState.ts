// Original file: src/proto/tfplugin5.proto

import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from './DynamicValue';

export interface _tfplugin5_ImportResourceState_ImportedResource {
  private?: Buffer | Uint8Array | string;
  state?: _tfplugin5_DynamicValue;
  type_name?: string;
}

export interface _tfplugin5_ImportResourceState_ImportedResource__Output {
  private?: Buffer;
  state?: _tfplugin5_DynamicValue__Output;
  type_name?: string;
}

export interface _tfplugin5_ImportResourceState_Request {
  id?: string;
  type_name?: string;
}

export interface _tfplugin5_ImportResourceState_Request__Output {
  id?: string;
  type_name?: string;
}

export interface _tfplugin5_ImportResourceState_Response {
  diagnostics?: _tfplugin5_Diagnostic[];
  imported_resources?: _tfplugin5_ImportResourceState_ImportedResource[];
}

export interface _tfplugin5_ImportResourceState_Response__Output {
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  imported_resources?: _tfplugin5_ImportResourceState_ImportedResource__Output[];
}

export interface ImportResourceState {}

export interface ImportResourceState__Output {}
