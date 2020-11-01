// Original file: src/proto/tfplugin5.proto

import { DynamicValue as _tfplugin5_DynamicValue, DynamicValue__Output as _tfplugin5_DynamicValue__Output } from '../tfplugin5/DynamicValue';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_ValidateProvisionerConfig_Request {
  'config'?: (_tfplugin5_DynamicValue);
}

export interface _tfplugin5_ValidateProvisionerConfig_Request__Output {
  'config'?: (_tfplugin5_DynamicValue__Output);
}

export interface _tfplugin5_ValidateProvisionerConfig_Response {
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
}

export interface _tfplugin5_ValidateProvisionerConfig_Response__Output {
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
}

export interface ValidateProvisionerConfig {
}

export interface ValidateProvisionerConfig__Output {
}
