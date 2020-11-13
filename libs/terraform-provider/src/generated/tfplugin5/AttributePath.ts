// Original file: src/proto/tfplugin5.proto

import type { Long } from '@grpc/proto-loader';

export interface _tfplugin5_AttributePath_Step {
  attribute_name?: string;
  element_key_string?: string;
  element_key_int?: number | string | Long;
  selector?: 'attribute_name' | 'element_key_string' | 'element_key_int';
}

export interface _tfplugin5_AttributePath_Step__Output {
  attribute_name?: string;
  element_key_string?: string;
  element_key_int?: number;
}

export interface AttributePath {
  steps?: _tfplugin5_AttributePath_Step[];
}

export interface AttributePath__Output {
  steps?: _tfplugin5_AttributePath_Step__Output[];
}
