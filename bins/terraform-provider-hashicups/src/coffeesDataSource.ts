import {
  AsyncResponse,
  attribute,
  createDataSource,
  ctyNumber,
  ctyString,
  listProperty,
  Severity,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';

import { HashicupsApiClient } from './apiClient';

const ctor = createDataSource({
  block: {
    description: 'Coffees data source schema',
    properties: {
      coffees: listProperty({
        description: 'Test description',
        properties: {
          description: attribute('computed', ctyString),
          id: attribute('computed', ctyNumber),
          image: attribute('computed', ctyString),
          ingredients: listProperty({
            description: 'ingredients description',
            properties: {
              ingredient_id: attribute('computed', ctyNumber),
            },
          }),
          name: attribute('computed', ctyString),
          price: attribute('computed', ctyNumber),
          teaser: attribute('computed', ctyString),
        },
      }),
    },
  },
});

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
