import type * as grpc from '@grpc/grpc-js';
import type {
  ServiceDefinition,
  EnumTypeDefinition,
  MessageTypeDefinition,
} from '@grpc/proto-loader';

import type { GRPCStdioClient as _plugin_GRPCStdioClient } from './plugin/GRPCStdio';

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Empty: MessageTypeDefinition;
    };
  };
  plugin: {
    GRPCStdio: SubtypeConstructor<
      typeof grpc.Client,
      _plugin_GRPCStdioClient
    > & { service: ServiceDefinition };
    StdioData: MessageTypeDefinition;
  };
}
