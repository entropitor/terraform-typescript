import {
  ctyNumber,
  ctyString,
  ctyType,
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
                  type: ctyType(ctyNumber()),
                  computed: true,
                },
                {
                  name: "name",
                  type: ctyType(ctyString()),
                  computed: true,
                },
                {
                  name: "teaser",
                  type: ctyType(ctyString()),
                  compute: true,
                },
                {
                  name: "description",
                  type: ctyType(ctyString()),
                  compute: true,
                },
                {
                  name: "price",
                  type: ctyType(ctyNumber()),
                  computed: true,
                },
                {
                  name: "image",
                  type: ctyType(ctyString()),
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
                        type: ctyType(ctyNumber()),
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
    return Either.right({
      diagnostics: [],
    });
  },
};
// func dataSourceCoffeesRead(ctx context.Context, d *schema.ResourceData, m interface{}) diag.Diagnostics {
//   client := &http.Client{Timeout: 10 * time.Second}

//   // Warning or errors can be collected in a slice type
//   var diags diag.Diagnostics

//   req, err := http.NewRequest("GET", fmt.Sprintf("%s/coffees", "http://localhost:19090"), nil)
//   if err != nil {
//     return diag.FromErr(err)
//   }

//   r, err := client.Do(req)
//   if err != nil {
//     return diag.FromErr(err)
//   }
//   defer r.Body.Close()

//   coffees := make([]map[string]interface{}, 0)
//   err = json.NewDecoder(r.Body).Decode(&coffees)
//   if err != nil {
//     return diag.FromErr(err)
//   }

//   if err := d.Set("coffees", coffees); err != nil {
//     return diag.FromErr(err)
//   }

//   // always run
//   d.SetId(strconv.FormatInt(time.Now().Unix(), 10))

//   return diags
// }
