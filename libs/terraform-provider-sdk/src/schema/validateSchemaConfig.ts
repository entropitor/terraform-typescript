import { pipe } from 'fp-ts/lib/function';

import { _tfplugin5_AttributePath_Step as Step } from '../generated/tfplugin5/AttributePath';
import { AsyncResponse } from '../types/response';

import { SchemaBlockDescriptor, SchemaDescriptor } from './descriptor';
import { SchemaBlockConfig, SchemaConfig } from './SchemaConfig';

type AttributePath = Step[];

const addAttributePath = (
  attributePath: AttributePath,
  propertyName: string,
) => {
  return AsyncResponse.mapLeft((diagnostics) =>
    diagnostics.map((diagnostic) => ({
      ...diagnostic,
      attribute: {
        steps: [...attributePath, { attribute_name: propertyName }],
      },
    })),
  );
};

const validateSchemaBlockConfig = <SBD extends SchemaBlockDescriptor>(
  schemaBlockDescriptor: SBD,
  config: SchemaBlockConfig<SBD>,
  attributePath: AttributePath,
): AsyncResponse<SchemaBlockConfig<SBD>> => {
  // @ts-expect-error fromEntries problem
  return AsyncResponse.sequenceS(
    Object.fromEntries(
      Object.entries(config).map(
        ([propertyName, configValue]: [
          keyof SBD['properties'] & string,
          any,
        ]): [keyof SBD['properties'], AsyncResponse<any>] => {
          const propertyDescriptor =
            schemaBlockDescriptor.properties[propertyName];
          if (propertyDescriptor.type === 'attribute') {
            if (propertyDescriptor.validate == null) {
              return [propertyName, AsyncResponse.right(configValue)];
            }
            return [
              propertyName,
              pipe(
                propertyDescriptor.validate(configValue),
                addAttributePath(attributePath, propertyName),
              ),
            ];
          }

          if (propertyDescriptor.type === 'list') {
            if (configValue.length === 0) {
              return [propertyName, AsyncResponse.right([])];
            }

            return [
              propertyName,
              pipe(
                AsyncResponse.sequenceT(
                  ...configValue.map((itemConfig: any, index: number) =>
                    validateSchemaBlockConfig(
                      // We need any to supress infinite type
                      propertyDescriptor.itemType as any,
                      itemConfig,
                      [
                        ...attributePath,
                        { attribute_name: propertyName },
                        { element_key_int: index },
                      ],
                    ),
                  ),
                ),
                AsyncResponse.chain((items) => {
                  if (propertyDescriptor.validate == null) {
                    return AsyncResponse.right(items);
                  }
                  return pipe(
                    propertyDescriptor.validate(items),
                    addAttributePath(attributePath, propertyName),
                  );
                }),
              ),
            ];
          }

          throw new Error('not implemented');
        },
      ),
    ),
  );
};

export const validateSchemaConfig = <SD extends SchemaDescriptor>(
  schemaDescriptor: SD,
) => (config: SchemaConfig<SD>): AsyncResponse<SchemaConfig<SD>> => {
  return validateSchemaBlockConfig(schemaDescriptor.block, config, []);
};
