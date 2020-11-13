import type * as grpc from '@grpc/grpc-js';
import type {
  ServiceDefinition,
  EnumTypeDefinition,
  MessageTypeDefinition,
} from '@grpc/proto-loader';

import type { ProviderClient as _tfplugin5_ProviderClient } from './tfplugin5/Provider';
import type { ProvisionerClient as _tfplugin5_ProvisionerClient } from './tfplugin5/Provisioner';

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

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
    Provider: SubtypeConstructor<
      typeof grpc.Client,
      _tfplugin5_ProviderClient
    > & { service: ServiceDefinition };
    ProvisionResource: MessageTypeDefinition;
    Provisioner: SubtypeConstructor<
      typeof grpc.Client,
      _tfplugin5_ProvisionerClient
    > & { service: ServiceDefinition };
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
