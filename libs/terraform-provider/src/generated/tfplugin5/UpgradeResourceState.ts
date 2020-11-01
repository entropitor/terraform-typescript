// Original file: src/proto/tfplugin5.proto

import { RawState as _tfplugin5_RawState, RawState__Output as _tfplugin5_RawState__Output } from '../tfplugin5/RawState';
import { DynamicValue as _tfplugin5_DynamicValue, DynamicValue__Output as _tfplugin5_DynamicValue__Output } from '../tfplugin5/DynamicValue';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from '../tfplugin5/Diagnostic';
import { Long } from '@grpc/proto-loader';

export interface _tfplugin5_UpgradeResourceState_Request {
  'type_name'?: (string);
  'version'?: (number | string | Long);
  'raw_state'?: (_tfplugin5_RawState);
}

export interface _tfplugin5_UpgradeResourceState_Request__Output {
  'type_name'?: (string);
  'version'?: (number);
  'raw_state'?: (_tfplugin5_RawState__Output);
}

export interface _tfplugin5_UpgradeResourceState_Response {
  'upgraded_state'?: (_tfplugin5_DynamicValue);
  'diagnostics'?: (_tfplugin5_Diagnostic)[];
}

export interface _tfplugin5_UpgradeResourceState_Response__Output {
  'upgraded_state'?: (_tfplugin5_DynamicValue__Output);
  'diagnostics'?: (_tfplugin5_Diagnostic__Output)[];
}

export interface UpgradeResourceState {
}

export interface UpgradeResourceState__Output {
}
