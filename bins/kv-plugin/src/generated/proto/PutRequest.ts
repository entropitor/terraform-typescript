// Original file: src/proto/kv.proto


export interface PutRequest {
  'key'?: (string);
  'value'?: (Buffer | Uint8Array | string);
}

export interface PutRequest__Output {
  'key'?: (string);
  'value'?: (Buffer);
}
