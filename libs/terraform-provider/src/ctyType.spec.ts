import {
  ctyBoolean,
  ctyList,
  ctyMap,
  ctyNumber,
  ctySet,
  ctyString,
  CtyToTypescript,
  ctyType,
} from "./ctyType";
import { Equals, expectTypeToBeTrue } from "./testUtils";

describe("ctyString()", () => {
  const type = ctyString();

  it("ctyType", () => {
    expect(ctyType(type)).toEqual(Buffer.from('"string"'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, string>>();
});

describe("ctyNumber()", () => {
  const type = ctyNumber();

  it("ctyType", () => {
    expect(ctyType(type)).toEqual(Buffer.from('"number"'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, number>>();
});

describe("ctyBoolean()", () => {
  const type = ctyBoolean();

  it("ctyType", () => {
    expect(ctyType(type)).toEqual(Buffer.from('"bool"'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, boolean>>();
});

describe("ctyList(ctyNumber())", () => {
  const type = ctyList(ctyNumber());

  it("ctyType", () => {
    expect(ctyType(type)).toEqual(Buffer.from('["list","number"]'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, Array<number>>>();
});

describe("ctySet(ctyNumber())", () => {
  const type = ctySet(ctyNumber());

  it("ctyType", () => {
    expect(ctyType(type)).toEqual(Buffer.from('["set","number"]'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, Set<number>>>();
});

describe("ctyMap(ctyNumber())", () => {
  const type = ctyMap(ctyNumber());

  it("ctyType", () => {
    expect(ctyType(type)).toEqual(Buffer.from('["map","number"]'));
  });

  type Computed = CtyToTypescript<typeof type>;
  expectTypeToBeTrue<Equals<Computed, Record<string, number>>>();
});
