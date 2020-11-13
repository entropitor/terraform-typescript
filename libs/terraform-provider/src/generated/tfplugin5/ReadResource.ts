// Original file: src/proto/tfplugin5.proto

import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from './DynamicValue';

export interface _tfplugin5_ReadResource_Request {
  current_state?: _tfplugin5_DynamicValue;
  private?: Buffer | Uint8Array | string;
  provider_meta?: _tfplugin5_DynamicValue;
  type_name?: string;
}

export interface _tfplugin5_ReadResource_Request__Output {
  current_state?: _tfplugin5_DynamicValue__Output;
  private?: Buffer;
  provider_meta?: _tfplugin5_DynamicValue__Output;
  type_name?: string;
}

export interface _tfplugin5_ReadResource_Response {
  diagnostics?: _tfplugin5_Diagnostic[];
  new_state?: _tfplugin5_DynamicValue;
  private?: Buffer | Uint8Array | string;
}

export interface _tfplugin5_ReadResource_Response__Output {
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  new_state?: _tfplugin5_DynamicValue__Output;
  private?: Buffer;
}

export interface ReadResource {}

export interface ReadResource__Output {}
