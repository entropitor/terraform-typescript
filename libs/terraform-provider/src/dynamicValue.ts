import * as msgpack from '@msgpack/msgpack';

import { DynamicValue } from './generated/tfplugin5/DynamicValue';

const extensionCodec = new msgpack.ExtensionCodec();

const UNKNOWN_VALUE_EXTENSION = 0;
export const unknownSymbol = Symbol('unknownValue');
extensionCodec.register({
  decode: (_data) => {
    return unknownSymbol;
  },
  encode: (object) => {
    if (object === unknownSymbol) {
      return Buffer.from([]);
      // Seems empty buffer is okay but there is also
      // https://github.com/zclconf/go-cty/blob/e5225636c8c28add5fe543052061d90c63dada5e/cty/msgpack/unknown.go#L12
      // return Buffer.from([0xd4, 0, 0]);
    }
    return null;
  },
  type: UNKNOWN_VALUE_EXTENSION,
});

export const parseDynamicValue = <T>(value: DynamicValue): T => {
  if (value.msgpack) {
    return msgpack.decode(value.msgpack as Uint8Array, { extensionCodec }) as T;
  }
  if (value.json) {
    return JSON.parse(value.json.toString()) as T;
  }
  return {} as T;
};

export const serializeDynamicValue = (value: any): DynamicValue => {
  const encoded: Uint8Array = msgpack.encode(value, {
    extensionCodec,
  });
  const buffer: Buffer = Buffer.from(
    encoded.buffer,
    encoded.byteOffset,
    encoded.byteLength,
  );

  return {
    json: Buffer.from(JSON.stringify(value)),
    msgpack: buffer,
  };
};
