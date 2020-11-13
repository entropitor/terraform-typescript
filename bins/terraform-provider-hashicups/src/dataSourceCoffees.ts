import {
  AsyncResponse,
  createDataSource,
  createSchema,
  createSchemaDescriptor,
  ctyNumber,
  ctyString,
  DataSource,
  SchemaConfig,
  SchemaState,
  Severity,
  SyncResponse,
} from '@terraform-typescript/terraform-provider';
import { HashicupsApiClient } from './apiClient';

export const dataSourceCoffeesSchemaDescriptor = createSchemaDescriptor({
  description: 'Coffees data source schema',
  properties: {
    coffees: {
      type: 'list',
      itemType: {
        description: 'Test description',
        properties: {
          id: {
            type: 'raw',
            ctyType: ctyNumber,
            source: 'computed',
          },
          name: {
            type: 'raw',
            ctyType: ctyString,
            source: 'computed',
          },
          teaser: {
            type: 'raw',
            ctyType: ctyString,
            source: 'computed',
          },
          description: {
            type: 'raw',
            ctyType: ctyString,
            source: 'computed',
          },
          price: {
            type: 'raw',
            ctyType: ctyNumber,
            source: 'computed',
          },
          image: {
            type: 'raw',
            ctyType: ctyString,
            source: 'computed',
          },
          ingredients: {
            type: 'list',
            itemType: {
              description: 'ingredients description',
              properties: {
                ingredient_id: {
                  type: 'raw',
                  ctyType: ctyNumber,
                  source: 'computed',
                },
              },
            },
          },
        },
      },
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
        console.error(error);
        return SyncResponse.left([
          {
            severity: Severity.ERROR,
            summary: 'Failure to fetch',
            detail: error.toString(),
          },
        ]);
      }
    };
  },
  validate() {
    return AsyncResponse.right({});
  },
});
