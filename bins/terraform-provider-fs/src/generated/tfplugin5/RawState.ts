// Original file: src/proto/tfplugin5.proto


export interface RawState {
  'json'?: (Buffer | Uint8Array | string);
  'flatmap'?: (string);
}

export interface RawState__Output {
  'json'?: (Buffer);
  'flatmap'?: (string);
}
