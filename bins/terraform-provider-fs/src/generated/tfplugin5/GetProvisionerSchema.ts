// Original file: src/proto/tfplugin5.proto

import { Schema as _tfplugin5_Schema, Schema__Output as _tfplugin5_Schema__Output } from '../tfplugin5/Schema';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';

export interface _tfplugin5_GetProvisionerSchema_Request {
}

export interface _tfplugin5_GetProvisionerSchema_Request__Output {
}

export interface _tfplugin5_GetProvisionerSchema_Response {
  'provisioner'?: (_tfplugin5_Schema);
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
}

export interface _tfplugin5_GetProvisionerSchema_Response__Output {
  'provisioner'?: (_tfplugin5_Schema__Output);
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
}

export interface GetProvisionerSchema {
}

export interface GetProvisionerSchema__Output {
}
