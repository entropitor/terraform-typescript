// Original file: src/proto/tfplugin5.proto

import { DynamicValue as _tfplugin5_DynamicValue, DynamicValue__Output as _tfplugin5_DynamicValue__Output } from '../tfplugin5/DynamicValue';
import { AttributePath as _tfplugin5_AttributePath, AttributePath__Output as _tfplugin5_AttributePath__Output } from '../tfplugin5/AttributePath';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_PlanResourceChange_Request {
  'typeName'?: (string);
  'priorState'?: (_tfplugin5_DynamicValue);
  'proposedNewState'?: (_tfplugin5_DynamicValue);
  'config'?: (_tfplugin5_DynamicValue);
  'priorPrivate'?: (Buffer | Uint8Array | string);
  'providerMeta'?: (_tfplugin5_DynamicValue);
}

export interface _tfplugin5_PlanResourceChange_Request__Output {
  'typeName'?: (string);
  'priorState'?: (_tfplugin5_DynamicValue__Output);
  'proposedNewState'?: (_tfplugin5_DynamicValue__Output);
  'config'?: (_tfplugin5_DynamicValue__Output);
  'priorPrivate'?: (Buffer);
  'providerMeta'?: (_tfplugin5_DynamicValue__Output);
}

export interface _tfplugin5_PlanResourceChange_Response {
  'plannedState'?: (_tfplugin5_DynamicValue);
  'requiresReplace'?: (_tfplugin5_AttributePath)[];
  'plannedPrivate'?: (Buffer | Uint8Array | string);
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
  'legacyTypeSystem'?: (boolean);
}

export interface _tfplugin5_PlanResourceChange_Response__Output {
  'plannedState'?: (_tfplugin5_DynamicValue__Output);
  'requiresReplace'?: (_tfplugin5_AttributePath__Output)[];
  'plannedPrivate'?: (Buffer);
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
  'legacyTypeSystem'?: (boolean);
}

export interface PlanResourceChange {
}

export interface PlanResourceChange__Output {
}
