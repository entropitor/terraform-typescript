// Original file: src/proto/tfplugin5.proto

export interface DynamicValue {
  json?: Buffer | Uint8Array | string;
  msgpack?: Buffer | Uint8Array | string;
}

export interface DynamicValue__Output {
  json?: Buffer;
  msgpack?: Buffer;
}
