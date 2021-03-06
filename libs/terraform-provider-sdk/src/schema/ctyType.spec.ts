import { Equals, expectTypeToBeFalse, expectTypeToBeTrue } from '../testUtils';

import {
  ctyAny,
  ctyBoolean,
  ctyList,
  ctyMap,
  ctyNumber,
  ctyObject,
  ctySet,
  ctyString,
  CtyToTypescript,
  ctyTuple,
  ctyTypeToBuffer,
} from './ctyType';

describe('private constructors', () => {
  const fakeCtyString = {
    brand: Symbol('fakeSymbol'),
    type: 'string',
  } as const;
  expectTypeToBeFalse<Equals<typeof ctyString, typeof fakeCtyString>>();

  // @ts-expect-error fakeCtyString is not a CtyType
  ctyTypeToBuffer(fakeCtyString);
});

describe('ctyString', () => {
  const type = ctyString;

  it('ctyTypeToBuffer', () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('"string"'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, string>>();
});

describe('ctyNumber', () => {
  const type = ctyNumber;

  it('ctyTypeToBuffer', () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('"number"'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, number>>();
});

describe('ctyBoolean', () => {
  const type = ctyBoolean;

  it('ctyTypeToBuffer', () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('"bool"'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, boolean>>();
});

describe('ctyAny', () => {
  const type = ctyAny;

  it('ctyTypeToBuffer', () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('"dynamic"'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, any>>();
});

describe('ctyList(ctyNumber)', () => {
  const type = ctyList(ctyNumber);

  it('ctyTypeToBuffer', () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('["list","number"]'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, number[]>>();
});

describe('ctySet(ctyNumber)', () => {
  const type = ctySet(ctyNumber);

  it('ctyTypeToBuffer', () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('["set","number"]'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, Set<number>>>();
});

describe('ctyMap(ctyNumber)', () => {
  const type = ctyMap(ctyNumber);

  it('ctyTypeToBuffer', () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('["map","number"]'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, Record<string, number>>>();
});

describe('ctyTuple(ctyNumber, ctyString)', () => {
  const type = ctyTuple(ctyNumber, ctyString);

  it('ctyTypeToBuffer', () => {
    expect(ctyTypeToBuffer(type)).toEqual(
      Buffer.from('["tuple",["number","string"]]'),
    );
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, [number, string]>>();
});

describe('ctyObject({ name: ctyString, age: ctyNumber })', () => {
  const type = ctyObject({ age: ctyNumber, name: ctyString });

  it('ctyTypeToBuffer', () => {
    expect(ctyTypeToBuffer(type)).toEqual(
      Buffer.from('["object",{"age":"number","name":"string"}]'),
    );
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<
    Equals<
      Computed,
      {
        age: number;
        name: string;
      }
    >
  >();
});
