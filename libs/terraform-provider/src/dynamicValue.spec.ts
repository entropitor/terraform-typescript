import {
  parseDynamicValue,
  serializeDynamicValue,
  unknownSymbol,
} from './dynamicValue';

describe('parseDynamicValue', () => {
  it('works from msgpack', () => {
    expect(
      parseDynamicValue({ msgpack: Buffer.from([129, 163, 102, 111, 111, 3]) }),
    ).toEqual({
      foo: 3,
    });
  });

  it('works from json', () => {
    expect(parseDynamicValue({ json: Buffer.from('{"foo":3}') })).toEqual({
      foo: 3,
    });
  });

  it('works from msgpack with unknownSymbol', () => {
    const serialized = serializeDynamicValue({ foo: 3, symbol: unknownSymbol });
    expect(parseDynamicValue(serialized)).toEqual({
      foo: 3,
      symbol: unknownSymbol,
    });
  });
});

describe('serializeDynamicValue', () => {
  it('works', () => {
    expect(serializeDynamicValue({ foo: 3 })).toEqual({
      json: Buffer.from('{"foo":3}'),
      msgpack: Buffer.from([129, 163, 102, 111, 111, 3]),
    });
  });

  it('works with the unknownSymbol', () => {
    expect(serializeDynamicValue({ foo: 3, symbol: unknownSymbol })).toEqual({
      json: Buffer.from('{"foo":3}'),
      msgpack: Buffer.from([
        130,
        163,
        102,
        111,
        111,
        3,
        166,
        115,
        121,
        109,
        98,
        111,
        108,
        199,
        0,
        0,
      ]),
    });
  });
});
