import { AsyncResponse } from '../../types/response';
import {
  ctyAny,
  ctyBoolean,
  ctyList,
  ctyMap,
  ctyNumber,
  CtyObject,
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

const validatableAttribute = <
  S extends AttributePropertyDescriptor['source'],
  CT extends CtyType,
  CTToValidate extends CtyType = CT
>(
  source: S,
  ctyType: CT,
  description: DescriptionLike,
) => {
  const withoutValidation = attribute(source, ctyType, description);

  type AttributeConfig = AttributePropertyConfigBySource<S, CTToValidate>;
  const withValidation = (
    validate: (
      attributeToValidate: AttributeConfig,
    ) => AsyncResponse<AttributeConfig>,
  ) => {
    const fixedValidate: AttributePropertyDescriptor['validate'] = validate;
    return {
      ...withoutValidation,
      // @ts-expect-error too deep to check for typescript
      validate: fixedValidate,
    } as const;
  };

  return {
    ...withoutValidation,
    withValidation,
  };
};

const attributeConstructors = <AS extends AttributeSource>(source: AS) => ({
  any: (description: DescriptionLike) =>
    validatableAttribute(source, ctyAny, description),
  boolean: (description: DescriptionLike) =>
    validatableAttribute(source, ctyBoolean, description),
  list: <C extends CtyType>(description: DescriptionLike, itemType: C) =>
    validatableAttribute(source, ctyList(itemType), description),
  map: <C extends CtyType>(description: DescriptionLike, itemType: C) =>
    validatableAttribute(source, ctyMap(itemType), description),
  number: (description: DescriptionLike) =>
    validatableAttribute(source, ctyNumber, description),
  object: <R extends Record<string, CtyType>, C extends CtyType = CtyObject<R>>(
    description: DescriptionLike,
    itemTypes: R,
  ) =>
    validatableAttribute<AS, CtyObject<R>, C>(
      source,
      ctyObject(itemTypes),
      description,
    ),
  set: <C extends CtyType>(description: DescriptionLike, itemType: C) =>
    validatableAttribute(source, ctySet(itemType), description),
  string: (description: DescriptionLike) =>
    validatableAttribute(source, ctyString, description),
  tuple: <T extends CtyType[]>(description: DescriptionLike, ...itemTypes: T) =>
    validatableAttribute(source, ctyTuple(...itemTypes), description),
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
