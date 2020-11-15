import { unknownValue } from './dynamicValue';
import {
  isComputed,
  isOptional,
  SchemaBlockDescriptor,
  SchemaDescriptor,
} from './schema/descriptor';

// This (correct) type definition makes typescript slow!
// const maskBlock = <SBD extends SchemaBlockDescriptor>(
//   block: BlockState<SBD>,
//   descriptor: SBD,
// ): BlockState<SBD> => {

const maskBlock = (block: any, descriptor: SchemaBlockDescriptor): any => {
  return Object.fromEntries(
    Object.entries(descriptor.properties).map(
      ([propertyName, subDescriptor]) => {
        const value = block[propertyName];
        if (subDescriptor.type === 'raw') {
          if (
            value == null &&
            isComputed(subDescriptor) &&
            !isOptional(subDescriptor)
          ) {
            return [propertyName, unknownValue];
          }

          return [propertyName, value];
        }

        if (subDescriptor.type === 'list') {
          return [
            propertyName,
            value.map((item: any) => maskBlock(item, subDescriptor.itemType)),
          ];
        }

        throw new Error('unimplemented');
      },
    ),
  );
};

// state: SchemaState<SD> but typescript errors in the .d.ts file
export const maskComputedState = <SD extends SchemaDescriptor>(
  state: any,
  descriptor: SD,
): any => {
  return maskBlock(state, descriptor.block);
};
