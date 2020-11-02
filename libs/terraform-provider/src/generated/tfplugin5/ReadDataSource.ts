// Original file: src/proto/tfplugin5.proto

import type { DynamicValue as _tfplugin5_DynamicValue, DynamicValue__Output as _tfplugin5_DynamicValue__Output } from '../tfplugin5/DynamicValue';
import type { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_ReadDataSource_Request {
  'type_name'?: (string);
  'config'?: (_tfplugin5_DynamicValue);
  'provider_meta'?: (_tfplugin5_DynamicValue);
}

export interface _tfplugin5_ReadDataSource_Request__Output {
  'type_name'?: (string);
  'config'?: (_tfplugin5_DynamicValue__Output);
  'provider_meta'?: (_tfplugin5_DynamicValue__Output);
}

export interface _tfplugin5_ReadDataSource_Response {
  'state'?: (_tfplugin5_DynamicValue);
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
}

export interface _tfplugin5_ReadDataSource_Response__Output {
  'state'?: (_tfplugin5_DynamicValue__Output);
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
}

export interface ReadDataSource {
}

export interface ReadDataSource__Output {
}
