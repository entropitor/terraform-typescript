// Original file: src/proto/tfplugin5.proto

import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from '../tfplugin5/DynamicValue';
import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from '../tfplugin5/Diagnostic';

export interface _tfplugin5_ProvisionResource_Request {
  config?: _tfplugin5_DynamicValue;
  connection?: _tfplugin5_DynamicValue;
}

export interface _tfplugin5_ProvisionResource_Request__Output {
  config?: _tfplugin5_DynamicValue__Output;
  connection?: _tfplugin5_DynamicValue__Output;
}

export interface _tfplugin5_ProvisionResource_Response {
  output?: string;
  diagnostics?: _tfplugin5_Diagnostic[];
}

export interface _tfplugin5_ProvisionResource_Response__Output {
  output?: string;
  diagnostics?: _tfplugin5_Diagnostic__Output[];
}

export interface ProvisionResource {}

export interface ProvisionResource__Output {}
