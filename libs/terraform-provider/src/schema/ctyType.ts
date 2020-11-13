import { valueMap } from "../mapOverObject";

const unreachable = (_: never): void => {};

// This const is exported in this file but not in the global package to ensure typescript
// can properly infer the 'unique symbol'
/**
 * Ensure that users should use the constructors defined below instead of type literals
 */
export const brand = Symbol("ctyTypeBrand");

/**
 * The runtime type system that Terraform uses
 *
 * Original Go Library: https://github.com/zclconf/go-cty
 */
export type CtyType =
  | {
      type: "string" | "number" | "boolean" | "any";
      brand: typeof brand;
    }
  | {
      type: "list" | "set" | "map";
      itemType: CtyType;
      brand: typeof brand;
    }
  | {
      type: "tuple";
      itemTypes: CtyType[];
      brand: typeof brand;
    }
  | {
      type: "object";
      itemType: {
        [key: string]: CtyType;
      };
      brand: typeof brand;
    };

const ctyTypeToJson = (typ: CtyType): any => {
  switch (typ.type) {
    case "number":
    case "string": {
      return typ.type;
    }
    case "boolean": {
      return "bool";
    }
    case "any": {
      return "dynamic";
    }
    case "map":
    case "set":
    case "list": {
      return [typ.type, ctyTypeToJson(typ.itemType)];
    }
    case "tuple": {
      return [typ.type, typ.itemTypes.map(ctyTypeToJson)];
    }
    case "object": {
      return [typ.type, valueMap(ctyTypeToJson, typ.itemType)];
    }
    default:
      unreachable(typ);
      return "";
  }
};

export const ctyTypeToBuffer = (typ: CtyType): Buffer => {
  return Buffer.from(JSON.stringify(ctyTypeToJson(typ)));
};

export const ctyString = {
  type: "string",
  brand,
} as const;
export const ctyNumber = {
  type: "number",
  brand,
} as const;
export const ctyBoolean = {
  type: "boolean",
  brand,
} as const;
export const ctyAny = {
  type: "any",
  brand,
} as const;
export const ctyList = <C extends CtyType>(of: C) =>
  ({
    type: "list",
    itemType: of,
    brand,
  } as const);
export const ctySet = <C extends CtyType>(of: C) =>
  ({
    type: "set",
    itemType: of,
    brand,
  } as const);
export const ctyMap = <C extends CtyType>(of: C) =>
  ({
    type: "map",
    itemType: of,
    brand,
  } as const);
export const ctyTuple = <T extends CtyType[]>(...of: T) =>
  ({
    type: "tuple",
    itemTypes: of,
    brand,
  } as const);
export const ctyObject = <R extends { [key: string]: CtyType }>(of: R) =>
  ({
    type: "object",
    itemType: of,
    brand,
  } as const);

type CtyString = typeof ctyString;
type CtyNumber = typeof ctyNumber;
type CtyBoolean = typeof ctyBoolean;
type CtyAny = typeof ctyAny;
type CtyList = ReturnType<typeof ctyList>;
type CtySet = ReturnType<typeof ctySet>;
type CtyMap = ReturnType<typeof ctyMap>;
type CtyTuple = ReturnType<typeof ctyTuple>;
type CtyObject = ReturnType<typeof ctyObject>;

type CtyTupleToTypescript<T> = {
  [key in keyof T]: CtyToTypescript<T[key]>;
};
export type CtyToTypescript<Cty> = Cty extends CtyString
  ? string
  : Cty extends CtyNumber
  ? number
  : Cty extends CtyBoolean
  ? boolean
  : Cty extends CtyAny
  ? any
  : Cty extends CtyList
  ? Array<CtyToTypescript<Cty["itemType"]>>
  : Cty extends CtySet
  ? Set<CtyToTypescript<Cty["itemType"]>>
  : Cty extends CtyMap
  ? { [key: string]: CtyToTypescript<Cty["itemType"]> }
  : Cty extends CtyTuple
  ? CtyTupleToTypescript<Cty["itemTypes"]>
  : Cty extends CtyObject
  ? { [key in keyof Cty["itemType"]]: CtyToTypescript<Cty["itemType"][key]> }
  : never;
