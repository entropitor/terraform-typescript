// Original file: src/proto/tfplugin5.proto

import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from '../tfplugin5/DynamicValue';
import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from '../tfplugin5/Diagnostic';

export interface _tfplugin5_ReadResource_Request {
  type_name?: string;
  current_state?: _tfplugin5_DynamicValue;
  private?: Buffer | Uint8Array | string;
  provider_meta?: _tfplugin5_DynamicValue;
}

export interface _tfplugin5_ReadResource_Request__Output {
  type_name?: string;
  current_state?: _tfplugin5_DynamicValue__Output;
  private?: Buffer;
  provider_meta?: _tfplugin5_DynamicValue__Output;
}

export interface _tfplugin5_ReadResource_Response {
  new_state?: _tfplugin5_DynamicValue;
  diagnostics?: _tfplugin5_Diagnostic[];
  private?: Buffer | Uint8Array | string;
}

export interface _tfplugin5_ReadResource_Response__Output {
  new_state?: _tfplugin5_DynamicValue__Output;
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  private?: Buffer;
}

export interface ReadResource {}

export interface ReadResource__Output {}
