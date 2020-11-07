import path from "path";
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
  ReadDataSourceResult,
  ReadResourceResult,
  Resource,
  UpgradeResult,
  ValidateDataSourceResult,
  ValidateResult,
} from "./provider";
import { ProtoGrpcType } from "./generated/tfplugin5";
import { ProviderHandlers } from "./generated/tfplugin5/Provider";

export const run = <
  P,
  R extends { [key: string]: any },
  S extends { [key: string]: [any, any] }
>(
  provider: Provider<P, R, S>
) => {
  type PSchema = ProviderSchema<typeof provider>;

  const proto = loadProto<ProtoGrpcType, ProviderHandlers, "tfplugin5">({
    dirname: __dirname,
    fileName: "tfplugin5.proto",
    packageName: "tfplugin5",
    serviceName: "Provider",
    implementation: {
      GetSchema: unary(async (_call) => {
        return Either.right({
          provider: provider.getSchema(),
          resource_schemas: valueMap(
            (resource) => resource.getSchema(),
            provider.getResources() as { [key: string]: Resource<any> }
          ),
          data_source_schemas: valueMap(
            (dataSource) => dataSource.getSchema(),
            provider.getDataSources()
          ),
        });
      }),

      PrepareProviderConfig: unary(async (call) => {
        const config = parseDynamicValue<PSchema>(call.request!.config!);
        return Either.map(
          ({ diagnostics, preparedConfig }: PrepareConfigureResult<any>) => ({
            diagnostics,
            prepared_config: serializeDynamicValue(preparedConfig),
          })
        )(await provider.prepareProviderConfig({ config }));
      }),
      Configure: unary(async (call) => {
        const config = parseDynamicValue<P>(call.request!.config!);
        const result = await provider.prepareProviderConfig({ config });
        if (Either.isLeft(result)) {
          return result;
        }
        return await provider.configure({
          config,
          preparedConfig: result.right.preparedConfig,
        });
      }),

      ValidateResourceTypeConfig: unary(async (call) => {
        const resourceName = call.request!.type_name!;
        const resource = provider.getResources()[resourceName];

        return Either.map(({ diagnostics }: ValidateResult) => ({
          diagnostics,
        }))(
          await resource.validate({
            config: parseDynamicValue(call.request!.config!),
          })
        );
      }),
      ReadResource: unary(async (call) => {
        const resourceName = call.request!.type_name!;
        const resource = provider.getResources()[resourceName];

        return Either.map(
          ({
            diagnostics,
            newState,
            privateData,
          }: ReadResourceResult<any>) => ({
            diagnostics,
            private: privateData,
            new_state: serializeDynamicValue(newState),
          })
        )(
          await resource.read({
            currentState: parseDynamicValue(call.request!.current_state!),
            privateData: call.request!.private!,
          })
        );
      }),
      PlanResourceChange: unary(async (call) => {
        const resourceName = call.request!.type_name!;
        const resource = provider.getResources()[resourceName];

        return Either.map(
          ({
            diagnostics,
            plannedPrivateData,
            plannedState,
            requiresReplace,
          }: PlanChangeResult<any>) => ({
            diagnostics,
            planned_private: plannedPrivateData,
            planned_state: serializeDynamicValue(plannedState),
            requires_replace: requiresReplace,
          })
        )(
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
      ApplyResourceChange: unary(async (call) => {
        const resourceName = call.request!.type_name!;
        const resource = provider.getResources()[resourceName];

        return Either.map(
          ({ diagnostics, newState, privateData }: ApplyChangeResult<any>) => ({
            private: privateData,
            diagnostics,
            new_state: serializeDynamicValue(newState),
          })
        )(
          await resource.applyChange({
            config: parseDynamicValue(call.request!.config!),
            plannedPrivateData: call.request!.planned_private!,
            priorState: parseDynamicValue(call.request!.prior_state!),
            plannedState: parseDynamicValue(call.request!.planned_state!),
          })
        );
      }),
      UpgradeResourceState: unary(async (call) => {
        const resourceName = call.request!.type_name!;
        const resource = provider.getResources()[resourceName];

        return Either.map(
          ({ diagnostics, upgradedState }: UpgradeResult<any>) => ({
            diagnostics,
            upgraded_state: serializeDynamicValue(upgradedState),
          })
        )(
          await resource.upgrade({
            version: call.request!.version!,
            rawState: parseDynamicValue(call.request!.raw_state!),
          })
        );
      }),
      ImportResourceState: unary(async (call) => {
        console.error(call.request!);
        return Either.left({
          code: grpc.status.UNIMPLEMENTED,
        });
      }),

      Stop: unary(async (_call) => {
        console.error("Hello from Stop");
        setTimeout(() => {
          process.exit(0);
        }, 100);
        return Either.right({});
      }),

      ValidateDataSourceConfig: unary(async (call) => {
        const dataSourceName = call.request!.type_name!;
        const dataSource = provider.getDataSources()[dataSourceName];

        return Either.map(({ diagnostics }: ValidateDataSourceResult) => ({
          diagnostics,
        }))(
          await dataSource.validate({
            config: parseDynamicValue(call.request!.config!),
          })
        );
      }),
      ReadDataSource: unary(async (call) => {
        const dataSourceName = call.request!.type_name!;
        const dataSource = provider.getDataSources()[dataSourceName];

        return Either.map(
          ({ diagnostics, state }: ReadDataSourceResult<any>) => ({
            diagnostics,
            state: serializeDynamicValue(state),
          })
        )(
          await dataSource.read({
            config: parseDynamicValue(call.request!.config!),
          })
        );
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
