// Original file: src/proto/tfplugin5.proto

import { Long } from '@grpc/proto-loader';

export interface _tfplugin5_AttributePath_Step {
  'attributeName'?: (string);
  'elementKeyString'?: (string);
  'elementKeyInt'?: (number | string | Long);
  'selector'?: "attributeName"|"elementKeyString"|"elementKeyInt";
}

export interface _tfplugin5_AttributePath_Step__Output {
  'attributeName'?: (string);
  'elementKeyString'?: (string);
  'elementKeyInt'?: (Long);
}

export interface AttributePath {
  'steps'?: (_tfplugin5_AttributePath_Step)[];
}

export interface AttributePath__Output {
  'steps'?: (_tfplugin5_AttributePath_Step__Output)[];
}
