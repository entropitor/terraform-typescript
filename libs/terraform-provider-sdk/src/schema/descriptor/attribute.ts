import { AsyncResponse } from '../../types/response';
import {
  ctyAny,
  ctyBoolean,
  ctyList,
  ctyMap,
  ctyNumber,
  ctyObject,
  ctySet,
  ctyString,
  ctyTuple,
  CtyType,
} from '../ctyType';
import { AttributePropertyConfigBySource } from '../SchemaConfig';

import { attribute, AttributePropertyDescriptor } from './propertyDescriptor';

const validatedAttribute = <
  CT extends CtyType,
  S extends AttributePropertyDescriptor['source']
>(
  source: S,
  ctyType: CT,
) => {
  const withoutValidation = attribute(source, ctyType);

  const withValidation = (
    validate: (
      attributeToValidate: AttributePropertyConfigBySource<S, CT>,
    ) => AsyncResponse<AttributePropertyConfigBySource<S, CT>>,
  ) =>
    ({
      ...withoutValidation,
      validate: validate as AttributePropertyDescriptor['validate'],
    } as const);

  return {
    ...withoutValidation,
    withValidation,
  };
};
export const Attribute = {
  computed: {
    any: validatedAttribute('computed', ctyAny),
    boolean: validatedAttribute('computed', ctyBoolean),
    list: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed', ctyList(itemType)),
    map: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed', ctyMap(itemType)),
    number: validatedAttribute('computed', ctyNumber),
    object: <R extends Record<string, CtyType>>(itemTypes: R) =>
      validatedAttribute('computed', ctyObject(itemTypes)),
    set: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed', ctySet(itemType)),
    string: validatedAttribute('computed', ctyString),
    tuple: <T extends CtyType[]>(...itemTypes: T) =>
      validatedAttribute('computed', ctyTuple(...itemTypes)),
  },
  computedButOverridable: {
    any: validatedAttribute('computed-but-overridable', ctyAny),
    boolean: validatedAttribute('computed-but-overridable', ctyBoolean),
    list: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed-but-overridable', ctyList(itemType)),
    map: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed-but-overridable', ctyMap(itemType)),
    number: validatedAttribute('computed-but-overridable', ctyNumber),
    object: <R extends Record<string, CtyType>>(itemTypes: R) =>
      validatedAttribute('computed-but-overridable', ctyObject(itemTypes)),
    set: <C extends CtyType>(itemType: C) =>
      validatedAttribute('computed-but-overridable', ctySet(itemType)),
    string: validatedAttribute('computed-but-overridable', ctyString),
    tuple: <T extends CtyType[]>(...itemTypes: T) =>
      validatedAttribute('computed-but-overridable', ctyTuple(...itemTypes)),
  },
  optional: {
    any: validatedAttribute('optional-in-config', ctyAny),
    boolean: validatedAttribute('optional-in-config', ctyBoolean),
    list: <C extends CtyType>(itemType: C) =>
      validatedAttribute('optional-in-config', ctyList(itemType)),
    map: <C extends CtyType>(itemType: C) =>
      validatedAttribute('optional-in-config', ctyMap(itemType)),
    number: validatedAttribute('optional-in-config', ctyNumber),
    object: <R extends Record<string, CtyType>>(itemTypes: R) =>
      validatedAttribute('optional-in-config', ctyObject(itemTypes)),
    set: <C extends CtyType>(itemType: C) =>
      validatedAttribute('optional-in-config', ctySet(itemType)),
    string: validatedAttribute('optional-in-config', ctyString),
    tuple: <T extends CtyType[]>(...itemTypes: T) =>
      validatedAttribute('optional-in-config', ctyTuple(...itemTypes)),
  },
  required: {
    any: validatedAttribute('required-in-config', ctyAny),
    boolean: validatedAttribute('required-in-config', ctyBoolean),
    list: <C extends CtyType>(itemType: C) =>
      validatedAttribute('required-in-config', ctyList(itemType)),
    map: <C extends CtyType>(itemType: C) =>
      validatedAttribute('required-in-config', ctyMap(itemType)),
    number: validatedAttribute('required-in-config', ctyNumber),
    object: <R extends Record<string, CtyType>>(itemTypes: R) =>
      validatedAttribute('required-in-config', ctyObject(itemTypes)),
    set: <C extends CtyType>(itemType: C) =>
      validatedAttribute('required-in-config', ctySet(itemType)),
    string: validatedAttribute('required-in-config', ctyString),
    tuple: <T extends CtyType[]>(...itemTypes: T) =>
      validatedAttribute('required-in-config', ctyTuple(...itemTypes)),
  },
};

export const isOptional = (
  attributePropertyDescriptor: AttributePropertyDescriptor,
) =>
  attributePropertyDescriptor.source === 'optional-in-config' ||
  attributePropertyDescriptor.source === 'computed-but-overridable';
export const isComputed = (
  attributePropertyDescriptor: AttributePropertyDescriptor,
) =>
  attributePropertyDescriptor.source === 'computed' ||
  attributePropertyDescriptor.source === 'computed-but-overridable';
export const isRequired = (
  attributePropertyDescriptor: AttributePropertyDescriptor,
) => attributePropertyDescriptor.source === 'required-in-config';
