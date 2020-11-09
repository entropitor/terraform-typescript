import { valueMap } from "./mapOverObject";

const unreachable = (_: never): void => {};

/**
 * The runtime type system that Terraform uses
 *
 * Original Go Library: https://github.com/zclconf/go-cty
 */
export type CtyType =
  | {
      type: "string" | "number" | "boolean" | "any";
    }
  | {
      type: "list" | "set" | "map";
      itemType: CtyType;
    }
  | {
      type: "tuple";
      itemTypes: CtyType[];
    }
  | {
      type: "object";
      itemType: {
        [key: string]: CtyType;
      };
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

export const ctyString = () =>
  ({
    type: "string",
  } as const);
export const ctyNumber = () =>
  ({
    type: "number",
  } as const);
export const ctyBoolean = () =>
  ({
    type: "boolean",
  } as const);
export const ctyAny = () =>
  ({
    type: "any",
  } as const);
export const ctyList = <C extends CtyType>(of: C) =>
  ({
    type: "list",
    itemType: of,
  } as const);
export const ctySet = <C extends CtyType>(of: C) =>
  ({
    type: "set",
    itemType: of,
  } as const);
export const ctyMap = <C extends CtyType>(of: C) =>
  ({
    type: "map",
    itemType: of,
  } as const);
export const ctyTuple = <T extends CtyType[]>(...of: T) =>
  ({
    type: "tuple",
    itemTypes: of,
  } as const);
export const ctyObject = <R extends { [key: string]: CtyType }>(of: R) =>
  ({
    type: "object",
    itemType: of,
  } as const);

type CtyString = ReturnType<typeof ctyString>;
type CtyNumber = ReturnType<typeof ctyNumber>;
type CtyBoolean = ReturnType<typeof ctyBoolean>;
type CtyAny = ReturnType<typeof ctyAny>;
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
