import { AsyncResponse, SyncResponse } from '../types/response';

import { Attribute, Property, schema, schemaBlock } from './descriptor';
import { validateSchemaConfig } from './validateSchemaConfig';

describe('validateSchemaConfig', () => {
  describe('should validate a simple schema config', () => {
    const schemaDescriptor = schema(
      schemaBlock('hashicups', {
        password: Attribute.optional
          .string('The password for the provider')
          .withValidation((password) => {
            if (password === 'admin') {
              return AsyncResponse.fromErrorString(
                'Too weak',
                'Even I can guess this',
              );
            }
            if (password?.length === 5) {
              return AsyncResponse.both(
                [
                  {
                    detail: 'use a longer password',
                    summary: 'This is a very short password',
                  },
                ],
                `Longer password: ${password}`,
              );
            }
            return AsyncResponse.right(password || 'default-password');
          }),
        username: Attribute.optional
          .string('The username for the provider')
          .withValidation((username) => {
            if (username === 'admin') {
              return AsyncResponse.fromErrorString(
                'Admin is too powerful',
                'You are not allowed to pass an admin user',
              );
            }
            return AsyncResponse.right(username || 'default-username');
          }),
      }),
    );

    it('should pass when it is just passing values along', async () => {
      expect(
        await validateSchemaConfig(schemaDescriptor)({
          password: 'set-password',
          username: 'set-username',
        })(),
      ).toEqual(
        SyncResponse.right({
          password: 'set-password',
          username: 'set-username',
        }),
      );
    });

    it('should work when one value needs to have a default value', async () => {
      expect(
        await validateSchemaConfig(schemaDescriptor)({
          password: null,
          username: 'set-username',
        })(),
      ).toEqual(
        SyncResponse.right({
          password: 'default-password',
          username: 'set-username',
        }),
      );
    });

    it('should work when two values needs to have a default value', async () => {
      expect(
        await validateSchemaConfig(schemaDescriptor)({
          password: null,
          username: null,
        })(),
      ).toEqual(
        SyncResponse.right({
          password: 'default-password',
          username: 'default-username',
        }),
      );
    });

    it('should work when there is one error but recoverable', async () => {
      expect(
        await validateSchemaConfig(schemaDescriptor)({
          password: 'short',
          username: null,
        })(),
      ).toEqual(
        SyncResponse.both(
          [
            {
              attribute: {
                steps: [
                  {
                    attribute_name: 'password',
                  },
                ],
              },
              detail: 'use a longer password',
              summary: 'This is a very short password',
            },
          ],
          {
            password: 'Longer password: short',
            username: 'default-username',
          },
        ),
      );
    });

    it('should work when there is two lefts', async () => {
      expect(
        await validateSchemaConfig(schemaDescriptor)({
          password: 'admin',
          username: 'admin',
        })(),
      ).toEqual(
        SyncResponse.left([
          {
            attribute: {
              steps: [
                {
                  attribute_name: 'password',
                },
              ],
            },
            detail: 'Even I can guess this',
            severity: 1,
            summary: 'Too weak',
          },
          {
            attribute: {
              steps: [
                {
                  attribute_name: 'username',
                },
              ],
            },
            detail: 'You are not allowed to pass an admin user',
            severity: 1,
            summary: 'Admin is too powerful',
          },
        ]),
      );
    });

    it('should work when there is a both and a left', async () => {
      expect(
        await validateSchemaConfig(schemaDescriptor)({
          password: 'short',
          username: 'admin',
        })(),
      ).toEqual(
        SyncResponse.left([
          {
            attribute: {
              steps: [
                {
                  attribute_name: 'password',
                },
              ],
            },
            detail: 'use a longer password',
            summary: 'This is a very short password',
          },
          {
            attribute: {
              steps: [
                {
                  attribute_name: 'username',
                },
              ],
            },
            detail: 'You are not allowed to pass an admin user',
            severity: 1,
            summary: 'Admin is too powerful',
          },
        ]),
      );
    });
  });

  describe('should validate a more complex schema with a list', () => {
    const schemaDescriptor = schema(
      schemaBlock('complex', {
        id: Attribute.optional.string('The id of the ...'),
        items: Property.list(
          schemaBlock('the items in the order', {
            quality: Attribute.optional
              .string('The quality')
              .withValidation((quality) => {
                if (quality === 'bad') {
                  return AsyncResponse.fromErrorString(
                    'Bad quality',
                    'You need good quality',
                  );
                }
                return AsyncResponse.right(quality);
              }),
          }),
          {},
        ).withValidation((list) => {
          if (!list.some((item) => item.quality === 'very good')) {
            return AsyncResponse.fromErrorString(
              'No exceptional quality',
              'You need at least something very good',
            );
          }
          return AsyncResponse.right(list);
        }),
        last_updated: Attribute.optional.string('Last updated at'),
      }),
    );

    it('should work with an empty list', async () => {
      expect(
        await validateSchemaConfig(schemaDescriptor)({
          id: 'one',
          items: [],
          last_updated: 'yesterday',
        })(),
      ).toEqual(
        SyncResponse.right({
          id: 'one',
          items: [],
          last_updated: 'yesterday',
        }),
      );
    });

    it('should work with a correct value in the list', async () => {
      expect(
        await validateSchemaConfig(schemaDescriptor)({
          id: 'one',
          items: [
            {
              quality: 'very good',
            },
          ],
          last_updated: 'yesterday',
        })(),
      ).toEqual(
        SyncResponse.right({
          id: 'one',
          items: [
            {
              quality: 'very good',
            },
          ],
          last_updated: 'yesterday',
        }),
      );
    });

    it('should validate the item in the list', async () => {
      expect(
        await validateSchemaConfig(schemaDescriptor)({
          id: 'one',
          items: [
            {
              quality: 'bad',
            },
          ],
          last_updated: 'yesterday',
        })(),
      ).toEqual(
        SyncResponse.left([
          {
            attribute: {
              steps: [
                {
                  attribute_name: 'items',
                },
                {
                  element_key_int: 0,
                },
                {
                  attribute_name: 'quality',
                },
              ],
            },
            detail: 'You need good quality',
            severity: 1,
            summary: 'Bad quality',
          },
        ]),
      );
    });

    it('should validate the list itself', async () => {
      expect(
        await validateSchemaConfig(schemaDescriptor)({
          id: 'one',
          items: [
            {
              quality: 'good',
            },
            {
              quality: 'good',
            },
          ],
          last_updated: 'yesterday',
        })(),
      ).toEqual(
        SyncResponse.left([
          {
            attribute: {
              steps: [
                {
                  attribute_name: 'items',
                },
              ],
            },
            detail: 'You need at least something very good',
            severity: 1,
            summary: 'No exceptional quality',
          },
        ]),
      );
    });
  });
});
