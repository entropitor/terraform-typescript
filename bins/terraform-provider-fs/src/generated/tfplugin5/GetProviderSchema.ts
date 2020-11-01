// Original file: src/proto/tfplugin5.proto

import { Schema as _tfplugin5_Schema, Schema__Output as _tfplugin5_Schema__Output } from '../tfplugin5/Schema';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_GetProviderSchema_Request {
}

export interface _tfplugin5_GetProviderSchema_Request__Output {
}

export interface _tfplugin5_GetProviderSchema_Response {
  'provider'?: (_tfplugin5_Schema);
  'resourceSchemas'?: (_tfplugin5_Schema);
  'dataSourceSchemas'?: (_tfplugin5_Schema);
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
  'providerMeta'?: (_tfplugin5_Schema);
}

export interface _tfplugin5_GetProviderSchema_Response__Output {
  'provider'?: (_tfplugin5_Schema__Output);
  'resourceSchemas'?: (_tfplugin5_Schema__Output);
  'dataSourceSchemas'?: (_tfplugin5_Schema__Output);
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
  'providerMeta'?: (_tfplugin5_Schema__Output);
}

export interface GetProviderSchema {
}

export interface GetProviderSchema__Output {
}
