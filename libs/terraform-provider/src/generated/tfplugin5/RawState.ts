// Original file: src/proto/tfplugin5.proto


export interface RawState {
  'json'?: (Buffer | Uint8Array | string);
  'flatmap'?: ({[key: string]: string});
}

export interface RawState__Output {
  'json'?: (Buffer);
  'flatmap'?: ({[key: string]: string});
}
