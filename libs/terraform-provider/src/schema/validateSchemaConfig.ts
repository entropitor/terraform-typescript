import { pipe } from 'fp-ts/lib/function';

import { _tfplugin5_AttributePath_Step as Step } from '../generated/tfplugin5/AttributePath';
import { AsyncResponse, sequenceResponseS } from '../types/response';

import { SchemaBlockDescriptor, SchemaDescriptor } from './descriptor';
import { SchemaBlockConfig, SchemaConfig } from './SchemaConfig';

type AttributePath = Step[];

const validateSchemaBlockConfig = <SBD extends SchemaBlockDescriptor>(
  schemaBlockDescriptor: SBD,
  config: SchemaBlockConfig<SBD>,
  attributePath: AttributePath,
): AsyncResponse<SchemaBlockConfig<SBD>> => {
  // @ts-expect-error fromEntries problem
  return sequenceResponseS(
    Object.fromEntries(
      Object.entries(config).map(([propertyName, configValue]: [string, any]): [
        string,
        AsyncResponse<any>,
      ] => {
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
              AsyncResponse.mapLeft((diagnostics) =>
                diagnostics.map((diagnostic) => ({
                  ...diagnostic,
                  attribute: {
                    steps: [...attributePath, { attribute_name: propertyName }],
                  },
                })),
              ),
            ),
          ];
        }

        // if (propertyDescriptor.type === 'list') {
        //   return [
        //     propertyName,
        //     sequenceResponseT(
        //       configValue.map((subConfig) =>
        //         validateSchemaBlock(propertyDescriptor.itemType, subConfig),
        //       ),
        //     ),
        //   ];
        // }

        throw new Error('not implemented');
      }),
    ),
  );
};

export const validateSchemaConfig = <SD extends SchemaDescriptor>(
  schemaDescriptor: SD,
) => (config: SchemaConfig<SD>): AsyncResponse<SchemaConfig<SD>> => {
  return validateSchemaBlockConfig(schemaDescriptor.block, config, []);
};
