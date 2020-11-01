import path from "path";
// import * as TF from "src/generated/tfplugin5.2";
import * as fs from "fs";
import { hashicorpPlugin } from "@terraform-typescript/hashicorp-plugin";
import { loadProto } from "@terraform-typescript/grpc-utils";
import * as Either from "fp-ts/Either";
import * as grpc from "@grpc/grpc-js";
import {
  _tfplugin5_GetProviderSchema_Request__Output,
  _tfplugin5_GetProviderSchema_Response,
} from "./generated/tfplugin5/GetProviderSchema";
import {
  _tfplugin5_PrepareProviderConfig_Request__Output,
  _tfplugin5_PrepareProviderConfig_Response,
} from "./generated/tfplugin5/PrepareProviderConfig";
import {
  _tfplugin5_Stop_Request__Output,
  _tfplugin5_Stop_Response,
} from "./generated/tfplugin5/Stop";
import { StringKind } from "./generated/tfplugin5/StringKind";
import { Schema } from "./generated/tfplugin5/Schema";

const cbReturn = <E, V>(
  callback: (error: E | null, value: V | null) => void,
  promiseFn: () => Promise<Either.Either<E, V>>
): void => {
  promiseFn().then(
    (result) => {
      Either.fold<E, V, void>(
        (error) => callback(error, null),
        (value) => callback(null, value)
      )(result);
    },
    (error) => callback(error, null)
  );
};

type UnaryCall<Req, Res> = (
  call: grpc.ServerUnaryCall<Req, Res>,
  callback: grpc.sendUnaryData<Res>
) => void;

const unary: <Req, Res>(
  implementation: (
    call: grpc.ServerUnaryCall<Req, Res>
  ) => Promise<
    Either.Either<
      Exclude<Parameters<grpc.sendUnaryData<Res>>[0], null>,
      Exclude<Parameters<grpc.sendUnaryData<Res>>[1], null>
    >
  >
) => UnaryCall<Req, Res> = (implementation) => (call, callback) =>
  cbReturn(callback, () => implementation(call));

export interface Provider {
  ApplyResourceChange: any;
  Configure: any;
  GetSchema: UnaryCall<
    _tfplugin5_GetProviderSchema_Request__Output,
    _tfplugin5_GetProviderSchema_Response
  >;
  ImportResourceState: any;
  PlanResourceChange: any;
  PrepareProviderConfig: UnaryCall<
    _tfplugin5_PrepareProviderConfig_Request__Output,
    _tfplugin5_PrepareProviderConfig_Response
  >;
  ReadDataSource: any;
  ReadResource: any;
  Stop: UnaryCall<_tfplugin5_Stop_Request__Output, _tfplugin5_Stop_Response>;
  UpgradeResourceState: any;
  ValidateDataSourceConfig: any;
  ValidateResourceTypeConfig: any;
}

// TF.ProtoGrpcType,
// TF.ServiceHandlers.tfplugin5.Provider,
const tf = loadProto<any, Provider, "tfplugin5">({
  dirname: __dirname,
  fileName: "tfplugin5.proto",
  packageName: "tfplugin5",
  serviceName: "Provider",
  implementation: {
    ApplyResourceChange(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    Configure(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
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
                // TODO abstract
                // type: "string",
                type: Buffer.from('"string"'),
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
        // providerMeta: undefined,
        resource_schemas: ({
          fs_file: {
            version: 1,
            block: {
              version: 1,
              attributes: [
                {
                  name: "nb_foos",
                  type: Buffer.from('"number"'),
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
          } as Schema,
          // TODO remove, bug in type generation
        } as any) as Schema,
        // dataSourceSchemas: {},
        // diagnostics: [],
      });
    }),
    ImportResourceState(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    PlanResourceChange(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    PrepareProviderConfig: unary(async (_call) => {
      return Either.right({
        diagnostics: [],
        preparedConfig: {},
      });
    }),
    ReadDataSource(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    ReadResource(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    Stop: unary(async (_call) => {
      console.log("Hello from Stop");
      setTimeout(() => {
        process.exit(0);
      }, 100);
      return Either.right({});
    }),
    UpgradeResourceState(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    ValidateDataSourceConfig(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    ValidateResourceTypeConfig(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
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
