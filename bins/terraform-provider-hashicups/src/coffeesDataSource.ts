import {
  AsyncResponse,
  attribute,
  createDataSource,
  ctyNumber,
  ctyString,
  listProperty,
  schema,
  schemaBlock,
  Severity,
  SyncResponse,
} from '@entropitor/terraform-provider-sdk';

import { HashicupsApiClient } from './apiClient';

const ctor = createDataSource(
  schema(
    schemaBlock('Coffees data source schema', {
      coffees: listProperty(
        schemaBlock('Test description', {
          description: attribute('computed', ctyString),
          id: attribute('computed', ctyNumber),
          image: attribute('computed', ctyString),
          ingredients: listProperty(
            schemaBlock('ingredients description', {
              ingredient_id: attribute('computed', ctyNumber),
            }),
          ),
          name: attribute('computed', ctyString),
          price: attribute('computed', ctyNumber),
          teaser: attribute('computed', ctyString),
        }),
      ),
    }),
  ),
);

export const coffeesDataSource = ctor<HashicupsApiClient>({
  read({ client }) {
    return async () => {
      try {
        return SyncResponse.right({
          state: {
            coffees: await client.coffee.list(),
          },
        });
      } catch (error) {
        return SyncResponse.left([
          {
            detail: error.toString(),
            severity: Severity.ERROR,
            summary: 'Failure to fetch',
          },
        ]);
      }
    };
  },
  validate() {
    return AsyncResponse.right({});
  },
});
