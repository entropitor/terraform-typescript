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
export const ctyNumber = (): CtyType => ({
  type: "number",
});
export const ctyBoolean = (): CtyType => ({
  type: "boolean",
});
export const ctyAny = (): CtyType => ({
  type: "any",
});
export const ctyList = (of: CtyType): CtyType => ({
  type: "list",
  itemType: of,
});
export const ctySet = (of: CtyType): CtyType => ({
  type: "set",
  itemType: of,
});
export const ctyMap = (of: CtyType): CtyType => ({
  type: "map",
  itemType: of,
});
export const ctyTuple = (...of: CtyType[]): CtyType => ({
  type: "tuple",
  itemTypes: of,
});
export const ctyObject = (of: { [key: string]: CtyType }): CtyType => ({
  type: "object",
  itemType: of,
});
