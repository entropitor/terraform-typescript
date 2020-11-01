import * as grpc from "@grpc/grpc-js";
import {
  ServiceDefinition,
  EnumTypeDefinition,
  MessageTypeDefinition,
} from "@grpc/proto-loader";

import {
  ApplyResourceChange as _tfplugin5_ApplyResourceChange,
  ApplyResourceChange__Output as _tfplugin5_ApplyResourceChange__Output,
  _tfplugin5_ApplyResourceChange_Request,
  _tfplugin5_ApplyResourceChange_Request__Output,
  _tfplugin5_ApplyResourceChange_Response,
  _tfplugin5_ApplyResourceChange_Response__Output,
} from "./generated/tfplugin5/ApplyResourceChange";
import {
  AttributePath as _tfplugin5_AttributePath,
  AttributePath__Output as _tfplugin5_AttributePath__Output,
} from "./generated/tfplugin5/AttributePath";
import {
  Configure as _tfplugin5_Configure,
  Configure__Output as _tfplugin5_Configure__Output,
  _tfplugin5_Configure_Request,
  _tfplugin5_Configure_Request__Output,
  _tfplugin5_Configure_Response,
  _tfplugin5_Configure_Response__Output,
} from "./generated/tfplugin5/Configure";
import {
  Diagnostic as _tfplugin5_Diagnostic,
  Diagnostic__Output as _tfplugin5_Diagnostic__Output,
} from "./generated/tfplugin5/Diagnostic";
import {
  DynamicValue as _tfplugin5_DynamicValue,
  DynamicValue__Output as _tfplugin5_DynamicValue__Output,
} from "./generated/tfplugin5/DynamicValue";
import {
  GetProviderSchema as _tfplugin5_GetProviderSchema,
  GetProviderSchema__Output as _tfplugin5_GetProviderSchema__Output,
  _tfplugin5_GetProviderSchema_Request,
  _tfplugin5_GetProviderSchema_Request__Output,
  _tfplugin5_GetProviderSchema_Response,
  _tfplugin5_GetProviderSchema_Response__Output,
} from "./generated/tfplugin5/GetProviderSchema";
import {
  GetProvisionerSchema as _tfplugin5_GetProvisionerSchema,
  GetProvisionerSchema__Output as _tfplugin5_GetProvisionerSchema__Output,
  _tfplugin5_GetProvisionerSchema_Request,
  _tfplugin5_GetProvisionerSchema_Request__Output,
  _tfplugin5_GetProvisionerSchema_Response,
  _tfplugin5_GetProvisionerSchema_Response__Output,
} from "./generated/tfplugin5/GetProvisionerSchema";
import {
  ImportResourceState as _tfplugin5_ImportResourceState,
  ImportResourceState__Output as _tfplugin5_ImportResourceState__Output,
  _tfplugin5_ImportResourceState_Request,
  _tfplugin5_ImportResourceState_Request__Output,
  _tfplugin5_ImportResourceState_Response,
  _tfplugin5_ImportResourceState_Response__Output,
} from "./generated/tfplugin5/ImportResourceState";
import {
  PlanResourceChange as _tfplugin5_PlanResourceChange,
  PlanResourceChange__Output as _tfplugin5_PlanResourceChange__Output,
  _tfplugin5_PlanResourceChange_Request,
  _tfplugin5_PlanResourceChange_Request__Output,
  _tfplugin5_PlanResourceChange_Response,
  _tfplugin5_PlanResourceChange_Response__Output,
} from "./generated/tfplugin5/PlanResourceChange";
import {
  PrepareProviderConfig as _tfplugin5_PrepareProviderConfig,
  PrepareProviderConfig__Output as _tfplugin5_PrepareProviderConfig__Output,
  _tfplugin5_PrepareProviderConfig_Request,
  _tfplugin5_PrepareProviderConfig_Request__Output,
  _tfplugin5_PrepareProviderConfig_Response,
  _tfplugin5_PrepareProviderConfig_Response__Output,
} from "./generated/tfplugin5/PrepareProviderConfig";
import {
  ProvisionResource as _tfplugin5_ProvisionResource,
  ProvisionResource__Output as _tfplugin5_ProvisionResource__Output,
  _tfplugin5_ProvisionResource_Request,
  _tfplugin5_ProvisionResource_Request__Output,
  _tfplugin5_ProvisionResource_Response,
  _tfplugin5_ProvisionResource_Response__Output,
} from "./generated/tfplugin5/ProvisionResource";
import {
  RawState as _tfplugin5_RawState,
  RawState__Output as _tfplugin5_RawState__Output,
} from "./generated/tfplugin5/RawState";
import {
  ReadDataSource as _tfplugin5_ReadDataSource,
  ReadDataSource__Output as _tfplugin5_ReadDataSource__Output,
  _tfplugin5_ReadDataSource_Request,
  _tfplugin5_ReadDataSource_Request__Output,
  _tfplugin5_ReadDataSource_Response,
  _tfplugin5_ReadDataSource_Response__Output,
} from "./generated/tfplugin5/ReadDataSource";
import {
  ReadResource as _tfplugin5_ReadResource,
  ReadResource__Output as _tfplugin5_ReadResource__Output,
  _tfplugin5_ReadResource_Request,
  _tfplugin5_ReadResource_Request__Output,
  _tfplugin5_ReadResource_Response,
  _tfplugin5_ReadResource_Response__Output,
} from "./generated/tfplugin5/ReadResource";
import {
  Schema as _tfplugin5_Schema,
  Schema__Output as _tfplugin5_Schema__Output,
} from "./generated/tfplugin5/Schema";
import {
  Stop as _tfplugin5_Stop,
  Stop__Output as _tfplugin5_Stop__Output,
  _tfplugin5_Stop_Request,
  _tfplugin5_Stop_Request__Output,
  _tfplugin5_Stop_Response,
  _tfplugin5_Stop_Response__Output,
} from "./generated/tfplugin5/Stop";
import { StringKind as _tfplugin5_StringKind } from "./generated/tfplugin5/StringKind";
import {
  UpgradeResourceState as _tfplugin5_UpgradeResourceState,
  UpgradeResourceState__Output as _tfplugin5_UpgradeResourceState__Output,
  _tfplugin5_UpgradeResourceState_Request,
  _tfplugin5_UpgradeResourceState_Request__Output,
  _tfplugin5_UpgradeResourceState_Response,
  _tfplugin5_UpgradeResourceState_Response__Output,
} from "./generated/tfplugin5/UpgradeResourceState";
import {
  ValidateDataSourceConfig as _tfplugin5_ValidateDataSourceConfig,
  ValidateDataSourceConfig__Output as _tfplugin5_ValidateDataSourceConfig__Output,
  _tfplugin5_ValidateDataSourceConfig_Request,
  _tfplugin5_ValidateDataSourceConfig_Request__Output,
  _tfplugin5_ValidateDataSourceConfig_Response,
  _tfplugin5_ValidateDataSourceConfig_Response__Output,
} from "./generated/tfplugin5/ValidateDataSourceConfig";
import {
  ValidateProvisionerConfig as _tfplugin5_ValidateProvisionerConfig,
  ValidateProvisionerConfig__Output as _tfplugin5_ValidateProvisionerConfig__Output,
  _tfplugin5_ValidateProvisionerConfig_Request,
  _tfplugin5_ValidateProvisionerConfig_Request__Output,
  _tfplugin5_ValidateProvisionerConfig_Response,
  _tfplugin5_ValidateProvisionerConfig_Response__Output,
} from "./generated/tfplugin5/ValidateProvisionerConfig";
import {
  ValidateResourceTypeConfig as _tfplugin5_ValidateResourceTypeConfig,
  ValidateResourceTypeConfig__Output as _tfplugin5_ValidateResourceTypeConfig__Output,
  _tfplugin5_ValidateResourceTypeConfig_Request,
  _tfplugin5_ValidateResourceTypeConfig_Request__Output,
  _tfplugin5_ValidateResourceTypeConfig_Response,
  _tfplugin5_ValidateResourceTypeConfig_Response__Output,
} from "./generated/tfplugin5/ValidateResourceTypeConfig";

export namespace messages {
  export namespace tfplugin5 {
    export type ApplyResourceChange = _tfplugin5_ApplyResourceChange;
    export type ApplyResourceChange__Output = _tfplugin5_ApplyResourceChange__Output;
    export namespace ApplyResourceChange {
      export type Request = _tfplugin5_ApplyResourceChange_Request;
      export type Request__Output = _tfplugin5_ApplyResourceChange_Request__Output;
      export type Response = _tfplugin5_ApplyResourceChange_Response;
      export type Response__Output = _tfplugin5_ApplyResourceChange_Response__Output;
    }
    export type AttributePath = _tfplugin5_AttributePath;
    export type AttributePath__Output = _tfplugin5_AttributePath__Output;
    export type Configure = _tfplugin5_Configure;
    export type Configure__Output = _tfplugin5_Configure__Output;
    export namespace Configure {
      export type Request = _tfplugin5_Configure_Request;
      export type Request__Output = _tfplugin5_Configure_Request__Output;
      export type Response = _tfplugin5_Configure_Response;
      export type Response__Output = _tfplugin5_Configure_Response__Output;
    }
    export type Diagnostic = _tfplugin5_Diagnostic;
    export type Diagnostic__Output = _tfplugin5_Diagnostic__Output;
    export type DynamicValue = _tfplugin5_DynamicValue;
    export type DynamicValue__Output = _tfplugin5_DynamicValue__Output;
    export type GetProviderSchema = _tfplugin5_GetProviderSchema;
    export type GetProviderSchema__Output = _tfplugin5_GetProviderSchema__Output;
    export namespace GetProviderSchema {
      export type Request = _tfplugin5_GetProviderSchema_Request;
      export type Request__Output = _tfplugin5_GetProviderSchema_Request__Output;
      export type Response = _tfplugin5_GetProviderSchema_Response;
      export type Response__Output = _tfplugin5_GetProviderSchema_Response__Output;
    }
    export type GetProvisionerSchema = _tfplugin5_GetProvisionerSchema;
    export type GetProvisionerSchema__Output = _tfplugin5_GetProvisionerSchema__Output;
    export namespace GetProvisionerSchema {
      export type Request = _tfplugin5_GetProvisionerSchema_Request;
      export type Request__Output = _tfplugin5_GetProvisionerSchema_Request__Output;
      export type Response = _tfplugin5_GetProvisionerSchema_Response;
      export type Response__Output = _tfplugin5_GetProvisionerSchema_Response__Output;
    }
    export type ImportResourceState = _tfplugin5_ImportResourceState;
    export type ImportResourceState__Output = _tfplugin5_ImportResourceState__Output;
    export namespace ImportResourceState {
      export type Request = _tfplugin5_ImportResourceState_Request;
      export type Request__Output = _tfplugin5_ImportResourceState_Request__Output;
      export type Response = _tfplugin5_ImportResourceState_Response;
      export type Response__Output = _tfplugin5_ImportResourceState_Response__Output;
    }
    export type PlanResourceChange = _tfplugin5_PlanResourceChange;
    export type PlanResourceChange__Output = _tfplugin5_PlanResourceChange__Output;
    export namespace PlanResourceChange {
      export type Request = _tfplugin5_PlanResourceChange_Request;
      export type Request__Output = _tfplugin5_PlanResourceChange_Request__Output;
      export type Response = _tfplugin5_PlanResourceChange_Response;
      export type Response__Output = _tfplugin5_PlanResourceChange_Response__Output;
    }
    export type PrepareProviderConfig = _tfplugin5_PrepareProviderConfig;
    export type PrepareProviderConfig__Output = _tfplugin5_PrepareProviderConfig__Output;
    export namespace PrepareProviderConfig {
      export type Request = _tfplugin5_PrepareProviderConfig_Request;
      export type Request__Output = _tfplugin5_PrepareProviderConfig_Request__Output;
      export type Response = _tfplugin5_PrepareProviderConfig_Response;
      export type Response__Output = _tfplugin5_PrepareProviderConfig_Response__Output;
    }
    export namespace Provider {}
    export type ProvisionResource = _tfplugin5_ProvisionResource;
    export type ProvisionResource__Output = _tfplugin5_ProvisionResource__Output;
    export namespace ProvisionResource {
      export type Request = _tfplugin5_ProvisionResource_Request;
      export type Request__Output = _tfplugin5_ProvisionResource_Request__Output;
      export type Response = _tfplugin5_ProvisionResource_Response;
      export type Response__Output = _tfplugin5_ProvisionResource_Response__Output;
    }
    export namespace Provisioner {}
    export type RawState = _tfplugin5_RawState;
    export type RawState__Output = _tfplugin5_RawState__Output;
    export type ReadDataSource = _tfplugin5_ReadDataSource;
    export type ReadDataSource__Output = _tfplugin5_ReadDataSource__Output;
    export namespace ReadDataSource {
      export type Request = _tfplugin5_ReadDataSource_Request;
      export type Request__Output = _tfplugin5_ReadDataSource_Request__Output;
      export type Response = _tfplugin5_ReadDataSource_Response;
      export type Response__Output = _tfplugin5_ReadDataSource_Response__Output;
    }
    export type ReadResource = _tfplugin5_ReadResource;
    export type ReadResource__Output = _tfplugin5_ReadResource__Output;
    export namespace ReadResource {
      export type Request = _tfplugin5_ReadResource_Request;
      export type Request__Output = _tfplugin5_ReadResource_Request__Output;
      export type Response = _tfplugin5_ReadResource_Response;
      export type Response__Output = _tfplugin5_ReadResource_Response__Output;
    }
    export type Schema = _tfplugin5_Schema;
    export type Schema__Output = _tfplugin5_Schema__Output;
    export type Stop = _tfplugin5_Stop;
    export type Stop__Output = _tfplugin5_Stop__Output;
    export namespace Stop {
      export type Request = _tfplugin5_Stop_Request;
      export type Request__Output = _tfplugin5_Stop_Request__Output;
      export type Response = _tfplugin5_Stop_Response;
      export type Response__Output = _tfplugin5_Stop_Response__Output;
    }
    export type StringKind = _tfplugin5_StringKind;
    export type UpgradeResourceState = _tfplugin5_UpgradeResourceState;
    export type UpgradeResourceState__Output = _tfplugin5_UpgradeResourceState__Output;
    export namespace UpgradeResourceState {
      export type Request = _tfplugin5_UpgradeResourceState_Request;
      export type Request__Output = _tfplugin5_UpgradeResourceState_Request__Output;
      export type Response = _tfplugin5_UpgradeResourceState_Response;
      export type Response__Output = _tfplugin5_UpgradeResourceState_Response__Output;
    }
    export type ValidateDataSourceConfig = _tfplugin5_ValidateDataSourceConfig;
    export type ValidateDataSourceConfig__Output = _tfplugin5_ValidateDataSourceConfig__Output;
    export namespace ValidateDataSourceConfig {
      export type Request = _tfplugin5_ValidateDataSourceConfig_Request;
      export type Request__Output = _tfplugin5_ValidateDataSourceConfig_Request__Output;
      export type Response = _tfplugin5_ValidateDataSourceConfig_Response;
      export type Response__Output = _tfplugin5_ValidateDataSourceConfig_Response__Output;
    }
    export type ValidateProvisionerConfig = _tfplugin5_ValidateProvisionerConfig;
    export type ValidateProvisionerConfig__Output = _tfplugin5_ValidateProvisionerConfig__Output;
    export namespace ValidateProvisionerConfig {
      export type Request = _tfplugin5_ValidateProvisionerConfig_Request;
      export type Request__Output = _tfplugin5_ValidateProvisionerConfig_Request__Output;
      export type Response = _tfplugin5_ValidateProvisionerConfig_Response;
      export type Response__Output = _tfplugin5_ValidateProvisionerConfig_Response__Output;
    }
    export type ValidateResourceTypeConfig = _tfplugin5_ValidateResourceTypeConfig;
    export type ValidateResourceTypeConfig__Output = _tfplugin5_ValidateResourceTypeConfig__Output;
    export namespace ValidateResourceTypeConfig {
      export type Request = _tfplugin5_ValidateResourceTypeConfig_Request;
      export type Request__Output = _tfplugin5_ValidateResourceTypeConfig_Request__Output;
      export type Response = _tfplugin5_ValidateResourceTypeConfig_Response;
      export type Response__Output = _tfplugin5_ValidateResourceTypeConfig_Response__Output;
    }
  }
}

export interface ProtoGrpcType {
  tfplugin5: {
    ApplyResourceChange: MessageTypeDefinition;
    AttributePath: MessageTypeDefinition;
    Configure: MessageTypeDefinition;
    Diagnostic: MessageTypeDefinition;
    DynamicValue: MessageTypeDefinition;
    GetProviderSchema: MessageTypeDefinition;
    GetProvisionerSchema: MessageTypeDefinition;
    ImportResourceState: MessageTypeDefinition;
    PlanResourceChange: MessageTypeDefinition;
    PrepareProviderConfig: MessageTypeDefinition;
    Provider: { service: ServiceDefinition };
    ProvisionResource: MessageTypeDefinition;
    Provisioner: { service: ServiceDefinition };
    RawState: MessageTypeDefinition;
    ReadDataSource: MessageTypeDefinition;
    ReadResource: MessageTypeDefinition;
    Schema: MessageTypeDefinition;
    Stop: MessageTypeDefinition;
    StringKind: EnumTypeDefinition;
    UpgradeResourceState: MessageTypeDefinition;
    ValidateDataSourceConfig: MessageTypeDefinition;
    ValidateProvisionerConfig: MessageTypeDefinition;
    ValidateResourceTypeConfig: MessageTypeDefinition;
  };
}

export namespace ServiceHandlers {
  export namespace tfplugin5 {
    export namespace ApplyResourceChange {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace AttributePath {
      export namespace Step {}
    }
    export namespace Configure {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace Diagnostic {}
    export namespace DynamicValue {}
    export namespace GetProviderSchema {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace GetProvisionerSchema {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace ImportResourceState {
      export namespace ImportedResource {}
      export namespace Request {}
      export namespace Response {}
    }
    export namespace PlanResourceChange {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace PrepareProviderConfig {
      export namespace Request {}
      export namespace Response {}
    }
    export interface Provider {
      ApplyResourceChange(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.ApplyResourceChange.Request__Output,
          messages.tfplugin5.ApplyResourceChange.Response
        >,
        callback: grpc.sendUnaryData<
          messages.tfplugin5.ApplyResourceChange.Response
        >
      ): void;

      Configure(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.Configure.Request__Output,
          messages.tfplugin5.Configure.Response
        >,
        callback: grpc.sendUnaryData<messages.tfplugin5.Configure.Response>
      ): void;

      GetSchema(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.GetProviderSchema.Request__Output,
          messages.tfplugin5.GetProviderSchema.Response
        >,
        callback: grpc.sendUnaryData<
          messages.tfplugin5.GetProviderSchema.Response
        >
      ): void;

      ImportResourceState(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.ImportResourceState.Request__Output,
          messages.tfplugin5.ImportResourceState.Response
        >,
        callback: grpc.sendUnaryData<
          messages.tfplugin5.ImportResourceState.Response
        >
      ): void;

      PlanResourceChange(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.PlanResourceChange.Request__Output,
          messages.tfplugin5.PlanResourceChange.Response
        >,
        callback: grpc.sendUnaryData<
          messages.tfplugin5.PlanResourceChange.Response
        >
      ): void;

      PrepareProviderConfig(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.PrepareProviderConfig.Request__Output,
          messages.tfplugin5.PrepareProviderConfig.Response
        >,
        callback: grpc.sendUnaryData<
          messages.tfplugin5.PrepareProviderConfig.Response
        >
      ): void;

      ReadDataSource(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.ReadDataSource.Request__Output,
          messages.tfplugin5.ReadDataSource.Response
        >,
        callback: grpc.sendUnaryData<messages.tfplugin5.ReadDataSource.Response>
      ): void;

      ReadResource(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.ReadResource.Request__Output,
          messages.tfplugin5.ReadResource.Response
        >,
        callback: grpc.sendUnaryData<messages.tfplugin5.ReadResource.Response>
      ): void;

      Stop(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.Stop.Request__Output,
          messages.tfplugin5.Stop.Response
        >,
        callback: grpc.sendUnaryData<messages.tfplugin5.Stop.Response>
      ): void;

      UpgradeResourceState(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.UpgradeResourceState.Request__Output,
          messages.tfplugin5.UpgradeResourceState.Response
        >,
        callback: grpc.sendUnaryData<
          messages.tfplugin5.UpgradeResourceState.Response
        >
      ): void;

      ValidateDataSourceConfig(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.ValidateDataSourceConfig.Request__Output,
          messages.tfplugin5.ValidateDataSourceConfig.Response
        >,
        callback: grpc.sendUnaryData<
          messages.tfplugin5.ValidateDataSourceConfig.Response
        >
      ): void;

      ValidateResourceTypeConfig(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.ValidateResourceTypeConfig.Request__Output,
          messages.tfplugin5.ValidateResourceTypeConfig.Response
        >,
        callback: grpc.sendUnaryData<
          messages.tfplugin5.ValidateResourceTypeConfig.Response
        >
      ): void;
    }
    export namespace ProvisionResource {
      export namespace Request {}
      export namespace Response {}
    }
    export interface Provisioner {
      GetSchema(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.GetProvisionerSchema.Request__Output,
          messages.tfplugin5.GetProvisionerSchema.Response
        >,
        callback: grpc.sendUnaryData<
          messages.tfplugin5.GetProvisionerSchema.Response
        >
      ): void;

      ProvisionResource(
        call: grpc.ServerWritableStream<
          messages.tfplugin5.ProvisionResource.Request__Output,
          messages.tfplugin5.ProvisionResource.Response
        >
      ): void;

      Stop(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.Stop.Request__Output,
          messages.tfplugin5.Stop.Response
        >,
        callback: grpc.sendUnaryData<messages.tfplugin5.Stop.Response>
      ): void;

      ValidateProvisionerConfig(
        call: grpc.ServerUnaryCall<
          messages.tfplugin5.ValidateProvisionerConfig.Request__Output,
          messages.tfplugin5.ValidateProvisionerConfig.Response
        >,
        callback: grpc.sendUnaryData<
          messages.tfplugin5.ValidateProvisionerConfig.Response
        >
      ): void;
    }
    export namespace RawState {}
    export namespace ReadDataSource {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace ReadResource {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace Schema {
      export namespace Attribute {}
      export namespace Block {}
      export namespace NestedBlock {}
    }
    export namespace Stop {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace UpgradeResourceState {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace ValidateDataSourceConfig {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace ValidateProvisionerConfig {
      export namespace Request {}
      export namespace Response {}
    }
    export namespace ValidateResourceTypeConfig {
      export namespace Request {}
      export namespace Response {}
    }
  }
}
