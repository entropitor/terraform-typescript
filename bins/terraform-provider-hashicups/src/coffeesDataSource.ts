import {
  AsyncResponse,
  createDataSource,
  ctyNumber,
  ctyString,
  Severity,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';

import { HashicupsApiClient } from './apiClient';

const ctor = createDataSource({
  block: {
    description: 'Coffees data source schema',
    properties: {
      coffees: {
        itemType: {
          description: 'Test description',
          properties: {
            description: {
              ctyType: ctyString,
              source: 'computed',
              type: 'attribute',
            },
            id: {
              ctyType: ctyNumber,
              source: 'computed',
              type: 'attribute',
            },
            image: {
              ctyType: ctyString,
              source: 'computed',
              type: 'attribute',
            },
            ingredients: {
              itemType: {
                description: 'ingredients description',
                properties: {
                  ingredient_id: {
                    ctyType: ctyNumber,
                    source: 'computed',
                    type: 'attribute',
                  },
                },
              },
              type: 'list',
            },
            name: {
              ctyType: ctyString,
              source: 'computed',
              type: 'attribute',
            },
            price: {
              ctyType: ctyNumber,
              source: 'computed',
              type: 'attribute',
            },
            teaser: {
              ctyType: ctyString,
              source: 'computed',
              type: 'attribute',
            },
          },
        },
        type: 'list',
      },
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
