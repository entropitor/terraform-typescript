// Original file: src/proto/tfplugin5.proto

export interface RawState {
  flatmap?: { [key: string]: string };
  json?: Buffer | Uint8Array | string;
}

export interface RawState__Output {
  flatmap?: { [key: string]: string };
  json?: Buffer;
}
