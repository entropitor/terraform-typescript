// Original file: src/proto/tfplugin5.proto

import type {
  AttributePath as _tfplugin5_AttributePath,
  AttributePath__Output as _tfplugin5_AttributePath__Output,
} from './AttributePath';

// Original file: src/proto/tfplugin5.proto

export enum _tfplugin5_Diagnostic_Severity {
  INVALID = 0,
  ERROR = 1,
  WARNING = 2,
}

export interface Diagnostic {
  attribute?: _tfplugin5_AttributePath;
  detail?: string;
  severity?:
    | _tfplugin5_Diagnostic_Severity
    | keyof typeof _tfplugin5_Diagnostic_Severity;
  summary?: string;
}

export interface Diagnostic__Output {
  attribute?: _tfplugin5_AttributePath__Output;
  detail?: string;
  severity?: _tfplugin5_Diagnostic_Severity;
  summary?: string;
}
