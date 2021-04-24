import { AsyncResponse } from '../../types/response';
import { SchemaBlockConfig } from '../SchemaConfig';

import { SchemaBlockDescriptor } from './blockDescriptor';
import { listProperty } from './propertyDescriptor';

type SizeConstraint = {
  maxItems?: number;
  minItems?: number;
};
export const Size = {
  atLeast: (minItems: number) => {
    return { minItems };
  },
  atMost: (maxItems: number) => {
    return { maxItems };
  },
  between: (minItems: number, maxItems: number) => {
    return { maxItems, minItems };
  },
};

const validatableConstrainedList = <SBD extends SchemaBlockDescriptor>(
  itemType: SBD,
  sizeConstraint: SizeConstraint = {},
) => {
  const property = listProperty(itemType, sizeConstraint);

  const withValidation = (
    validate: (
      args: Array<SchemaBlockConfig<SBD>>,
    ) => AsyncResponse<Array<SchemaBlockConfig<SBD>>>,
  ) => {
    return {
      ...property,
      validate,
    };
  };

  return {
    ...property,
    withValidation,
  };
};
const validatableConstrainableList = <SBD extends SchemaBlockDescriptor>(
  itemType: SBD,
) => {
  return {
    ...validatableConstrainedList(itemType),
    withSizeConstraint: (sizeConstraint: SizeConstraint) => {
      return validatableConstrainedList(itemType, sizeConstraint);
    },
  };
};
export const Property = {
  list: validatableConstrainableList,
};
