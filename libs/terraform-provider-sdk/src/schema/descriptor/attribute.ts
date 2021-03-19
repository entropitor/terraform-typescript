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
import { DescriptionLike } from '../description';
import { AttributePropertyConfigBySource } from '../SchemaConfig';

import {
  attribute,
  AttributePropertyDescriptor,
  AttributeSource,
} from './propertyDescriptor';

const validatedAttribute = <
  CT extends CtyType,
  S extends AttributePropertyDescriptor['source']
>(
  source: S,
  ctyType: CT,
  description: DescriptionLike,
) => {
  const withoutValidation = attribute(source, ctyType, description);

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

const attributeConstructors = <AS extends AttributeSource>(source: AS) => ({
  any: (description: DescriptionLike) =>
    validatedAttribute(source, ctyAny, description),
  boolean: (description: DescriptionLike) =>
    validatedAttribute(source, ctyBoolean, description),
  list: <C extends CtyType>(description: DescriptionLike, itemType: C) =>
    validatedAttribute(source, ctyList(itemType), description),
  map: <C extends CtyType>(description: DescriptionLike, itemType: C) =>
    validatedAttribute(source, ctyMap(itemType), description),
  number: (description: DescriptionLike) =>
    validatedAttribute(source, ctyNumber, description),
  object: <R extends Record<string, CtyType>>(
    description: DescriptionLike,
    itemTypes: R,
  ) => validatedAttribute(source, ctyObject(itemTypes), description),
  set: <C extends CtyType>(description: DescriptionLike, itemType: C) =>
    validatedAttribute(source, ctySet(itemType), description),
  string: (description: DescriptionLike) =>
    validatedAttribute(source, ctyString, description),
  tuple: <T extends CtyType[]>(description: DescriptionLike, ...itemTypes: T) =>
    validatedAttribute(source, ctyTuple(...itemTypes), description),
});
export const Attribute = {
  computed: attributeConstructors('computed'),
  computedButOverridable: attributeConstructors('computed-but-overridable'),
  optional: attributeConstructors('optional-in-config'),
  required: attributeConstructors('required-in-config'),
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
