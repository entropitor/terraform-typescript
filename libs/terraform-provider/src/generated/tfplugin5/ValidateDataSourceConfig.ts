// Original file: src/proto/tfplugin5.proto

import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from './DynamicValue';

export interface _tfplugin5_ValidateDataSourceConfig_Request {
  config?: _tfplugin5_DynamicValue;
  type_name?: string;
}

export interface _tfplugin5_ValidateDataSourceConfig_Request__Output {
  config?: _tfplugin5_DynamicValue__Output;
  type_name?: string;
}

export interface _tfplugin5_ValidateDataSourceConfig_Response {
  diagnostics?: _tfplugin5_Diagnostic[];
}

export interface _tfplugin5_ValidateDataSourceConfig_Response__Output {
  diagnostics?: _tfplugin5_Diagnostic__Output[];
}

export interface ValidateDataSourceConfig {}

export interface ValidateDataSourceConfig__Output {}
