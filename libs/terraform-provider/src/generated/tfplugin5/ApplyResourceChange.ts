// Original file: src/proto/tfplugin5.proto

import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from '../tfplugin5/DynamicValue';
import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from '../tfplugin5/Diagnostic';

export interface _tfplugin5_ApplyResourceChange_Request {
  type_name?: string;
  prior_state?: _tfplugin5_DynamicValue;
  planned_state?: _tfplugin5_DynamicValue;
  config?: _tfplugin5_DynamicValue;
  planned_private?: Buffer | Uint8Array | string;
  provider_meta?: _tfplugin5_DynamicValue;
}

export interface _tfplugin5_ApplyResourceChange_Request__Output {
  type_name?: string;
  prior_state?: _tfplugin5_DynamicValue__Output;
  planned_state?: _tfplugin5_DynamicValue__Output;
  config?: _tfplugin5_DynamicValue__Output;
  planned_private?: Buffer;
  provider_meta?: _tfplugin5_DynamicValue__Output;
}

export interface _tfplugin5_ApplyResourceChange_Response {
  new_state?: _tfplugin5_DynamicValue;
  private?: Buffer | Uint8Array | string;
  diagnostics?: _tfplugin5_Diagnostic[];
  legacy_type_system?: boolean;
}

export interface _tfplugin5_ApplyResourceChange_Response__Output {
  new_state?: _tfplugin5_DynamicValue__Output;
  private?: Buffer;
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  legacy_type_system?: boolean;
}

export interface ApplyResourceChange {}

export interface ApplyResourceChange__Output {}
