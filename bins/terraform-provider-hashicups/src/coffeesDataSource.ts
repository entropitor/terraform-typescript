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
          description: attribute(
            'computed',
            ctyString,
            'The description of the coffee',
          ),
          id: attribute('computed', ctyNumber, 'The id of the coffee'),
          image: attribute('computed', ctyString, 'The image of the coffee'),
          ingredients: listProperty(
            schemaBlock('ingredients description', {
              ingredient_id: attribute(
                'computed',
                ctyNumber,
                'The id of the ingredient',
              ),
            }),
          ),
          name: attribute('computed', ctyString, 'The name of the coffee'),
          price: attribute('computed', ctyNumber, 'The price of the coffee'),
          teaser: attribute(
            'computed',
            ctyString,
            'The teaser description of the coffee',
          ),
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
