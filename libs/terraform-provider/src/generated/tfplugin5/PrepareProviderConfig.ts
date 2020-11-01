// Original file: src/proto/tfplugin5.proto

import { DynamicValue as _tfplugin5_DynamicValue, DynamicValue__Output as _tfplugin5_DynamicValue__Output } from '../tfplugin5/DynamicValue';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_PrepareProviderConfig_Request {
  'config'?: (_tfplugin5_DynamicValue);
}

export interface _tfplugin5_PrepareProviderConfig_Request__Output {
  'config'?: (_tfplugin5_DynamicValue__Output);
}

export interface _tfplugin5_PrepareProviderConfig_Response {
  'prepared_config'?: (_tfplugin5_DynamicValue);
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
}

export interface _tfplugin5_PrepareProviderConfig_Response__Output {
  'prepared_config'?: (_tfplugin5_DynamicValue__Output);
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
}

export interface PrepareProviderConfig {
}

export interface PrepareProviderConfig__Output {
}
