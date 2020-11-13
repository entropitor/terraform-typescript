import { hashicorpPlugin } from "@terraform-typescript/hashicorp-plugin";
import { loadProto, unary } from "@terraform-typescript/grpc-utils";
import * as Either from "fp-ts/Either";
import * as grpc from "@grpc/grpc-js";
import { parseDynamicValue, serializeDynamicValue } from "./dynamicValue";
import { valueMap } from "./mapOverObject";
import { Provider } from "./types/provider";
import { ProtoGrpcType } from "./generated/tfplugin5";
import { ProviderHandlers } from "./generated/tfplugin5/Provider";
import {
  ApplyChangeResult,
  PlanChangeResult,
  ReadResourceResult,
  Resource,
  UpgradeResult,
  ValidateResult,
} from "./types/resource";
import {
  AsyncResponse,
  getDiagnostics,
  responseDo,
  runTask,
  runTaskTillGrpcResponse,
} from "./types/response";
import { pipe } from "fp-ts/lib/function";
import * as TaskThese from "fp-ts/lib/TaskThese";

export const run = <
  P,
  Client,
  R extends { [key: string]: any },
  S extends { [key: string]: [any, any] }
>(
  provider: Provider<P, Client, R, S>
) => {
  // type PSchema = ProviderSchema<typeof provider>;

  let client: Client | null = null;

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
        return pipe(
          provider.prepareProviderConfig({
            config: parseDynamicValue(call.request!.config!),
          }),
          TaskThese.map(({ preparedConfig, ...res }) => ({
            ...res,
            prepared_config: serializeDynamicValue(preparedConfig),
          })),
          runTaskTillGrpcResponse
        );
      }),
      Configure: unary(async (call) => {
        const config = parseDynamicValue<P>(call.request!.config!);

        const configuredAsyncResult = responseDo
          .bind("prepareResult", provider.prepareProviderConfig({ config }))
          .bindL("configuredResult", ({ prepareResult }) =>
            provider.configure({
              config,
              preparedConfig: prepareResult.preparedConfig,
            })
          )
          .doL(({ configuredResult }) => {
            client = configuredResult.client;
            return AsyncResponse.right(null);
          })
          .return(({ configuredResult }) => configuredResult);

        return runTaskTillGrpcResponse(configuredAsyncResult);
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

        const validateResult = await runTask(
          dataSource.validate({
            config: parseDynamicValue(call.request!.config!),
          })
        );

        return Either.right({
          diagnostics: getDiagnostics(validateResult),
        });
      }),
      ReadDataSource: unary(async (call) => {
        const dataSourceName = call.request!.type_name!;
        const dataSource = provider.getDataSources()[dataSourceName];

        return pipe(
          dataSource.read({
            client: client!,
            config: parseDynamicValue(call.request!.config!),
          }),
          TaskThese.map(({ state, ...response }) => ({
            ...response,
            state: serializeDynamicValue(state),
          })),
          runTaskTillGrpcResponse
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
