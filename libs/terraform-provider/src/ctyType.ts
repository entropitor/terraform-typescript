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

export const ctyType = (typ: CtyType): Buffer => {
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
export const ctyTuple = (...of: CtyType[]) =>
  ({
    type: "tuple",
    itemTypes: of,
  } as const);
export const ctyObject = (of: { [key: string]: CtyType }) =>
  ({
    type: "object",
    itemType: of,
  } as const);

export type CtyToTypescript<Cty extends CtyType> = Cty extends {
  type: "string";
}
  ? string
  : Cty extends { type: "number" }
  ? number
  : Cty extends { type: "boolean" }
  ? boolean
  : Cty extends { type: "list"; itemType: CtyType }
  ? Array<CtyToTypescript<Cty["itemType"]>>
  : Cty extends { type: "set"; itemType: CtyType }
  ? Set<CtyToTypescript<Cty["itemType"]>>
  : Cty extends { type: "map"; itemType: CtyType }
  ? { [key: string]: CtyToTypescript<Cty["itemType"]> }
  : void;
