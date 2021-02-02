// Original file: src/proto/tfplugin5.proto

import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from './DynamicValue';

export interface _tfplugin5_PrepareProviderConfig_Request {
  config?: _tfplugin5_DynamicValue;
}

export interface _tfplugin5_PrepareProviderConfig_Request__Output {
  config?: _tfplugin5_DynamicValue__Output;
}

export interface _tfplugin5_PrepareProviderConfig_Response {
  diagnostics?: _tfplugin5_Diagnostic[];
  prepared_config?: _tfplugin5_DynamicValue;
}

export interface _tfplugin5_PrepareProviderConfig_Response__Output {
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  prepared_config?: _tfplugin5_DynamicValue__Output;
}

export interface PrepareProviderConfig {}

export interface PrepareProviderConfig__Output {}
