import { AsyncResponse } from '../../types/response';
import { SchemaBlockConfig } from '../SchemaConfig';

import { SchemaBlockDescriptor } from './blockDescriptor';
import { listProperty } from './propertyDescriptor';

export const Property = {
  list: <SBD extends SchemaBlockDescriptor>(
    itemType: SBD,
    minMax: {
      maxItems?: number;
      minItems?: number;
    } = {},
  ) => {
    const property = listProperty(itemType, minMax);

    const withValidation = (
      validate: (
        args: Array<SchemaBlockConfig<SBD>>,
      ) => AsyncResponse<Array<SchemaBlockConfig<SBD>>>,
    ) => {
      return {
        ...listProperty(itemType, minMax),
        validate,
      };
    };

    return {
      ...property,
      withValidation,
    };
  },
};
