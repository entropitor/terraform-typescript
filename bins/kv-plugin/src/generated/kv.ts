import type * as grpc from '@grpc/grpc-js';
import type {
  ServiceDefinition,
  EnumTypeDefinition,
  MessageTypeDefinition,
} from '@grpc/proto-loader';

import type { KVClient as _proto_KVClient } from './proto/KV';

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  proto: {
    Empty: MessageTypeDefinition;
    GetRequest: MessageTypeDefinition;
    GetResponse: MessageTypeDefinition;
    KV: SubtypeConstructor<typeof grpc.Client, _proto_KVClient> & {
      service: ServiceDefinition;
    };
    PutRequest: MessageTypeDefinition;
  };
}
