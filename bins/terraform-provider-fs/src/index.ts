import path from "path";
// import * as TF from "./generated/tfplugin5.2";
import * as TF from "./tfplugin5";
import * as fs from "fs";
import { hashicorpPlugin } from "@terraform-typescript/hashicorp-plugin";
import { loadProto } from "@terraform-typescript/grpc-utils";
import * as Either from "fp-ts/Either";
import * as grpc from "@grpc/grpc-js";
import * as msgpack from "@msgpack/msgpack";

import { StringKind } from "./generated/tfplugin5/StringKind";
import { DynamicValue } from "./generated/tfplugin5/DynamicValue";

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

type GrpcResponse<Res> = Either.Either<
  Exclude<Parameters<grpc.sendUnaryData<Res>>[0], null>,
  Exclude<Parameters<grpc.sendUnaryData<Res>>[1], null>
>;

type UnaryCall<Req, Res> = (
  call: grpc.ServerUnaryCall<Req, Res>,
  callback: grpc.sendUnaryData<Res>
) => void;

const unary: <Req, Res>(
  implementation: (
    call: grpc.ServerUnaryCall<Req, Res>
  ) => Promise<GrpcResponse<Res>>
) => UnaryCall<Req, Res> = (implementation) => (call, callback) =>
  cbReturn(callback, () => implementation(call));
const objectMap = <A, B>(
  mapFn: (
    keyValue: [string, A],
    index: number,
    array: [string, A][]
  ) => [string, B],
  obj: Record<string, A>
): Record<string, B> => Object.fromEntries(Object.entries(obj).map(mapFn));
const valueMap = <A, B>(
  mapFn: (keyValue: A, index: number) => B,
  obj: Record<string, A>
): Record<string, B> =>
  objectMap(([key, value], index) => [key, mapFn(value, index)], obj);

const unreachable = (_: never): void => {};

// https://github.com/zclconf/go-cty
type ctyType =
  | {
      type: "string" | "number" | "boolean";
    }
  | {
      type: "list" | "set" | "map";
      itemType: ctyType;
    }
  | {
      type: "tuple";
      itemTypes: ctyType[];
    }
  | {
      type: "object";
      itemType: {
        [key: string]: ctyType;
      };
    };
const ctyTypeToJson = (typ: ctyType): any => {
  switch (typ.type) {
    case "number":
    case "string": {
      return typ.type;
    }
    case "boolean": {
      return "bool";
    }
    case "map":
    case "set":
    case "list": {
      return [typ.type, ctyTypeToJson(typ.itemType)];
    }
    case "tuple": {
      return [typ.type, typ.itemTypes.map(ctyTypeToJson)];
    }
    case "object": {
      return [typ.type, valueMap(ctyTypeToJson, typ.itemType)];
    }
    default:
      unreachable(typ);
      return "";
  }
};
const ctyType = (typ: ctyType): Buffer => {
  return Buffer.from(JSON.stringify(ctyTypeToJson(typ)));
};

const parseDynamicValue = <T>(value: DynamicValue): T => {
  if (value.msgpack) {
    return msgpack.decode(value.msgpack as Uint8Array) as T;
  }
  if (value.json) {
    return JSON.parse(value.json.toString()) as T;
  }
  return {} as T;
};
const serializeDynamicValue = (value: any): DynamicValue => {
  const encoded: Uint8Array = msgpack.encode(value);
  const buffer: Buffer = Buffer.from(
    encoded.buffer,
    encoded.byteOffset,
    encoded.byteLength
  );

  return {
    msgpack: buffer,
  };
};

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
              type: ctyType({
                type: "number",
              }),
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
                type: ctyType({ type: "string" }),
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
