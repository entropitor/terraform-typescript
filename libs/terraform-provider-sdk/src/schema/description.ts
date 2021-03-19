import { StringKind } from '../generated/tfplugin5/StringKind';
import { unreachable } from '../unreachable';

export type Description =
  | {
      description: string;
      type: 'markdown';
    }
  | {
      description: string;
      type: 'plain';
    };
export const Description = {
  markdown: (description: string) =>
    ({ description, type: 'markdown' } as const),
  plain: (description: string) => ({ description, type: 'plain' } as const),
};
const { markdown, plain } = Description;

export type DescriptionLike = Description | string;
export const parseDescription = (description: DescriptionLike): Description => {
  if (typeof description === 'string') {
    return plain(description);
  }
  return description;
};
export { markdown, plain };

export const toTerraformDescription = (description: Description) => {
  switch (description.type) {
    case 'plain':
      return {
        description: description.description,
        description_kind: StringKind.PLAIN,
      };
    case 'markdown':
      return {
        description: description.description,
        description_kind: StringKind.MARKDOWN,
      };
    default:
      return unreachable(description);
  }
};
