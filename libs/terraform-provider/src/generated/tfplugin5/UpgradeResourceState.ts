// Original file: src/proto/tfplugin5.proto

import type { Long } from '@grpc/proto-loader';

import type {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from './Diagnostic';
import type {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from './DynamicValue';
import type {
  RawState as _tfplugin5_RawState,
  RawState__Output as _tfplugin5_RawState__Output,
} from './RawState';

export interface _tfplugin5_UpgradeResourceState_Request {
  raw_state?: _tfplugin5_RawState;
  type_name?: string;
  version?: number | string | Long;
}

export interface _tfplugin5_UpgradeResourceState_Request__Output {
  raw_state?: _tfplugin5_RawState__Output;
  type_name?: string;
  version?: number;
}

export interface _tfplugin5_UpgradeResourceState_Response {
  diagnostics?: _tfplugin5_Diagnostic[];
  upgraded_state?: _tfplugin5_DynamicValue;
}

export interface _tfplugin5_UpgradeResourceState_Response__Output {
  diagnostics?: _tfplugin5_Diagnostic__Output[];
  upgraded_state?: _tfplugin5_DynamicValue__Output;
}

export interface UpgradeResourceState {}

export interface UpgradeResourceState__Output {}
