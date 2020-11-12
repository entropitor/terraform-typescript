import {
  AsyncResponse,
  ctyNumber,
  ctyString,
  ctyTypeToBuffer,
  DataSource,
  Diagnostic,
  Severity,
} from "@terraform-typescript/terraform-provider";
import * as Either from "fp-ts/either";
import { HashicupsApiClient } from "./apiClient";

export interface DataSourceCoffeesConfig {}
export interface DataSourceCoffeesState {}
export const dataSourceCoffees: DataSource<
  DataSourceCoffeesConfig,
  DataSourceCoffeesState,
  HashicupsApiClient
> = {
  getSchema() {
    return {
      version: 1,
      block: {
        block_types: [
          {
            type_name: "coffees",
            nesting: "LIST",
            block: {
              version: 1,
              attributes: [
                {
                  name: "id",
                  type: ctyTypeToBuffer(ctyNumber()),
                  computed: true,
                },
                {
                  name: "name",
                  type: ctyTypeToBuffer(ctyString()),
                  computed: true,
                },
                {
                  name: "teaser",
                  type: ctyTypeToBuffer(ctyString()),
                  compute: true,
                },
                {
                  name: "description",
                  type: ctyTypeToBuffer(ctyString()),
                  compute: true,
                },
                {
                  name: "price",
                  type: ctyTypeToBuffer(ctyNumber()),
                  computed: true,
                },
                {
                  name: "image",
                  type: ctyTypeToBuffer(ctyString()),
                  compute: true,
                },
              ],
              block_types: [
                {
                  type_name: "ingredients",
                  nesting: "LIST",
                  block: {
                    attributes: [
                      {
                        name: "ingredient_id",
                        type: ctyTypeToBuffer(ctyNumber()),
                        computed: true,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
        version: 1,
      },
    };
  },
  async read({ client }) {
    const diagnostics: Diagnostic[] = [];
    try {
      return Either.right({
        diagnostics: [],
        state: {
          coffees: await client.listCoffees(),
        },
      });
    } catch (error) {
      console.error(error);
      return Either.right({
        diagnostics: [
          ...diagnostics,
          {
            severity: Severity.ERROR,
            summary: "Failure to fetch",
            detail: error.toString(),
          },
        ],
        state: null,
      });
    }
  },
  validate() {
    return AsyncResponse.right({});
  },
};
