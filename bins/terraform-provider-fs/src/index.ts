import path from "path";
// import * as TF from "./generated/tfplugin5.2";
import * as TF from "./tfplugin5";
import * as fs from "fs";
import { hashicorpPlugin } from "@terraform-typescript/hashicorp-plugin";
import {
  GrpcResponse,
  loadProto,
  unary,
} from "@terraform-typescript/grpc-utils";
import * as Either from "fp-ts/Either";
import * as grpc from "@grpc/grpc-js";
import { StringKind } from "./generated/tfplugin5/StringKind";
import { parseDynamicValue, serializeDynamicValue } from "./dynamicValue";
import { valueMap } from "./mapOverObject";
import { ctyNumber, ctyString, ctyType } from "./ctyType";

interface Resource<T> {
  getSchema(): TF.messages.tfplugin5.Schema;
  validate(config: T): TF.messages.tfplugin5.Diagnostic[];
  planChange(args: {
    config: T;
    priorPrivate: Buffer;
    priorState: T;
    proposedNewState: T;
  }): GrpcResponse<TF.messages.tfplugin5.PlanResourceChange.Response>;
}
// Partial<grpc.StatusObject> | grpc.ServerErrorResponse | grpc.handleUnaryCall,
type Resources<T> = {
  [resourceName in keyof T]: Resource<T[resourceName]>;
};
const resources: Resources<{
  fs_file: {
    nb_foos: number;
  };
  [name: string]: {};
}> = {
  fs_file: {
    validate(config) {
      if (config.nb_foos < 5) {
        return [
          {
            severity: "ERROR",
            attribute: {
              steps: [
                {
                  attribute_name: "nb_foos",
                },
              ],
            },
            detail: "Do you not give a foo?",
            summary: "You need more foo's",
          },
        ];
      }
      return [];
    },
    getSchema() {
      return {
        version: 1,
        block: {
          version: 1,
          attributes: [
            {
              name: "nb_foos",
              type: ctyType(ctyNumber()),
              description: "The number of foos",
              required: true,
              optional: false,
              computed: false,
              deprecated: false,
              description_kind: StringKind.PLAIN,
              sensitive: false,
            },
          ],
          block_types: [],
          deprecated: false,
          description: "test resource",
          description_kind: StringKind.PLAIN,
        },
      };
    },
    planChange(args) {
      console.error(args);
      return Either.left({
        code: grpc.status.UNIMPLEMENTED,
      });
    },
  },
};

interface FsProviderSchemaType {
  foo: string;
}

let config: FsProviderSchemaType | null = null;
const tf = loadProto<
  TF.ProtoGrpcType,
  TF.ServiceHandlers.tfplugin5.Provider,
  "tfplugin5"
>({
  dirname: __dirname,
  fileName: "tfplugin5.proto",
  packageName: "tfplugin5",
  serviceName: "Provider",
  implementation: {
    ApplyResourceChange: unary(async (call) => {
      console.log(call.request!);
      return Either.left({
        code: grpc.status.UNIMPLEMENTED,
      });
    }),
    Configure: unary(async (call) => {
      config = parseDynamicValue<FsProviderSchemaType>(call.request!.config!);
      return Either.right({
        diagnostics: [],
      });
    }),
    GetSchema: unary(async (_call) => {
      console.error("Hello from GetSchema");
      return Either.right({
        provider: {
          version: 1,
          block: {
            version: 1,
            attributes: [
              {
                name: "foo",
                type: ctyType(ctyString()),
                description: "The foo value",
                description_kind: StringKind.PLAIN,
                required: false,
                optional: false,
                computed: false,
                sensitive: false,
                deprecated: false,
              },
            ],
            block_types: [],
            // blockTypes: [],
            deprecated: false,
            description: "test schema",
            description_kind: StringKind.PLAIN,
          },
        },
        resource_schemas: valueMap(
          (resource) => resource.getSchema(),
          resources
        ) as TF.messages.tfplugin5.Schema,
      });
    }),
    ImportResourceState: unary(async (call) => {
      console.log(call.request!);
      return Either.left({
        code: grpc.status.UNIMPLEMENTED,
      });
    }),
    PlanResourceChange: unary(async (call) => {
      const resourceName = call.request!.type_name!;
      const resource = resources[resourceName];

      return resource.planChange({
        config: parseDynamicValue(call.request!.config!),
        priorPrivate: call.request!.prior_private!,
        priorState: parseDynamicValue(call.request!.prior_state!),
        proposedNewState: parseDynamicValue(call.request!.proposed_new_state!),
      });

      // return Either.left({
      //   code: 12,
      // });
    }),
    PrepareProviderConfig: unary(async (call) => {
      const requestConfig = parseDynamicValue<FsProviderSchemaType>(
        call.request!.config!
      );

      return Either.right({
        diagnostics:
          requestConfig.foo !== "bar"
            ? [
                {
                  severity: "ERROR",
                  attribute: {
                    steps: [
                      {
                        attribute_name: "foo",
                      },
                    ],
                  },
                  detail: "That's not a good foo, only bar is a good foo",
                  summary: "Bad foo",
                },
              ]
            : [],
        preparedConfig: serializeDynamicValue(requestConfig),
      });
    }),
    ReadDataSource: unary(async (call) => {
      console.log(call.request!);
      return Either.left({
        code: grpc.status.UNIMPLEMENTED,
      });
    }),
    ReadResource: unary(async (call) => {
      console.log(call.request!);
      return Either.left({
        code: grpc.status.UNIMPLEMENTED,
      });
    }),
    Stop: unary(async (_call) => {
      console.log("Hello from Stop");
      setTimeout(() => {
        process.exit(0);
      }, 100);
      return Either.right({});
    }),
    UpgradeResourceState: unary(async (call) => {
      console.log(call.request!);
      return Either.left({
        code: grpc.status.UNIMPLEMENTED,
      });
    }),
    ValidateDataSourceConfig: unary(async (call) => {
      console.log(call.request!);
      return Either.left({
        code: grpc.status.UNIMPLEMENTED,
      });
    }),
    ValidateResourceTypeConfig: unary(async (call) => {
      const resourceName = call.request!.type_name!;
      const resource = resources[resourceName];

      return Either.right({
        diagnostics: resource.validate(
          parseDynamicValue(call.request!.config!)
        ),
      });
    }),
  },
});

hashicorpPlugin({
  appVersion: 5,
  configureServer(server) {
    tf.addToServer(server);
  },
});

process.on("SIGTERM", () => {
  process.exit(0);
});
process.on("SIGINT", () => {
  process.exit(0);
});
