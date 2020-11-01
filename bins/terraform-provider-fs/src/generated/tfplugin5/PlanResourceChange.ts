// Original file: src/proto/tfplugin5.proto

import { DynamicValue as _tfplugin5_DynamicValue, DynamicValue__Output as _tfplugin5_DynamicValue__Output } from '../tfplugin5/DynamicValue';
import { AttributePath as _tfplugin5_AttributePath, AttributePath__Output as _tfplugin5_AttributePath__Output } from '../tfplugin5/AttributePath';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_PlanResourceChange_Request {
  'type_name'?: (string);
  'prior_state'?: (_tfplugin5_DynamicValue);
  'proposed_new_state'?: (_tfplugin5_DynamicValue);
  'config'?: (_tfplugin5_DynamicValue);
  'prior_private'?: (Buffer | Uint8Array | string);
  'provider_meta'?: (_tfplugin5_DynamicValue);
}

export interface _tfplugin5_PlanResourceChange_Request__Output {
  'type_name'?: (string);
  'prior_state'?: (_tfplugin5_DynamicValue__Output);
  'proposed_new_state'?: (_tfplugin5_DynamicValue__Output);
  'config'?: (_tfplugin5_DynamicValue__Output);
  'prior_private'?: (Buffer);
  'provider_meta'?: (_tfplugin5_DynamicValue__Output);
}

export interface _tfplugin5_PlanResourceChange_Response {
  'planned_state'?: (_tfplugin5_DynamicValue);
  'requires_replace'?: (_tfplugin5_AttributePath)[];
  'planned_private'?: (Buffer | Uint8Array | string);
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
  'legacy_type_system'?: (boolean);
}

export interface _tfplugin5_PlanResourceChange_Response__Output {
  'planned_state'?: (_tfplugin5_DynamicValue__Output);
  'requires_replace'?: (_tfplugin5_AttributePath__Output)[];
  'planned_private'?: (Buffer);
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
  'legacy_type_system'?: (boolean);
}

export interface PlanResourceChange {
}

export interface PlanResourceChange__Output {
}
