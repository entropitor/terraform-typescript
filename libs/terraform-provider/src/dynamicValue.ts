import * as msgpack from '@msgpack/msgpack';
import { DynamicValue } from './generated/tfplugin5/DynamicValue';

export const parseDynamicValue = <T>(value: DynamicValue): T => {
  if (value.msgpack) {
    return msgpack.decode(value.msgpack as Uint8Array) as T;
  }
  if (value.json) {
    return JSON.parse(value.json.toString()) as T;
  }
  return {} as T;
};

export const serializeDynamicValue = (value: any): DynamicValue => {
  const encoded: Uint8Array = msgpack.encode(value);
  const buffer: Buffer = Buffer.from(
    encoded.buffer,
    encoded.byteOffset,
    encoded.byteLength,
  );

  return {
    msgpack: buffer,
    json: Buffer.from(JSON.stringify(value)),
  };
};
