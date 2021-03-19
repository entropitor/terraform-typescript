/* eslint-disable sort-keys-fix/sort-keys-fix */
import { loadProto, unary } from '@entropitor/hashicorp-grpc-utils';
import { hashicorpPlugin } from '@entropitor/hashicorp-plugin';
import * as Either from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as TaskThese from 'fp-ts/lib/TaskThese';

import { parseDynamicValue, serializeDynamicValue } from './dynamicValue';
import { ProtoGrpcType } from './generated/tfplugin5';
import { ProviderHandlers } from './generated/tfplugin5/Provider';
import { valueMap } from './mapOverObject';
import { maskComputedState } from './maskComputedState';
import { SchemaDescriptor } from './schema/descriptor';
import { createSchema } from './schema/schema';
import { SchemaConfig } from './schema/SchemaConfig';
import { SchemaState } from './schema/SchemaState';
import { DataSource } from './types/dataSource';
import { Provider, StringKeys } from './types/provider';
import { Resource } from './types/resource';
import {
  AsyncResponse,
  getDiagnostics,
  runTask,
  runTaskTillGrpcResponse,
} from './types/response';
import { hasChange } from './types/utils/hasChange';

export const run = <
  SD extends SchemaDescriptor,
  Client,
  R extends Record<string, SchemaDescriptor> = Record<string, SchemaDescriptor>,
  D extends Record<string, SchemaDescriptor> = Record<string, SchemaDescriptor>
>(
  provider: Provider<SD, Client, R, D>,
) => {
  type ProviderSchemaConfig = SchemaConfig<SD>;

  let client: Client | null = null;

  const proto = loadProto<ProtoGrpcType, ProviderHandlers, 'tfplugin5'>({
    dirname: __dirname,
    fileName: 'tfplugin5.proto',
    packageName: 'tfplugin5',
    serviceName: 'Provider',
    implementation: {
      GetSchema: unary(async (_call) => {
        return Either.right({
          provider: provider.getSchema(),
          resource_schemas: valueMap(
            (dataSource: Resource<any, Client>) =>
              createSchema(dataSource.getSchemaDescriptor()),
            provider.getResources(),
          ),
          data_source_schemas: valueMap(
            (dataSource: DataSource<any, Client>) =>
              createSchema(dataSource.getSchemaDescriptor()),
            provider.getDataSources(),
          ),
        });
      }),

      PrepareProviderConfig: unary(async (call) => {
        return pipe(
          provider.prepareProviderConfig({
            config: parseDynamicValue(call.request!.config!),
          }),
          TaskThese.map(({ preparedConfig }) => ({
            prepared_config: serializeDynamicValue(preparedConfig),
          })),
          runTaskTillGrpcResponse,
        );
      }),
      Configure: unary(async (call) => {
        const config = parseDynamicValue<ProviderSchemaConfig>(
          call.request!.config!,
        );

        const configuredAsyncResult = pipe(
          provider.prepareProviderConfig({ config }),
          AsyncResponse.chain((prepareResult) =>
            provider.configure({
              config,
              preparedConfig: prepareResult.preparedConfig,
            }),
          ),
          AsyncResponse.chain((configuredResult) => {
            client = configuredResult.client;
            return AsyncResponse.right({});
          }),
        );

        return runTaskTillGrpcResponse(configuredAsyncResult);
      }),

      ValidateResourceTypeConfig: unary(async (call) => {
        const resourceName = call.request!.type_name!;
        const resource = provider.getResources()[resourceName];

        return pipe(
          resource.validate({
            config: parseDynamicValue(call.request!.config!),
          }),
          runTaskTillGrpcResponse,
        );
      }),
      ReadResource: unary(async (call) => {
        const resourceName = call.request!.type_name! as StringKeys<R>;
        const resource = provider.getResources()[resourceName];

        return pipe(
          resource.read({
            currentState: parseDynamicValue(call.request!.current_state!),
            privateData: call.request!.private!,
            client: client!,
          }),
          TaskThese.map(({ newState, privateData }) => ({
            private: privateData,
            new_state: serializeDynamicValue(newState),
          })),
          runTaskTillGrpcResponse,
        );
      }),
      PlanResourceChange: unary(async (call) => {
        const resourceName = call.request!.type_name! as StringKeys<R>;
        const resource = provider.getResources()[resourceName];

        type ResourceSchemaState = SchemaState<R[typeof resourceName]>;
        const priorState = parseDynamicValue<ResourceSchemaState>(
          call.request!.prior_state!,
        );
        const proposedNewState = parseDynamicValue<ResourceSchemaState>(
          call.request!.proposed_new_state!,
        );

        return pipe(
          resource.planChange({
            client: client!,
            config: parseDynamicValue(call.request!.config!),
            hasProposedStateChange: hasChange(
              priorState,
              proposedNewState,
            ) as any,
            priorPrivateData: call.request!.prior_private!,
            priorState,
            proposedNewState,
          }),
          TaskThese.map(
            ({ plannedPrivateData, plannedState, requiresReplace }) => {
              const cleanedState = maskComputedState(
                plannedState,
                resource.getSchemaDescriptor(),
              );
              return {
                planned_private: plannedPrivateData,
                planned_state: serializeDynamicValue(cleanedState),
                requires_replace: requiresReplace,
              };
            },
          ),
          runTaskTillGrpcResponse,
        );
      }),
      ApplyResourceChange: unary(async (call) => {
        const resourceName = call.request!.type_name! as StringKeys<R>;
        const resource = provider.getResources()[resourceName];

        type ResourceSchemaState = SchemaState<R[typeof resourceName]>;
        const priorState = parseDynamicValue<ResourceSchemaState>(
          call.request!.prior_state!,
        );
        const plannedState = parseDynamicValue<ResourceSchemaState>(
          call.request!.planned_state!,
        );

        return pipe(
          resource.applyChange({
            client: client!,
            config: parseDynamicValue(call.request!.config!),
            hasStateChange: hasChange(priorState, plannedState) as any,
            plannedPrivateData: call.request!.planned_private!,
            plannedState,
            priorState,
          }),
          TaskThese.map(({ newState, privateData }) => ({
            private: privateData,
            new_state: serializeDynamicValue(newState),
          })),
          runTaskTillGrpcResponse,
        );
      }),
      UpgradeResourceState: unary(async (call) => {
        const resourceName = call.request!.type_name! as StringKeys<R>;
        const resource = provider.getResources()[resourceName];

        return pipe(
          resource.upgrade({
            client: client!,
            version: call.request!.version!,
            rawState: parseDynamicValue(call.request!.raw_state!),
          }),
          TaskThese.map(({ upgradedState }) => ({
            upgraded_state: serializeDynamicValue(upgradedState),
          })),
          runTaskTillGrpcResponse,
        );
      }),
      ImportResourceState: unary(async (_call) => {
        return Either.left({
          code: 12, // Unimplemented
        });
      }),

      Stop: unary(async (_call) => {
        // TODO should this need better integration?
        // eslint-disable-next-line no-console
        console.error('Hello from Stop');
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
          }),
        );

        return Either.right({
          diagnostics: getDiagnostics(validateResult),
        });
      }),
      ReadDataSource: unary(async (call) => {
        const dataSourceName = call.request!.type_name! as StringKeys<D>;
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
          runTaskTillGrpcResponse,
        );
      }),
    },
  });

  process.on('SIGTERM', () => {
    process.exit(0);
  });
  process.on('SIGINT', () => {
    process.exit(0);
  });

  hashicorpPlugin({
    appVersion: 5,
    configureServer(server) {
      proto.addToServer(server);
    },
  });
};
