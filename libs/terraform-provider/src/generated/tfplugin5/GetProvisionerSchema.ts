// Original file: src/proto/tfplugin5.proto

import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  Schema as _tfplugin5_Schema,
  Schema__Output as _tfplugin5_Schema__Output,
} from './Schema';

export interface _tfplugin5_GetProvisionerSchema_Request {}

export interface _tfplugin5_GetProvisionerSchema_Request__Output {}

export interface _tfplugin5_GetProvisionerSchema_Response {
  diagnostics?: _tfplugin5_Diagnostic[];
  provisioner?: _tfplugin5_Schema;
}

export interface _tfplugin5_GetProvisionerSchema_Response__Output {
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  provisioner?: _tfplugin5_Schema__Output;
}

export interface GetProvisionerSchema {}

export interface GetProvisionerSchema__Output {}
