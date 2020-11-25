import { AsyncResponse, SyncResponse } from '../types/response';

import { Attribute, schema, schemaBlock } from './descriptor';
import { validateSchemaConfig } from './validateSchemaConfig';

describe('validateSchemaConfig', () => {
  describe('should validate a simple schema config', () => {
    const schemaDescriptor = schema(
      schemaBlock('hashicups', {
        password: Attribute.optional.string((password) => {
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
        username: Attribute.optional.string((username) => {
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
});
