// Original file: src/proto/tfplugin5.proto


export interface DynamicValue {
  'msgpack'?: (Buffer | Uint8Array | string);
  'json'?: (Buffer | Uint8Array | string);
}

export interface DynamicValue__Output {
  'msgpack'?: (Buffer);
  'json'?: (Buffer);
}
