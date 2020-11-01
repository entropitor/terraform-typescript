// Original file: src/proto/tfplugin5.proto

import { DynamicValue as _tfplugin5_DynamicValue, DynamicValue__Output as _tfplugin5_DynamicValue__Output } from '../tfplugin5/DynamicValue';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_ApplyResourceChange_Request {
  'typeName'?: (string);
  'priorState'?: (_tfplugin5_DynamicValue);
  'plannedState'?: (_tfplugin5_DynamicValue);
  'config'?: (_tfplugin5_DynamicValue);
  'plannedPrivate'?: (Buffer | Uint8Array | string);
  'providerMeta'?: (_tfplugin5_DynamicValue);
}

export interface _tfplugin5_ApplyResourceChange_Request__Output {
  'typeName'?: (string);
  'priorState'?: (_tfplugin5_DynamicValue__Output);
  'plannedState'?: (_tfplugin5_DynamicValue__Output);
  'config'?: (_tfplugin5_DynamicValue__Output);
  'plannedPrivate'?: (Buffer);
  'providerMeta'?: (_tfplugin5_DynamicValue__Output);
}

export interface _tfplugin5_ApplyResourceChange_Response {
  'newState'?: (_tfplugin5_DynamicValue);
  'private'?: (Buffer | Uint8Array | string);
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
  'legacyTypeSystem'?: (boolean);
}

export interface _tfplugin5_ApplyResourceChange_Response__Output {
  'newState'?: (_tfplugin5_DynamicValue__Output);
  'private'?: (Buffer);
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
  'legacyTypeSystem'?: (boolean);
}

export interface ApplyResourceChange {
}

export interface ApplyResourceChange__Output {
}
