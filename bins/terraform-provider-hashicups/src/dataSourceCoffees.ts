import {
  AsyncResponse,
  createDataSource,
  createSchemaDescriptor,
  ctyNumber,
  ctyString,
  Severity,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';

import { HashicupsApiClient } from './apiClient';

export const dataSourceCoffeesSchemaDescriptor = createSchemaDescriptor({
  description: 'Coffees data source schema',
  properties: {
    coffees: {
      itemType: {
        description: 'Test description',
        properties: {
          description: {
            ctyType: ctyString,
            source: 'computed',
            type: 'raw',
          },
          id: {
            ctyType: ctyNumber,
            source: 'computed',
            type: 'raw',
          },
          image: {
            ctyType: ctyString,
            source: 'computed',
            type: 'raw',
          },
          ingredients: {
            itemType: {
              description: 'ingredients description',
              properties: {
                ingredient_id: {
                  ctyType: ctyNumber,
                  source: 'computed',
                  type: 'raw',
                },
              },
            },
            type: 'list',
          },
          name: {
            ctyType: ctyString,
            source: 'computed',
            type: 'raw',
          },
          price: {
            ctyType: ctyNumber,
            source: 'computed',
            type: 'raw',
          },
          teaser: {
            ctyType: ctyString,
            source: 'computed',
            type: 'raw',
          },
        },
      },
      type: 'list',
    },
  },
});

const ctor = createDataSource(dataSourceCoffeesSchemaDescriptor);
export const dataSourceCoffees = ctor<HashicupsApiClient>({
  read({ client }) {
    return async () => {
      try {
        return SyncResponse.right({
          state: {
            coffees: await client.listCoffees(),
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
