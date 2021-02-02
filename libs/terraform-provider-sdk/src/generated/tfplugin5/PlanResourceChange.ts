// Original file: src/proto/tfplugin5.proto

import type {
  AttributePath as _tfplugin5_AttributePath,
  AttributePath__Output as _tfplugin5_AttributePath__Output,
} from './AttributePath';
import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from './DynamicValue';

export interface _tfplugin5_PlanResourceChange_Request {
  config?: _tfplugin5_DynamicValue;
  prior_private?: Buffer | Uint8Array | string;
  prior_state?: _tfplugin5_DynamicValue;
  proposed_new_state?: _tfplugin5_DynamicValue;
  provider_meta?: _tfplugin5_DynamicValue;
  type_name?: string;
}

export interface _tfplugin5_PlanResourceChange_Request__Output {
  config?: _tfplugin5_DynamicValue__Output;
  prior_private?: Buffer;
  prior_state?: _tfplugin5_DynamicValue__Output;
  proposed_new_state?: _tfplugin5_DynamicValue__Output;
  provider_meta?: _tfplugin5_DynamicValue__Output;
  type_name?: string;
}

export interface _tfplugin5_PlanResourceChange_Response {
  diagnostics?: _tfplugin5_Diagnostic[];
  legacy_type_system?: boolean;
  planned_private?: Buffer | Uint8Array | string;
  planned_state?: _tfplugin5_DynamicValue;
  requires_replace?: _tfplugin5_AttributePath[];
}

export interface _tfplugin5_PlanResourceChange_Response__Output {
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  legacy_type_system?: boolean;
  planned_private?: Buffer;
  planned_state?: _tfplugin5_DynamicValue__Output;
  requires_replace?: _tfplugin5_AttributePath__Output[];
}

export interface PlanResourceChange {}

export interface PlanResourceChange__Output {}
