// Original file: src/proto/tfplugin5.proto

import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from './DynamicValue';

export interface _tfplugin5_ApplyResourceChange_Request {
  config?: _tfplugin5_DynamicValue;
  planned_private?: Buffer | Uint8Array | string;
  planned_state?: _tfplugin5_DynamicValue;
  prior_state?: _tfplugin5_DynamicValue;
  provider_meta?: _tfplugin5_DynamicValue;
  type_name?: string;
}

export interface _tfplugin5_ApplyResourceChange_Request__Output {
  config?: _tfplugin5_DynamicValue__Output;
  planned_private?: Buffer;
  planned_state?: _tfplugin5_DynamicValue__Output;
  prior_state?: _tfplugin5_DynamicValue__Output;
  provider_meta?: _tfplugin5_DynamicValue__Output;
  type_name?: string;
}

export interface _tfplugin5_ApplyResourceChange_Response {
  diagnostics?: _tfplugin5_Diagnostic[];
  legacy_type_system?: boolean;
  new_state?: _tfplugin5_DynamicValue;
  private?: Buffer | Uint8Array | string;
}

export interface _tfplugin5_ApplyResourceChange_Response__Output {
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  legacy_type_system?: boolean;
  new_state?: _tfplugin5_DynamicValue__Output;
  private?: Buffer;
}

export interface ApplyResourceChange {}

export interface ApplyResourceChange__Output {}
