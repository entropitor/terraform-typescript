// Original file: src/proto/tfplugin5.proto

import { DynamicValue as _tfplugin5_DynamicValue, DynamicValue__Output as _tfplugin5_DynamicValue__Output } from '../tfplugin5/DynamicValue';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_ReadResource_Request {
  'typeName'?: (string);
  'currentState'?: (_tfplugin5_DynamicValue);
  'private'?: (Buffer | Uint8Array | string);
  'providerMeta'?: (_tfplugin5_DynamicValue);
}

export interface _tfplugin5_ReadResource_Request__Output {
  'typeName'?: (string);
  'currentState'?: (_tfplugin5_DynamicValue__Output);
  'private'?: (Buffer);
  'providerMeta'?: (_tfplugin5_DynamicValue__Output);
}

export interface _tfplugin5_ReadResource_Response {
  'newState'?: (_tfplugin5_DynamicValue);
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
  'private'?: (Buffer | Uint8Array | string);
}

export interface _tfplugin5_ReadResource_Response__Output {
  'newState'?: (_tfplugin5_DynamicValue__Output);
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
  'private'?: (Buffer);
}

export interface ReadResource {
}

export interface ReadResource__Output {
}
