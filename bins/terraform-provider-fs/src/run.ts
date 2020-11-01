import path from "path";
// import * as TF from "./generated/tfplugin5.2";
import * as TF from "./tfplugin5";
import { hashicorpPlugin } from "@terraform-typescript/hashicorp-plugin";
import { loadProto, unary } from "@terraform-typescript/grpc-utils";
import * as Either from "fp-ts/Either";
import * as grpc from "@grpc/grpc-js";
import { parseDynamicValue, serializeDynamicValue } from "./dynamicValue";
import { valueMap } from "./mapOverObject";
import {
  ApplyChangeResult,
  PlanChangeResult,
  PrepareConfigureResult,
  Provider,
  ProviderSchema,
  ReadResult,
  UpgradeResult,
  ValidateResult,
} from "./provider";

export const run = (provider: Provider<any, any>) => {
  type PSchema = ProviderSchema<typeof provider>;

  const proto = loadProto<
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
          await resource.applyChange({
            config: parseDynamicValue(call.request!.config!),
            plannedPrivateData: call.request!.planned_private!,
            priorState: parseDynamicValue(call.request!.prior_state!),
            plannedState: parseDynamicValue(call.request!.planned_state!),
          })
        );
      }),
      Configure: unary(async (call) => {
        return await provider.configure(
          parseDynamicValue(call.request!.config!)
        );
      }),
      GetSchema: unary(async (_call) => {
        return Either.right({
          provider: provider.getSchema(),
          resource_schemas: valueMap(
            (resource) => resource.getSchema(),
            provider.getResources()
            // TODO remove when typings get fixed
          ) as TF.messages.tfplugin5.Schema,
        });
      }),
      PlanResourceChange: unary(async (call) => {
        const resourceName = call.request!.type_name!;
        const resource = provider.getResources()[resourceName];

        return Either.map((result: PlanChangeResult<any>) => ({
          ...result,
          planned_private: result.plannedPrivateData,
          planned_state: serializeDynamicValue(result.plannedState),
          requires_replace: result.requiresReplace,
        }))(
          await resource.planChange({
            config: parseDynamicValue(call.request!.config!),
            priorPrivateData: call.request!.prior_private!,
            priorState: parseDynamicValue(call.request!.prior_state!),
            proposedNewState: parseDynamicValue(
              call.request!.proposed_new_state!
            ),
          })
        );
      }),
      PrepareProviderConfig: unary(async (call) => {
        const cfg = parseDynamicValue<PSchema>(call.request!.config!);
        return Either.map((result: PrepareConfigureResult) => ({
          ...result,
          prepare_config: serializeDynamicValue(cfg),
        }))(await provider.prepareProviderConfig(cfg));
      }),
      ReadResource: unary(async (call) => {
        const resourceName = call.request!.type_name!;
        const resource = provider.getResources()[resourceName];

        return Either.map((result: ReadResult<any>) => ({
          ...result,
          new_state: serializeDynamicValue(result.newState),
        }))(
          await resource.read({
            currentState: parseDynamicValue(call.request!.current_state!),
            privateData: call.request!.private!,
          })
        );
      }),
      Stop: unary(async (_call) => {
        console.error("Hello from Stop");
        setTimeout(() => {
          process.exit(0);
        }, 100);
        return Either.right({});
      }),
      UpgradeResourceState: unary(async (call) => {
        const resourceName = call.request!.type_name!;
        const resource = provider.getResources()[resourceName];

        return Either.map((result: UpgradeResult<any>) => ({
          ...result,
          upgraded_state: serializeDynamicValue(result.upgradedState),
        }))(
          await resource.upgrade({
            version: call.request!.version!,
            rawState: parseDynamicValue(call.request!.raw_state!),
          })
        );
      }),
      ValidateResourceTypeConfig: unary(async (call) => {
        const resourceName = call.request!.type_name!;
        const resource = provider.getResources()[resourceName];

        return Either.map((result: ValidateResult) => ({
          ...result,
        }))(
          await resource.validate({
            config: parseDynamicValue(call.request!.config!),
          })
        );
      }),

      ImportResourceState: unary(async (call) => {
        console.error(call.request!);
        return Either.left({
          code: grpc.status.UNIMPLEMENTED,
        });
      }),
      ValidateDataSourceConfig: unary(async (call) => {
        console.error(call.request!);
        return Either.left({
          code: grpc.status.UNIMPLEMENTED,
        });
      }),
      ReadDataSource: unary(async (call) => {
        console.error(call.request!);
        return Either.left({
          code: grpc.status.UNIMPLEMENTED,
        });
      }),
    },
  });

  process.on("SIGTERM", () => {
    process.exit(0);
  });
  process.on("SIGINT", () => {
    process.exit(0);
  });

  hashicorpPlugin({
    appVersion: 5,
    configureServer(server) {
      proto.addToServer(server);
    },
  });
};
