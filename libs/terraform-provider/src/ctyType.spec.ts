import {
  ctyBoolean,
  ctyList,
  ctyMap,
  ctyNumber,
  ctySet,
  ctyString,
  CtyToTypescript,
  ctyTypeToBuffer,
} from "./ctyType";
import { Equals, expectTypeToBeTrue } from "./testUtils";

describe("ctyString()", () => {
  const type = ctyString();

  it("ctyTypeToBuffer", () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('"string"'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, string>>();
});

describe("ctyNumber()", () => {
  const type = ctyNumber();

  it("ctyTypeToBuffer", () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('"number"'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, number>>();
});

describe("ctyBoolean()", () => {
  const type = ctyBoolean();

  it("ctyTypeToBuffer", () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('"bool"'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, boolean>>();
});

describe("ctyList(ctyNumber())", () => {
  const type = ctyList(ctyNumber());

  it("ctyTypeToBuffer", () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('["list","number"]'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, Array<number>>>();
});

describe("ctySet(ctyNumber())", () => {
  const type = ctySet(ctyNumber());

  it("ctyTypeToBuffer", () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('["set","number"]'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, Set<number>>>();
});

describe("ctyMap(ctyNumber())", () => {
  const type = ctyMap(ctyNumber());

  it("ctyTypeToBuffer", () => {
    expect(ctyTypeToBuffer(type)).toEqual(Buffer.from('["map","number"]'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, Record<string, number>>>();
});
