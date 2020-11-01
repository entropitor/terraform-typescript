// Original file: src/proto/tfplugin5.proto

import { DynamicValue as _tfplugin5_DynamicValue, DynamicValue__Output as _tfplugin5_DynamicValue__Output } from '../tfplugin5/DynamicValue';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_ImportResourceState_ImportedResource {
  'typeName'?: (string);
  'state'?: (_tfplugin5_DynamicValue);
  'private'?: (Buffer | Uint8Array | string);
}

export interface _tfplugin5_ImportResourceState_ImportedResource__Output {
  'typeName'?: (string);
  'state'?: (_tfplugin5_DynamicValue__Output);
  'private'?: (Buffer);
}

export interface _tfplugin5_ImportResourceState_Request {
  'typeName'?: (string);
  'id'?: (string);
}

export interface _tfplugin5_ImportResourceState_Request__Output {
  'typeName'?: (string);
  'id'?: (string);
}

export interface _tfplugin5_ImportResourceState_Response {
  'importedResources'?: (_tfplugin5_ImportResourceState_ImportedResource)[];
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
}

export interface _tfplugin5_ImportResourceState_Response__Output {
  'importedResources'?: (_tfplugin5_ImportResourceState_ImportedResource__Output)[];
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
}

export interface ImportResourceState {
}

export interface ImportResourceState__Output {
}
