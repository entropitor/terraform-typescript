// Original file: src/proto/tfplugin5.proto

import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from './DynamicValue';

export interface _tfplugin5_ProvisionResource_Request {
  config?: _tfplugin5_DynamicValue;
  connection?: _tfplugin5_DynamicValue;
}

export interface _tfplugin5_ProvisionResource_Request__Output {
  config?: _tfplugin5_DynamicValue__Output;
  connection?: _tfplugin5_DynamicValue__Output;
}

export interface _tfplugin5_ProvisionResource_Response {
  diagnostics?: _tfplugin5_Diagnostic[];
  output?: string;
}

export interface _tfplugin5_ProvisionResource_Response__Output {
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  output?: string;
}

export interface ProvisionResource {}

export interface ProvisionResource__Output {}
