// Original file: src/proto/tfplugin5.proto

import type * as grpc from '@grpc/grpc-js';

import type {
  _tfplugin5_ApplyResourceChange_Request,
  _tfplugin5_ApplyResourceChange_Request__Output,
  _tfplugin5_ApplyResourceChange_Response,
  _tfplugin5_ApplyResourceChange_Response__Output,
} from './ApplyResourceChange';
import type {
  _tfplugin5_Configure_Request,
  _tfplugin5_Configure_Request__Output,
  _tfplugin5_Configure_Response,
  _tfplugin5_Configure_Response__Output,
} from './Configure';
import type {
  _tfplugin5_GetProviderSchema_Request,
  _tfplugin5_GetProviderSchema_Request__Output,
  _tfplugin5_GetProviderSchema_Response,
  _tfplugin5_GetProviderSchema_Response__Output,
} from './GetProviderSchema';
import type {
  _tfplugin5_ImportResourceState_Request,
  _tfplugin5_ImportResourceState_Request__Output,
  _tfplugin5_ImportResourceState_Response,
  _tfplugin5_ImportResourceState_Response__Output,
} from './ImportResourceState';
import type {
  _tfplugin5_PlanResourceChange_Request,
  _tfplugin5_PlanResourceChange_Request__Output,
  _tfplugin5_PlanResourceChange_Response,
  _tfplugin5_PlanResourceChange_Response__Output,
} from './PlanResourceChange';
import type {
  _tfplugin5_PrepareProviderConfig_Request,
  _tfplugin5_PrepareProviderConfig_Request__Output,
  _tfplugin5_PrepareProviderConfig_Response,
  _tfplugin5_PrepareProviderConfig_Response__Output,
} from './PrepareProviderConfig';
import type {
  _tfplugin5_ReadDataSource_Request,
  _tfplugin5_ReadDataSource_Request__Output,
  _tfplugin5_ReadDataSource_Response,
  _tfplugin5_ReadDataSource_Response__Output,
} from './ReadDataSource';
import type {
  _tfplugin5_ReadResource_Request,
  _tfplugin5_ReadResource_Request__Output,
  _tfplugin5_ReadResource_Response,
  _tfplugin5_ReadResource_Response__Output,
} from './ReadResource';
import type {
  _tfplugin5_Stop_Request,
  _tfplugin5_Stop_Request__Output,
  _tfplugin5_Stop_Response,
  _tfplugin5_Stop_Response__Output,
} from './Stop';
import type {
  _tfplugin5_UpgradeResourceState_Request,
  _tfplugin5_UpgradeResourceState_Request__Output,
  _tfplugin5_UpgradeResourceState_Response,
  _tfplugin5_UpgradeResourceState_Response__Output,
} from './UpgradeResourceState';
import type {
  _tfplugin5_ValidateDataSourceConfig_Request,
  _tfplugin5_ValidateDataSourceConfig_Request__Output,
  _tfplugin5_ValidateDataSourceConfig_Response,
  _tfplugin5_ValidateDataSourceConfig_Response__Output,
} from './ValidateDataSourceConfig';
import type {
  _tfplugin5_ValidateResourceTypeConfig_Request,
  _tfplugin5_ValidateResourceTypeConfig_Request__Output,
  _tfplugin5_ValidateResourceTypeConfig_Response,
  _tfplugin5_ValidateResourceTypeConfig_Response__Output,
} from './ValidateResourceTypeConfig';

export interface ProviderClient extends grpc.Client {
  ApplyResourceChange(
    argument: _tfplugin5_ApplyResourceChange_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ApplyResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ApplyResourceChange(
    argument: _tfplugin5_ApplyResourceChange_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ApplyResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ApplyResourceChange(
    argument: _tfplugin5_ApplyResourceChange_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ApplyResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ApplyResourceChange(
    argument: _tfplugin5_ApplyResourceChange_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ApplyResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  applyResourceChange(
    argument: _tfplugin5_ApplyResourceChange_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ApplyResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  applyResourceChange(
    argument: _tfplugin5_ApplyResourceChange_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ApplyResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  applyResourceChange(
    argument: _tfplugin5_ApplyResourceChange_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ApplyResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  applyResourceChange(
    argument: _tfplugin5_ApplyResourceChange_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ApplyResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  Configure(
    argument: _tfplugin5_Configure_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Configure_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Configure(
    argument: _tfplugin5_Configure_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Configure_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Configure(
    argument: _tfplugin5_Configure_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Configure_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Configure(
    argument: _tfplugin5_Configure_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Configure_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  configure(
    argument: _tfplugin5_Configure_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Configure_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  configure(
    argument: _tfplugin5_Configure_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Configure_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  configure(
    argument: _tfplugin5_Configure_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Configure_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  configure(
    argument: _tfplugin5_Configure_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Configure_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  GetSchema(
    argument: _tfplugin5_GetProviderSchema_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_GetProviderSchema_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  GetSchema(
    argument: _tfplugin5_GetProviderSchema_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_GetProviderSchema_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  GetSchema(
    argument: _tfplugin5_GetProviderSchema_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_GetProviderSchema_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  GetSchema(
    argument: _tfplugin5_GetProviderSchema_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_GetProviderSchema_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  getSchema(
    argument: _tfplugin5_GetProviderSchema_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_GetProviderSchema_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  getSchema(
    argument: _tfplugin5_GetProviderSchema_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_GetProviderSchema_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  getSchema(
    argument: _tfplugin5_GetProviderSchema_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_GetProviderSchema_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  getSchema(
    argument: _tfplugin5_GetProviderSchema_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_GetProviderSchema_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  ImportResourceState(
    argument: _tfplugin5_ImportResourceState_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ImportResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ImportResourceState(
    argument: _tfplugin5_ImportResourceState_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ImportResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ImportResourceState(
    argument: _tfplugin5_ImportResourceState_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ImportResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ImportResourceState(
    argument: _tfplugin5_ImportResourceState_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ImportResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  importResourceState(
    argument: _tfplugin5_ImportResourceState_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ImportResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  importResourceState(
    argument: _tfplugin5_ImportResourceState_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ImportResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  importResourceState(
    argument: _tfplugin5_ImportResourceState_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ImportResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  importResourceState(
    argument: _tfplugin5_ImportResourceState_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ImportResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  PlanResourceChange(
    argument: _tfplugin5_PlanResourceChange_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PlanResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  PlanResourceChange(
    argument: _tfplugin5_PlanResourceChange_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PlanResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  PlanResourceChange(
    argument: _tfplugin5_PlanResourceChange_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PlanResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  PlanResourceChange(
    argument: _tfplugin5_PlanResourceChange_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PlanResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  planResourceChange(
    argument: _tfplugin5_PlanResourceChange_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PlanResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  planResourceChange(
    argument: _tfplugin5_PlanResourceChange_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PlanResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  planResourceChange(
    argument: _tfplugin5_PlanResourceChange_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PlanResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  planResourceChange(
    argument: _tfplugin5_PlanResourceChange_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PlanResourceChange_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  PrepareProviderConfig(
    argument: _tfplugin5_PrepareProviderConfig_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PrepareProviderConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  PrepareProviderConfig(
    argument: _tfplugin5_PrepareProviderConfig_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PrepareProviderConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  PrepareProviderConfig(
    argument: _tfplugin5_PrepareProviderConfig_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PrepareProviderConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  PrepareProviderConfig(
    argument: _tfplugin5_PrepareProviderConfig_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PrepareProviderConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  prepareProviderConfig(
    argument: _tfplugin5_PrepareProviderConfig_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PrepareProviderConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  prepareProviderConfig(
    argument: _tfplugin5_PrepareProviderConfig_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PrepareProviderConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  prepareProviderConfig(
    argument: _tfplugin5_PrepareProviderConfig_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PrepareProviderConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  prepareProviderConfig(
    argument: _tfplugin5_PrepareProviderConfig_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_PrepareProviderConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  ReadDataSource(
    argument: _tfplugin5_ReadDataSource_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadDataSource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ReadDataSource(
    argument: _tfplugin5_ReadDataSource_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadDataSource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ReadDataSource(
    argument: _tfplugin5_ReadDataSource_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadDataSource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ReadDataSource(
    argument: _tfplugin5_ReadDataSource_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadDataSource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  readDataSource(
    argument: _tfplugin5_ReadDataSource_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadDataSource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  readDataSource(
    argument: _tfplugin5_ReadDataSource_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadDataSource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  readDataSource(
    argument: _tfplugin5_ReadDataSource_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadDataSource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  readDataSource(
    argument: _tfplugin5_ReadDataSource_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadDataSource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  ReadResource(
    argument: _tfplugin5_ReadResource_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadResource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ReadResource(
    argument: _tfplugin5_ReadResource_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadResource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ReadResource(
    argument: _tfplugin5_ReadResource_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadResource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ReadResource(
    argument: _tfplugin5_ReadResource_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadResource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  readResource(
    argument: _tfplugin5_ReadResource_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadResource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  readResource(
    argument: _tfplugin5_ReadResource_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadResource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  readResource(
    argument: _tfplugin5_ReadResource_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadResource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  readResource(
    argument: _tfplugin5_ReadResource_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ReadResource_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  Stop(
    argument: _tfplugin5_Stop_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Stop_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Stop(
    argument: _tfplugin5_Stop_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Stop_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Stop(
    argument: _tfplugin5_Stop_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Stop_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Stop(
    argument: _tfplugin5_Stop_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Stop_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  stop(
    argument: _tfplugin5_Stop_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Stop_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  stop(
    argument: _tfplugin5_Stop_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Stop_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  stop(
    argument: _tfplugin5_Stop_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Stop_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  stop(
    argument: _tfplugin5_Stop_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_Stop_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  UpgradeResourceState(
    argument: _tfplugin5_UpgradeResourceState_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_UpgradeResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  UpgradeResourceState(
    argument: _tfplugin5_UpgradeResourceState_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_UpgradeResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  UpgradeResourceState(
    argument: _tfplugin5_UpgradeResourceState_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_UpgradeResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  UpgradeResourceState(
    argument: _tfplugin5_UpgradeResourceState_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_UpgradeResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  upgradeResourceState(
    argument: _tfplugin5_UpgradeResourceState_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_UpgradeResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  upgradeResourceState(
    argument: _tfplugin5_UpgradeResourceState_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_UpgradeResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  upgradeResourceState(
    argument: _tfplugin5_UpgradeResourceState_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_UpgradeResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  upgradeResourceState(
    argument: _tfplugin5_UpgradeResourceState_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_UpgradeResourceState_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  ValidateDataSourceConfig(
    argument: _tfplugin5_ValidateDataSourceConfig_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateDataSourceConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ValidateDataSourceConfig(
    argument: _tfplugin5_ValidateDataSourceConfig_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateDataSourceConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ValidateDataSourceConfig(
    argument: _tfplugin5_ValidateDataSourceConfig_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateDataSourceConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ValidateDataSourceConfig(
    argument: _tfplugin5_ValidateDataSourceConfig_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateDataSourceConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  validateDataSourceConfig(
    argument: _tfplugin5_ValidateDataSourceConfig_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateDataSourceConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  validateDataSourceConfig(
    argument: _tfplugin5_ValidateDataSourceConfig_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateDataSourceConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  validateDataSourceConfig(
    argument: _tfplugin5_ValidateDataSourceConfig_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateDataSourceConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  validateDataSourceConfig(
    argument: _tfplugin5_ValidateDataSourceConfig_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateDataSourceConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  ValidateResourceTypeConfig(
    argument: _tfplugin5_ValidateResourceTypeConfig_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateResourceTypeConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ValidateResourceTypeConfig(
    argument: _tfplugin5_ValidateResourceTypeConfig_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateResourceTypeConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ValidateResourceTypeConfig(
    argument: _tfplugin5_ValidateResourceTypeConfig_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateResourceTypeConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  ValidateResourceTypeConfig(
    argument: _tfplugin5_ValidateResourceTypeConfig_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateResourceTypeConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  validateResourceTypeConfig(
    argument: _tfplugin5_ValidateResourceTypeConfig_Request,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateResourceTypeConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  validateResourceTypeConfig(
    argument: _tfplugin5_ValidateResourceTypeConfig_Request,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateResourceTypeConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  validateResourceTypeConfig(
    argument: _tfplugin5_ValidateResourceTypeConfig_Request,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateResourceTypeConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  validateResourceTypeConfig(
    argument: _tfplugin5_ValidateResourceTypeConfig_Request,
    callback: (
      error?: grpc.ServiceError,
      result?: _tfplugin5_ValidateResourceTypeConfig_Response__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
}

export interface ProviderHandlers extends grpc.UntypedServiceImplementation {
  ApplyResourceChange: grpc.handleUnaryCall<
    _tfplugin5_ApplyResourceChange_Request__Output,
    _tfplugin5_ApplyResourceChange_Response
  >;

  Configure: grpc.handleUnaryCall<
    _tfplugin5_Configure_Request__Output,
    _tfplugin5_Configure_Response
  >;

  GetSchema: grpc.handleUnaryCall<
    _tfplugin5_GetProviderSchema_Request__Output,
    _tfplugin5_GetProviderSchema_Response
  >;

  ImportResourceState: grpc.handleUnaryCall<
    _tfplugin5_ImportResourceState_Request__Output,
    _tfplugin5_ImportResourceState_Response
  >;

  PlanResourceChange: grpc.handleUnaryCall<
    _tfplugin5_PlanResourceChange_Request__Output,
    _tfplugin5_PlanResourceChange_Response
  >;

  PrepareProviderConfig: grpc.handleUnaryCall<
    _tfplugin5_PrepareProviderConfig_Request__Output,
    _tfplugin5_PrepareProviderConfig_Response
  >;

  ReadDataSource: grpc.handleUnaryCall<
    _tfplugin5_ReadDataSource_Request__Output,
    _tfplugin5_ReadDataSource_Response
  >;

  ReadResource: grpc.handleUnaryCall<
    _tfplugin5_ReadResource_Request__Output,
    _tfplugin5_ReadResource_Response
  >;

  Stop: grpc.handleUnaryCall<
    _tfplugin5_Stop_Request__Output,
    _tfplugin5_Stop_Response
  >;

  UpgradeResourceState: grpc.handleUnaryCall<
    _tfplugin5_UpgradeResourceState_Request__Output,
    _tfplugin5_UpgradeResourceState_Response
  >;

  ValidateDataSourceConfig: grpc.handleUnaryCall<
    _tfplugin5_ValidateDataSourceConfig_Request__Output,
    _tfplugin5_ValidateDataSourceConfig_Response
  >;

  ValidateResourceTypeConfig: grpc.handleUnaryCall<
    _tfplugin5_ValidateResourceTypeConfig_Request__Output,
    _tfplugin5_ValidateResourceTypeConfig_Response
  >;
}
