import {
  AsyncResponse,
  Attribute,
  createDataSource,
  Property,
  schema,
  schemaBlock,
  Severity,
  SyncResponse,
} from '@entropitor/terraform-provider-sdk';

import { HashicupsApiClient } from './apiClient';

const ctor = createDataSource(
  schema(
    schemaBlock('Coffees data source schema', {
      coffees: Property.list(
        schemaBlock('Test description', {
          description: Attribute.computed.string(
            'The description of the coffee',
          ),
          id: Attribute.computed.number('The id of the coffee'),
          image: Attribute.computed.string('The image of the coffee'),
          ingredients: Property.list(
            schemaBlock('ingredients description', {
              ingredient_id: Attribute.computed.number(
                'The id of the ingredient',
              ),
            }),
          ),
          name: Attribute.computed.string('The name of the coffee'),
          price: Attribute.computed.number('The price of the coffee'),
          teaser: Attribute.computed.string(
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
      } catch (error: any) {
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
