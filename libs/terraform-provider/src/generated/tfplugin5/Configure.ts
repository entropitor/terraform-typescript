// Original file: src/proto/tfplugin5.proto

import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from './DynamicValue';

export interface _tfplugin5_Configure_Request {
  config?: _tfplugin5_DynamicValue;
  terraform_version?: string;
}

export interface _tfplugin5_Configure_Request__Output {
  config?: _tfplugin5_DynamicValue__Output;
  terraform_version?: string;
}

export interface _tfplugin5_Configure_Response {
  diagnostics?: _tfplugin5_Diagnostic[];
}

export interface _tfplugin5_Configure_Response__Output {
  diagnostics?: _tfplugin5_Diagnostic__Output[];
}

export interface Configure {}

export interface Configure__Output {}
