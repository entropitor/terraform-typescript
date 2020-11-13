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
} from "@terraform-typescript/terraform-provider";
import { HashicupsApiClient } from "./apiClient";

export const dataSourceOrderSchemaDescriptor = createSchemaDescriptor({
  description: "Order data source",
  properties: {
    id: {
      type: "raw",
      ctyType: ctyNumber,
      source: "required-in-config",
    },
    items: {
      type: "list",
      itemType: {
        description: "items",
        properties: {
          coffee_id: {
            type: "raw",
            ctyType: ctyNumber,
            source: "computed",
          },
          coffee_name: {
            type: "raw",
            ctyType: ctyString,
            source: "computed",
          },
          coffee_teaser: {
            type: "raw",
            ctyType: ctyString,
            source: "computed",
          },
          coffee_description: {
            type: "raw",
            ctyType: ctyString,
            source: "computed",
          },
          coffee_price: {
            type: "raw",
            ctyType: ctyNumber,
            source: "computed",
          },
          coffee_image: {
            type: "raw",
            ctyType: ctyString,
            source: "computed",
          },
          quantity: {
            type: "raw",
            ctyType: ctyNumber,
            source: "computed",
          },
        },
      },
    },
  },
});

type Item = SchemaState<
  typeof dataSourceOrderSchemaDescriptor
>["items"][number];

const ctor = createDataSource(dataSourceOrderSchemaDescriptor);
export const dataSourceOrder = ctor<HashicupsApiClient>({
  read({ client, config }) {
    return async () => {
      try {
        const order = await client.getOrder(config.id);
        return SyncResponse.right({
          state: {
            id: config.id,
            items: order.items.map(
              (order): Item => ({
                coffee_id: order.coffee.id,
                coffee_image: order.coffee.image,
                coffee_description: order.coffee.description,
                coffee_name: order.coffee.name,
                coffee_price: order.coffee.price,
                coffee_teaser: order.coffee.teaser,
                quantity: order.quantity,
              })
            ),
          },
        });
      } catch (error) {
        return SyncResponse.left([
          {
            severity: Severity.ERROR,
            summary: "Failure to fetch",
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
