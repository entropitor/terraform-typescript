import * as grpc from '@grpc/grpc-js';
import { ServiceDefinition, EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import { ApplyResourceChange as _tfplugin5_ApplyResourceChange, ApplyResourceChange__Output as _tfplugin5_ApplyResourceChange__Output } from './tfplugin5/ApplyResourceChange';
import { AttributePath as _tfplugin5_AttributePath, AttributePath__Output as _tfplugin5_AttributePath__Output } from './tfplugin5/AttributePath';
import { Configure as _tfplugin5_Configure, Configure__Output as _tfplugin5_Configure__Output } from './tfplugin5/Configure';
import { Diagnostic as _tfplugin5_Diagnostic, Diagnostic__Output as _tfplugin5_Diagnostic__Output } from './tfplugin5/Diagnostic';
import { DynamicValue as _tfplugin5_DynamicValue, DynamicValue__Output as _tfplugin5_DynamicValue__Output } from './tfplugin5/DynamicValue';
import { GetProviderSchema as _tfplugin5_GetProviderSchema, GetProviderSchema__Output as _tfplugin5_GetProviderSchema__Output } from './tfplugin5/GetProviderSchema';
import { GetProvisionerSchema as _tfplugin5_GetProvisionerSchema, GetProvisionerSchema__Output as _tfplugin5_GetProvisionerSchema__Output } from './tfplugin5/GetProvisionerSchema';
import { ImportResourceState as _tfplugin5_ImportResourceState, ImportResourceState__Output as _tfplugin5_ImportResourceState__Output } from './tfplugin5/ImportResourceState';
import { PlanResourceChange as _tfplugin5_PlanResourceChange, PlanResourceChange__Output as _tfplugin5_PlanResourceChange__Output } from './tfplugin5/PlanResourceChange';
import { PrepareProviderConfig as _tfplugin5_PrepareProviderConfig, PrepareProviderConfig__Output as _tfplugin5_PrepareProviderConfig__Output } from './tfplugin5/PrepareProviderConfig';
import { ProvisionResource as _tfplugin5_ProvisionResource, ProvisionResource__Output as _tfplugin5_ProvisionResource__Output } from './tfplugin5/ProvisionResource';
import { RawState as _tfplugin5_RawState, RawState__Output as _tfplugin5_RawState__Output } from './tfplugin5/RawState';
import { ReadDataSource as _tfplugin5_ReadDataSource, ReadDataSource__Output as _tfplugin5_ReadDataSource__Output } from './tfplugin5/ReadDataSource';
import { ReadResource as _tfplugin5_ReadResource, ReadResource__Output as _tfplugin5_ReadResource__Output } from './tfplugin5/ReadResource';
import { Schema as _tfplugin5_Schema, Schema__Output as _tfplugin5_Schema__Output } from './tfplugin5/Schema';
import { Stop as _tfplugin5_Stop, Stop__Output as _tfplugin5_Stop__Output } from './tfplugin5/Stop';
import { StringKind as _tfplugin5_StringKind } from './tfplugin5/StringKind';
import { UpgradeResourceState as _tfplugin5_UpgradeResourceState, UpgradeResourceState__Output as _tfplugin5_UpgradeResourceState__Output } from './tfplugin5/UpgradeResourceState';
import { ValidateDataSourceConfig as _tfplugin5_ValidateDataSourceConfig, ValidateDataSourceConfig__Output as _tfplugin5_ValidateDataSourceConfig__Output } from './tfplugin5/ValidateDataSourceConfig';
import { ValidateProvisionerConfig as _tfplugin5_ValidateProvisionerConfig, ValidateProvisionerConfig__Output as _tfplugin5_ValidateProvisionerConfig__Output } from './tfplugin5/ValidateProvisionerConfig';
import { ValidateResourceTypeConfig as _tfplugin5_ValidateResourceTypeConfig, ValidateResourceTypeConfig__Output as _tfplugin5_ValidateResourceTypeConfig__Output } from './tfplugin5/ValidateResourceTypeConfig';

export namespace messages {
  export namespace tfplugin5 {
    export type ApplyResourceChange = _tfplugin5_ApplyResourceChange;
    export type ApplyResourceChange__Output = _tfplugin5_ApplyResourceChange__Output;
    export type AttributePath = _tfplugin5_AttributePath;
    export type AttributePath__Output = _tfplugin5_AttributePath__Output;
    export type Configure = _tfplugin5_Configure;
    export type Configure__Output = _tfplugin5_Configure__Output;
    export type Diagnostic = _tfplugin5_Diagnostic;
    export type Diagnostic__Output = _tfplugin5_Diagnostic__Output;
    export type DynamicValue = _tfplugin5_DynamicValue;
    export type DynamicValue__Output = _tfplugin5_DynamicValue__Output;
    export type GetProviderSchema = _tfplugin5_GetProviderSchema;
    export type GetProviderSchema__Output = _tfplugin5_GetProviderSchema__Output;
    export type GetProvisionerSchema = _tfplugin5_GetProvisionerSchema;
    export type GetProvisionerSchema__Output = _tfplugin5_GetProvisionerSchema__Output;
    export type ImportResourceState = _tfplugin5_ImportResourceState;
    export type ImportResourceState__Output = _tfplugin5_ImportResourceState__Output;
    export type PlanResourceChange = _tfplugin5_PlanResourceChange;
    export type PlanResourceChange__Output = _tfplugin5_PlanResourceChange__Output;
    export type PrepareProviderConfig = _tfplugin5_PrepareProviderConfig;
    export type PrepareProviderConfig__Output = _tfplugin5_PrepareProviderConfig__Output;
    export namespace Provider {
    }
    export type ProvisionResource = _tfplugin5_ProvisionResource;
    export type ProvisionResource__Output = _tfplugin5_ProvisionResource__Output;
    export namespace Provisioner {
    }
    export type RawState = _tfplugin5_RawState;
    export type RawState__Output = _tfplugin5_RawState__Output;
    export type ReadDataSource = _tfplugin5_ReadDataSource;
    export type ReadDataSource__Output = _tfplugin5_ReadDataSource__Output;
    export type ReadResource = _tfplugin5_ReadResource;
    export type ReadResource__Output = _tfplugin5_ReadResource__Output;
    export type Schema = _tfplugin5_Schema;
    export type Schema__Output = _tfplugin5_Schema__Output;
    export type Stop = _tfplugin5_Stop;
    export type Stop__Output = _tfplugin5_Stop__Output;
    export type StringKind = _tfplugin5_StringKind;
    export type UpgradeResourceState = _tfplugin5_UpgradeResourceState;
    export type UpgradeResourceState__Output = _tfplugin5_UpgradeResourceState__Output;
    export type ValidateDataSourceConfig = _tfplugin5_ValidateDataSourceConfig;
    export type ValidateDataSourceConfig__Output = _tfplugin5_ValidateDataSourceConfig__Output;
    export type ValidateProvisionerConfig = _tfplugin5_ValidateProvisionerConfig;
    export type ValidateProvisionerConfig__Output = _tfplugin5_ValidateProvisionerConfig__Output;
    export type ValidateResourceTypeConfig = _tfplugin5_ValidateResourceTypeConfig;
    export type ValidateResourceTypeConfig__Output = _tfplugin5_ValidateResourceTypeConfig__Output;
  }
}

export namespace ClientInterfaces {
  export namespace tfplugin5 {
    export namespace ApplyResourceChange {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace AttributePath {
      export namespace Step {
      }
    }
    export namespace Configure {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace Diagnostic {
    }
    export namespace DynamicValue {
    }
    export namespace GetProviderSchema {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace GetProvisionerSchema {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace ImportResourceState {
      export namespace ImportedResource {
      }
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace PlanResourceChange {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace PrepareProviderConfig {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export interface ProviderClient extends grpc.Client {
      ApplyResourceChange(argument: messages.tfplugin5.ApplyResourceChange.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ApplyResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      ApplyResourceChange(argument: messages.tfplugin5.ApplyResourceChange.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ApplyResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      ApplyResourceChange(argument: messages.tfplugin5.ApplyResourceChange.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ApplyResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      ApplyResourceChange(argument: messages.tfplugin5.ApplyResourceChange.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ApplyResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      applyResourceChange(argument: messages.tfplugin5.ApplyResourceChange.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ApplyResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      applyResourceChange(argument: messages.tfplugin5.ApplyResourceChange.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ApplyResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      applyResourceChange(argument: messages.tfplugin5.ApplyResourceChange.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ApplyResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      applyResourceChange(argument: messages.tfplugin5.ApplyResourceChange.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ApplyResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      
      Configure(argument: messages.tfplugin5.Configure.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Configure.Response__Output) => void): grpc.ClientUnaryCall;
      Configure(argument: messages.tfplugin5.Configure.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Configure.Response__Output) => void): grpc.ClientUnaryCall;
      Configure(argument: messages.tfplugin5.Configure.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Configure.Response__Output) => void): grpc.ClientUnaryCall;
      Configure(argument: messages.tfplugin5.Configure.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Configure.Response__Output) => void): grpc.ClientUnaryCall;
      configure(argument: messages.tfplugin5.Configure.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Configure.Response__Output) => void): grpc.ClientUnaryCall;
      configure(argument: messages.tfplugin5.Configure.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Configure.Response__Output) => void): grpc.ClientUnaryCall;
      configure(argument: messages.tfplugin5.Configure.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Configure.Response__Output) => void): grpc.ClientUnaryCall;
      configure(argument: messages.tfplugin5.Configure.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Configure.Response__Output) => void): grpc.ClientUnaryCall;
      
      GetSchema(argument: messages.tfplugin5.GetProviderSchema.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProviderSchema.Response__Output) => void): grpc.ClientUnaryCall;
      GetSchema(argument: messages.tfplugin5.GetProviderSchema.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProviderSchema.Response__Output) => void): grpc.ClientUnaryCall;
      GetSchema(argument: messages.tfplugin5.GetProviderSchema.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProviderSchema.Response__Output) => void): grpc.ClientUnaryCall;
      GetSchema(argument: messages.tfplugin5.GetProviderSchema.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProviderSchema.Response__Output) => void): grpc.ClientUnaryCall;
      getSchema(argument: messages.tfplugin5.GetProviderSchema.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProviderSchema.Response__Output) => void): grpc.ClientUnaryCall;
      getSchema(argument: messages.tfplugin5.GetProviderSchema.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProviderSchema.Response__Output) => void): grpc.ClientUnaryCall;
      getSchema(argument: messages.tfplugin5.GetProviderSchema.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProviderSchema.Response__Output) => void): grpc.ClientUnaryCall;
      getSchema(argument: messages.tfplugin5.GetProviderSchema.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProviderSchema.Response__Output) => void): grpc.ClientUnaryCall;
      
      ImportResourceState(argument: messages.tfplugin5.ImportResourceState.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ImportResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      ImportResourceState(argument: messages.tfplugin5.ImportResourceState.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ImportResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      ImportResourceState(argument: messages.tfplugin5.ImportResourceState.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ImportResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      ImportResourceState(argument: messages.tfplugin5.ImportResourceState.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ImportResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      importResourceState(argument: messages.tfplugin5.ImportResourceState.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ImportResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      importResourceState(argument: messages.tfplugin5.ImportResourceState.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ImportResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      importResourceState(argument: messages.tfplugin5.ImportResourceState.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ImportResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      importResourceState(argument: messages.tfplugin5.ImportResourceState.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ImportResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      
      PlanResourceChange(argument: messages.tfplugin5.PlanResourceChange.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PlanResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      PlanResourceChange(argument: messages.tfplugin5.PlanResourceChange.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PlanResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      PlanResourceChange(argument: messages.tfplugin5.PlanResourceChange.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PlanResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      PlanResourceChange(argument: messages.tfplugin5.PlanResourceChange.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PlanResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      planResourceChange(argument: messages.tfplugin5.PlanResourceChange.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PlanResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      planResourceChange(argument: messages.tfplugin5.PlanResourceChange.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PlanResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      planResourceChange(argument: messages.tfplugin5.PlanResourceChange.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PlanResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      planResourceChange(argument: messages.tfplugin5.PlanResourceChange.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PlanResourceChange.Response__Output) => void): grpc.ClientUnaryCall;
      
      PrepareProviderConfig(argument: messages.tfplugin5.PrepareProviderConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PrepareProviderConfig.Response__Output) => void): grpc.ClientUnaryCall;
      PrepareProviderConfig(argument: messages.tfplugin5.PrepareProviderConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PrepareProviderConfig.Response__Output) => void): grpc.ClientUnaryCall;
      PrepareProviderConfig(argument: messages.tfplugin5.PrepareProviderConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PrepareProviderConfig.Response__Output) => void): grpc.ClientUnaryCall;
      PrepareProviderConfig(argument: messages.tfplugin5.PrepareProviderConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PrepareProviderConfig.Response__Output) => void): grpc.ClientUnaryCall;
      prepareProviderConfig(argument: messages.tfplugin5.PrepareProviderConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PrepareProviderConfig.Response__Output) => void): grpc.ClientUnaryCall;
      prepareProviderConfig(argument: messages.tfplugin5.PrepareProviderConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PrepareProviderConfig.Response__Output) => void): grpc.ClientUnaryCall;
      prepareProviderConfig(argument: messages.tfplugin5.PrepareProviderConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PrepareProviderConfig.Response__Output) => void): grpc.ClientUnaryCall;
      prepareProviderConfig(argument: messages.tfplugin5.PrepareProviderConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.PrepareProviderConfig.Response__Output) => void): grpc.ClientUnaryCall;
      
      ReadDataSource(argument: messages.tfplugin5.ReadDataSource.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadDataSource.Response__Output) => void): grpc.ClientUnaryCall;
      ReadDataSource(argument: messages.tfplugin5.ReadDataSource.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadDataSource.Response__Output) => void): grpc.ClientUnaryCall;
      ReadDataSource(argument: messages.tfplugin5.ReadDataSource.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadDataSource.Response__Output) => void): grpc.ClientUnaryCall;
      ReadDataSource(argument: messages.tfplugin5.ReadDataSource.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadDataSource.Response__Output) => void): grpc.ClientUnaryCall;
      readDataSource(argument: messages.tfplugin5.ReadDataSource.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadDataSource.Response__Output) => void): grpc.ClientUnaryCall;
      readDataSource(argument: messages.tfplugin5.ReadDataSource.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadDataSource.Response__Output) => void): grpc.ClientUnaryCall;
      readDataSource(argument: messages.tfplugin5.ReadDataSource.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadDataSource.Response__Output) => void): grpc.ClientUnaryCall;
      readDataSource(argument: messages.tfplugin5.ReadDataSource.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadDataSource.Response__Output) => void): grpc.ClientUnaryCall;
      
      ReadResource(argument: messages.tfplugin5.ReadResource.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadResource.Response__Output) => void): grpc.ClientUnaryCall;
      ReadResource(argument: messages.tfplugin5.ReadResource.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadResource.Response__Output) => void): grpc.ClientUnaryCall;
      ReadResource(argument: messages.tfplugin5.ReadResource.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadResource.Response__Output) => void): grpc.ClientUnaryCall;
      ReadResource(argument: messages.tfplugin5.ReadResource.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadResource.Response__Output) => void): grpc.ClientUnaryCall;
      readResource(argument: messages.tfplugin5.ReadResource.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadResource.Response__Output) => void): grpc.ClientUnaryCall;
      readResource(argument: messages.tfplugin5.ReadResource.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadResource.Response__Output) => void): grpc.ClientUnaryCall;
      readResource(argument: messages.tfplugin5.ReadResource.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadResource.Response__Output) => void): grpc.ClientUnaryCall;
      readResource(argument: messages.tfplugin5.ReadResource.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ReadResource.Response__Output) => void): grpc.ClientUnaryCall;
      
      Stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      Stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      Stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      Stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      
      UpgradeResourceState(argument: messages.tfplugin5.UpgradeResourceState.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.UpgradeResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      UpgradeResourceState(argument: messages.tfplugin5.UpgradeResourceState.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.UpgradeResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      UpgradeResourceState(argument: messages.tfplugin5.UpgradeResourceState.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.UpgradeResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      UpgradeResourceState(argument: messages.tfplugin5.UpgradeResourceState.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.UpgradeResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      upgradeResourceState(argument: messages.tfplugin5.UpgradeResourceState.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.UpgradeResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      upgradeResourceState(argument: messages.tfplugin5.UpgradeResourceState.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.UpgradeResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      upgradeResourceState(argument: messages.tfplugin5.UpgradeResourceState.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.UpgradeResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      upgradeResourceState(argument: messages.tfplugin5.UpgradeResourceState.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.UpgradeResourceState.Response__Output) => void): grpc.ClientUnaryCall;
      
      ValidateDataSourceConfig(argument: messages.tfplugin5.ValidateDataSourceConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateDataSourceConfig.Response__Output) => void): grpc.ClientUnaryCall;
      ValidateDataSourceConfig(argument: messages.tfplugin5.ValidateDataSourceConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateDataSourceConfig.Response__Output) => void): grpc.ClientUnaryCall;
      ValidateDataSourceConfig(argument: messages.tfplugin5.ValidateDataSourceConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateDataSourceConfig.Response__Output) => void): grpc.ClientUnaryCall;
      ValidateDataSourceConfig(argument: messages.tfplugin5.ValidateDataSourceConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateDataSourceConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateDataSourceConfig(argument: messages.tfplugin5.ValidateDataSourceConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateDataSourceConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateDataSourceConfig(argument: messages.tfplugin5.ValidateDataSourceConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateDataSourceConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateDataSourceConfig(argument: messages.tfplugin5.ValidateDataSourceConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateDataSourceConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateDataSourceConfig(argument: messages.tfplugin5.ValidateDataSourceConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateDataSourceConfig.Response__Output) => void): grpc.ClientUnaryCall;
      
      ValidateResourceTypeConfig(argument: messages.tfplugin5.ValidateResourceTypeConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateResourceTypeConfig.Response__Output) => void): grpc.ClientUnaryCall;
      ValidateResourceTypeConfig(argument: messages.tfplugin5.ValidateResourceTypeConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateResourceTypeConfig.Response__Output) => void): grpc.ClientUnaryCall;
      ValidateResourceTypeConfig(argument: messages.tfplugin5.ValidateResourceTypeConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateResourceTypeConfig.Response__Output) => void): grpc.ClientUnaryCall;
      ValidateResourceTypeConfig(argument: messages.tfplugin5.ValidateResourceTypeConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateResourceTypeConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateResourceTypeConfig(argument: messages.tfplugin5.ValidateResourceTypeConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateResourceTypeConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateResourceTypeConfig(argument: messages.tfplugin5.ValidateResourceTypeConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateResourceTypeConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateResourceTypeConfig(argument: messages.tfplugin5.ValidateResourceTypeConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateResourceTypeConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateResourceTypeConfig(argument: messages.tfplugin5.ValidateResourceTypeConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateResourceTypeConfig.Response__Output) => void): grpc.ClientUnaryCall;
      
    }
    export namespace ProvisionResource {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export interface ProvisionerClient extends grpc.Client {
      GetSchema(argument: messages.tfplugin5.GetProvisionerSchema.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProvisionerSchema.Response__Output) => void): grpc.ClientUnaryCall;
      GetSchema(argument: messages.tfplugin5.GetProvisionerSchema.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProvisionerSchema.Response__Output) => void): grpc.ClientUnaryCall;
      GetSchema(argument: messages.tfplugin5.GetProvisionerSchema.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProvisionerSchema.Response__Output) => void): grpc.ClientUnaryCall;
      GetSchema(argument: messages.tfplugin5.GetProvisionerSchema.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProvisionerSchema.Response__Output) => void): grpc.ClientUnaryCall;
      getSchema(argument: messages.tfplugin5.GetProvisionerSchema.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProvisionerSchema.Response__Output) => void): grpc.ClientUnaryCall;
      getSchema(argument: messages.tfplugin5.GetProvisionerSchema.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProvisionerSchema.Response__Output) => void): grpc.ClientUnaryCall;
      getSchema(argument: messages.tfplugin5.GetProvisionerSchema.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProvisionerSchema.Response__Output) => void): grpc.ClientUnaryCall;
      getSchema(argument: messages.tfplugin5.GetProvisionerSchema.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.GetProvisionerSchema.Response__Output) => void): grpc.ClientUnaryCall;
      
      ProvisionResource(argument: messages.tfplugin5.ProvisionResource.Request, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<messages.tfplugin5.ProvisionResource.Response__Output>;
      ProvisionResource(argument: messages.tfplugin5.ProvisionResource.Request, options?: grpc.CallOptions): grpc.ClientReadableStream<messages.tfplugin5.ProvisionResource.Response__Output>;
      provisionResource(argument: messages.tfplugin5.ProvisionResource.Request, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<messages.tfplugin5.ProvisionResource.Response__Output>;
      provisionResource(argument: messages.tfplugin5.ProvisionResource.Request, options?: grpc.CallOptions): grpc.ClientReadableStream<messages.tfplugin5.ProvisionResource.Response__Output>;
      
      Stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      Stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      Stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      Stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      stop(argument: messages.tfplugin5.Stop.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.Stop.Response__Output) => void): grpc.ClientUnaryCall;
      
      ValidateProvisionerConfig(argument: messages.tfplugin5.ValidateProvisionerConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateProvisionerConfig.Response__Output) => void): grpc.ClientUnaryCall;
      ValidateProvisionerConfig(argument: messages.tfplugin5.ValidateProvisionerConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateProvisionerConfig.Response__Output) => void): grpc.ClientUnaryCall;
      ValidateProvisionerConfig(argument: messages.tfplugin5.ValidateProvisionerConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateProvisionerConfig.Response__Output) => void): grpc.ClientUnaryCall;
      ValidateProvisionerConfig(argument: messages.tfplugin5.ValidateProvisionerConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateProvisionerConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateProvisionerConfig(argument: messages.tfplugin5.ValidateProvisionerConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateProvisionerConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateProvisionerConfig(argument: messages.tfplugin5.ValidateProvisionerConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateProvisionerConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateProvisionerConfig(argument: messages.tfplugin5.ValidateProvisionerConfig.Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateProvisionerConfig.Response__Output) => void): grpc.ClientUnaryCall;
      validateProvisionerConfig(argument: messages.tfplugin5.ValidateProvisionerConfig.Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.tfplugin5.ValidateProvisionerConfig.Response__Output) => void): grpc.ClientUnaryCall;
      
    }
    export namespace RawState {
    }
    export namespace ReadDataSource {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace ReadResource {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace Schema {
      export namespace Attribute {
      }
      export namespace Block {
      }
      export namespace NestedBlock {
      }
    }
    export namespace Stop {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace UpgradeResourceState {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace ValidateDataSourceConfig {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace ValidateProvisionerConfig {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace ValidateResourceTypeConfig {
      export namespace Request {
      }
      export namespace Response {
      }
    }
  }
}

type ConstructorArguments<Constructor> = Constructor extends new (...args: infer Args) => any ? Args: never;
type SubtypeConstructor<Constructor, Subtype> = {
  new(...args: ConstructorArguments<Constructor>): Subtype;
}

export interface ProtoGrpcType {
  tfplugin5: {
    ApplyResourceChange: MessageTypeDefinition
    AttributePath: MessageTypeDefinition
    Configure: MessageTypeDefinition
    Diagnostic: MessageTypeDefinition
    DynamicValue: MessageTypeDefinition
    GetProviderSchema: MessageTypeDefinition
    GetProvisionerSchema: MessageTypeDefinition
    ImportResourceState: MessageTypeDefinition
    PlanResourceChange: MessageTypeDefinition
    PrepareProviderConfig: MessageTypeDefinition
    Provider: SubtypeConstructor<typeof grpc.Client, ClientInterfaces.tfplugin5.ProviderClient> & { service: ServiceDefinition }
    ProvisionResource: MessageTypeDefinition
    Provisioner: SubtypeConstructor<typeof grpc.Client, ClientInterfaces.tfplugin5.ProvisionerClient> & { service: ServiceDefinition }
    RawState: MessageTypeDefinition
    ReadDataSource: MessageTypeDefinition
    ReadResource: MessageTypeDefinition
    Schema: MessageTypeDefinition
    Stop: MessageTypeDefinition
    StringKind: EnumTypeDefinition
    UpgradeResourceState: MessageTypeDefinition
    ValidateDataSourceConfig: MessageTypeDefinition
    ValidateProvisionerConfig: MessageTypeDefinition
    ValidateResourceTypeConfig: MessageTypeDefinition
  }
}

export namespace ServiceHandlers {
  export namespace tfplugin5 {
    export namespace ApplyResourceChange {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace AttributePath {
      export namespace Step {
      }
    }
    export namespace Configure {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace Diagnostic {
    }
    export namespace DynamicValue {
    }
    export namespace GetProviderSchema {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace GetProvisionerSchema {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace ImportResourceState {
      export namespace ImportedResource {
      }
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace PlanResourceChange {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace PrepareProviderConfig {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export interface Provider {
      ApplyResourceChange(call: grpc.ServerUnaryCall<messages.tfplugin5.ApplyResourceChange.Request__Output, messages.tfplugin5.ApplyResourceChange.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.ApplyResourceChange.Response>): void;
      
      Configure(call: grpc.ServerUnaryCall<messages.tfplugin5.Configure.Request__Output, messages.tfplugin5.Configure.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.Configure.Response>): void;
      
      GetSchema(call: grpc.ServerUnaryCall<messages.tfplugin5.GetProviderSchema.Request__Output, messages.tfplugin5.GetProviderSchema.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.GetProviderSchema.Response>): void;
      
      ImportResourceState(call: grpc.ServerUnaryCall<messages.tfplugin5.ImportResourceState.Request__Output, messages.tfplugin5.ImportResourceState.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.ImportResourceState.Response>): void;
      
      PlanResourceChange(call: grpc.ServerUnaryCall<messages.tfplugin5.PlanResourceChange.Request__Output, messages.tfplugin5.PlanResourceChange.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.PlanResourceChange.Response>): void;
      
      PrepareProviderConfig(call: grpc.ServerUnaryCall<messages.tfplugin5.PrepareProviderConfig.Request__Output, messages.tfplugin5.PrepareProviderConfig.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.PrepareProviderConfig.Response>): void;
      
      ReadDataSource(call: grpc.ServerUnaryCall<messages.tfplugin5.ReadDataSource.Request__Output, messages.tfplugin5.ReadDataSource.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.ReadDataSource.Response>): void;
      
      ReadResource(call: grpc.ServerUnaryCall<messages.tfplugin5.ReadResource.Request__Output, messages.tfplugin5.ReadResource.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.ReadResource.Response>): void;
      
      Stop(call: grpc.ServerUnaryCall<messages.tfplugin5.Stop.Request__Output, messages.tfplugin5.Stop.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.Stop.Response>): void;
      
      UpgradeResourceState(call: grpc.ServerUnaryCall<messages.tfplugin5.UpgradeResourceState.Request__Output, messages.tfplugin5.UpgradeResourceState.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.UpgradeResourceState.Response>): void;
      
      ValidateDataSourceConfig(call: grpc.ServerUnaryCall<messages.tfplugin5.ValidateDataSourceConfig.Request__Output, messages.tfplugin5.ValidateDataSourceConfig.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.ValidateDataSourceConfig.Response>): void;
      
      ValidateResourceTypeConfig(call: grpc.ServerUnaryCall<messages.tfplugin5.ValidateResourceTypeConfig.Request__Output, messages.tfplugin5.ValidateResourceTypeConfig.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.ValidateResourceTypeConfig.Response>): void;
      
    }
    export namespace ProvisionResource {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export interface Provisioner {
      GetSchema(call: grpc.ServerUnaryCall<messages.tfplugin5.GetProvisionerSchema.Request__Output, messages.tfplugin5.GetProvisionerSchema.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.GetProvisionerSchema.Response>): void;
      
      ProvisionResource(call: grpc.ServerWritableStream<messages.tfplugin5.ProvisionResource.Request__Output, messages.tfplugin5.ProvisionResource.Response>): void;
      
      Stop(call: grpc.ServerUnaryCall<messages.tfplugin5.Stop.Request__Output, messages.tfplugin5.Stop.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.Stop.Response>): void;
      
      ValidateProvisionerConfig(call: grpc.ServerUnaryCall<messages.tfplugin5.ValidateProvisionerConfig.Request__Output, messages.tfplugin5.ValidateProvisionerConfig.Response>, callback: grpc.sendUnaryData<messages.tfplugin5.ValidateProvisionerConfig.Response>): void;
      
    }
    export namespace RawState {
    }
    export namespace ReadDataSource {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace ReadResource {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace Schema {
      export namespace Attribute {
      }
      export namespace Block {
      }
      export namespace NestedBlock {
      }
    }
    export namespace Stop {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace UpgradeResourceState {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace ValidateDataSourceConfig {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace ValidateProvisionerConfig {
      export namespace Request {
      }
      export namespace Response {
      }
    }
    export namespace ValidateResourceTypeConfig {
      export namespace Request {
      }
      export namespace Response {
      }
    }
  }
}
