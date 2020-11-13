// Original file: src/proto/tfplugin5.proto

import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  Schema as _tfplugin5_Schema,
  Schema__Output as _tfplugin5_Schema__Output,
} from './Schema';

export interface _tfplugin5_GetProviderSchema_Request {}

export interface _tfplugin5_GetProviderSchema_Request__Output {}

export interface _tfplugin5_GetProviderSchema_Response {
  data_source_schemas?: { [key: string]: _tfplugin5_Schema };
  diagnostics?: _tfplugin5_Diagnostic[];
  provider?: _tfplugin5_Schema;
  provider_meta?: _tfplugin5_Schema;
  resource_schemas?: { [key: string]: _tfplugin5_Schema };
}

export interface _tfplugin5_GetProviderSchema_Response__Output {
  data_source_schemas?: { [key: string]: _tfplugin5_Schema__Output };
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  provider?: _tfplugin5_Schema__Output;
  provider_meta?: _tfplugin5_Schema__Output;
  resource_schemas?: { [key: string]: _tfplugin5_Schema__Output };
}

export interface GetProviderSchema {}

export interface GetProviderSchema__Output {}
