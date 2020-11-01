import { valueMap } from "./mapOverObject";

const unreachable = (_: never): void => {};

/**
 * The runtime type system that Terraform uses
 *
 * Original Go Library: https://github.com/zclconf/go-cty
 */
type ctyType =
  | {
      type: "string" | "number" | "boolean";
    }
  | {
      type: "list" | "set" | "map";
      itemType: ctyType;
    }
  | {
      type: "tuple";
      itemTypes: ctyType[];
    }
  | {
      type: "object";
      itemType: {
        [key: string]: ctyType;
      };
    };
const ctyTypeToJson = (typ: ctyType): any => {
  switch (typ.type) {
    case "number":
    case "string": {
      return typ.type;
    }
    case "boolean": {
      return "bool";
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

export const ctyType = (typ: ctyType): Buffer => {
  return Buffer.from(JSON.stringify(ctyTypeToJson(typ)));
};

export const ctyString = (): ctyType => ({
  type: "string",
});
export const ctyNumber = (): ctyType => ({
  type: "number",
});
export const ctyBoolean = (): ctyType => ({
  type: "boolean",
});
export const ctyList = (of: ctyType): ctyType => ({
  type: "list",
  itemType: of,
});
export const ctySet = (of: ctyType): ctyType => ({
  type: "set",
  itemType: of,
});
export const ctyMap = (of: ctyType): ctyType => ({
  type: "map",
  itemType: of,
});
export const ctyTuple = (...of: ctyType[]): ctyType => ({
  type: "tuple",
  itemTypes: of,
});
export const ctyObject = (of: { [key: string]: ctyType }): ctyType => ({
  type: "object",
  itemType: of,
});
