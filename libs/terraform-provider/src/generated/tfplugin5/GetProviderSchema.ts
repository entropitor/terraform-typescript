// Original file: src/proto/tfplugin5.proto

import type { Schema as _tfplugin5_Schema, Schema__Output as _tfplugin5_Schema__Output } from '../tfplugin5/Schema';
import type { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_GetProviderSchema_Request {
}

export interface _tfplugin5_GetProviderSchema_Request__Output {
}

export interface _tfplugin5_GetProviderSchema_Response {
  'provider'?: (_tfplugin5_Schema);
  'resource_schemas'?: ({[key: string]: _tfplugin5_Schema});
  'data_source_schemas'?: ({[key: string]: _tfplugin5_Schema});
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
  'provider_meta'?: (_tfplugin5_Schema);
}

export interface _tfplugin5_GetProviderSchema_Response__Output {
  'provider'?: (_tfplugin5_Schema__Output);
  'resource_schemas'?: ({[key: string]: _tfplugin5_Schema__Output});
  'data_source_schemas'?: ({[key: string]: _tfplugin5_Schema__Output});
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
  'provider_meta'?: (_tfplugin5_Schema__Output);
}

export interface GetProviderSchema {
}

export interface GetProviderSchema__Output {
}
