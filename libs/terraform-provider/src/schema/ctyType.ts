import { valueMap } from '../mapOverObject';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const unreachable = (_: never): void => {};

// This const is exported in this file but not in the global package to ensure typescript
// can properly infer the 'unique symbol'
/**
 * Ensure that users should use the constructors defined below instead of type literals
 */
export const brand = Symbol('ctyTypeBrand');

/**
 * The runtime type system that Terraform uses
 *
 * Original Go Library: https://github.com/zclconf/go-cty
 */
export type CtyType =
  | {
      brand: typeof brand;
      type: 'string' | 'number' | 'boolean' | 'any';
    }
  | {
      brand: typeof brand;
      itemType: CtyType;
      type: 'list' | 'set' | 'map';
    }
  | {
      brand: typeof brand;
      itemTypes: CtyType[];
      type: 'tuple';
    }
  | {
      brand: typeof brand;
      itemType: {
        [key: string]: CtyType;
      };
      type: 'object';
    };

const ctyTypeToJson = (typ: CtyType): any => {
  switch (typ.type) {
    case 'number':
    case 'string': {
      return typ.type;
    }
    case 'boolean': {
      return 'bool';
    }
    case 'any': {
      return 'dynamic';
    }
    case 'map':
    case 'set':
    case 'list': {
      return [typ.type, ctyTypeToJson(typ.itemType)];
    }
    case 'tuple': {
      return [typ.type, typ.itemTypes.map(ctyTypeToJson)];
    }
    case 'object': {
      return [typ.type, valueMap(ctyTypeToJson, typ.itemType)];
    }
    default:
      unreachable(typ);
      return '';
  }
};

export const ctyTypeToBuffer = (typ: CtyType): Buffer => {
  return Buffer.from(JSON.stringify(ctyTypeToJson(typ)));
};

export const ctyString = {
  brand,
  type: 'string',
} as const;
export const ctyNumber = {
  brand,
  type: 'number',
} as const;
export const ctyBoolean = {
  brand,
  type: 'boolean',
} as const;
export const ctyAny = {
  brand,
  type: 'any',
} as const;
export const ctyList = <C extends CtyType>(of: C) =>
  ({
    brand,
    itemType: of,
    type: 'list',
  } as const);
export const ctySet = <C extends CtyType>(of: C) =>
  ({
    brand,
    itemType: of,
    type: 'set',
  } as const);
export const ctyMap = <C extends CtyType>(of: C) =>
  ({
    brand,
    itemType: of,
    type: 'map',
  } as const);
export const ctyTuple = <T extends CtyType[]>(...of: T) =>
  ({
    brand,
    itemTypes: of,
    type: 'tuple',
  } as const);
export const ctyObject = <R extends { [key: string]: CtyType }>(of: R) =>
  ({
    brand,
    itemType: of,
    type: 'object',
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
  ? Array<CtyToTypescript<Cty['itemType']>>
  : Cty extends CtySet
  ? Set<CtyToTypescript<Cty['itemType']>>
  : Cty extends CtyMap
  ? { [key: string]: CtyToTypescript<Cty['itemType']> }
  : Cty extends CtyTuple
  ? CtyTupleToTypescript<Cty['itemTypes']>
  : Cty extends CtyObject
  ? { [key in keyof Cty['itemType']]: CtyToTypescript<Cty['itemType'][key]> }
  : never;
