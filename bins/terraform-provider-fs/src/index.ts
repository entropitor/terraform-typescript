import path from "path";
// import * as TF from "./generated/tfplugin5.2";
import * as TF from "./tfplugin5";
import { hashicorpPlugin } from "@terraform-typescript/hashicorp-plugin";
import { loadProto, unary } from "@terraform-typescript/grpc-utils";
import * as Either from "fp-ts/Either";
import * as grpc from "@grpc/grpc-js";
import { parseDynamicValue, serializeDynamicValue } from "./dynamicValue";
import { valueMap } from "./mapOverObject";
import { fsProvider } from "./fsProvider";
import {
  ApplyChangeResult,
  PlanChangeResult,
  ProviderSchema,
} from "./provider";

const provider = fsProvider;
type PSchema = ProviderSchema<typeof provider>;

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
      const resourceName = call.request!.type_name!;
      const resource = provider.getResources()[resourceName];

      return Either.map((result: ApplyChangeResult<any>) => ({
        ...result,
        new_state: serializeDynamicValue(result.newState),
      }))(
        resource.applyChange({
          config: parseDynamicValue(call.request!.config!),
          plannedPrivate: call.request!.planned_private!,
          priorState: parseDynamicValue(call.request!.prior_state!),
          plannedState: parseDynamicValue(call.request!.planned_state!),
        })
      );
    }),
    Configure: unary(async (call) => {
      return Either.right({
        diagnostics: provider.configure(
          parseDynamicValue(call.request!.config!)
        ),
      });
    }),
    GetSchema: unary(async (_call) => {
      return Either.right({
        provider: fsProvider.getSchema(),
        resource_schemas: valueMap(
          (resource) => resource.getSchema(),
          provider.getResources()
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
      const resource = provider.getResources()[resourceName];

      return Either.map((result: PlanChangeResult<any>) => ({
        ...result,
        planned_private: result.plannedPrivate,
        planned_state: serializeDynamicValue(result.plannedState),
        requires_replace: result.requiresReplace,
      }))(
        resource.planChange({
          config: parseDynamicValue(call.request!.config!),
          priorPrivate: call.request!.prior_private!,
          priorState: parseDynamicValue(call.request!.prior_state!),
          proposedNewState: parseDynamicValue(
            call.request!.proposed_new_state!
          ),
        })
      );
    }),
    PrepareProviderConfig: unary(async (call) => {
      const cfg = parseDynamicValue<PSchema>(call.request!.config!);
      return Either.right({
        diagnostics: provider.prepareProviderConfig(cfg),
        prepared_config: serializeDynamicValue(cfg),
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
      const resource = provider.getResources()[resourceName];

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
