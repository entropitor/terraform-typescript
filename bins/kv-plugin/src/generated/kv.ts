import * as grpc from '@grpc/grpc-js';
import { ServiceDefinition, EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import { Empty as _proto_Empty, Empty__Output as _proto_Empty__Output } from './proto/Empty';
import { GetRequest as _proto_GetRequest, GetRequest__Output as _proto_GetRequest__Output } from './proto/GetRequest';
import { GetResponse as _proto_GetResponse, GetResponse__Output as _proto_GetResponse__Output } from './proto/GetResponse';
import { PutRequest as _proto_PutRequest, PutRequest__Output as _proto_PutRequest__Output } from './proto/PutRequest';

export namespace messages {
  export namespace proto {
    export type Empty = _proto_Empty;
    export type Empty__Output = _proto_Empty__Output;
    export type GetRequest = _proto_GetRequest;
    export type GetRequest__Output = _proto_GetRequest__Output;
    export type GetResponse = _proto_GetResponse;
    export type GetResponse__Output = _proto_GetResponse__Output;
    export namespace KV {
    }
    export type PutRequest = _proto_PutRequest;
    export type PutRequest__Output = _proto_PutRequest__Output;
  }
}

export namespace ClientInterfaces {
  export namespace proto {
    export namespace Empty {
    }
    export namespace GetRequest {
    }
    export namespace GetResponse {
    }
    export interface KVClient extends grpc.Client {
      Get(argument: messages.proto.GetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.proto.GetResponse__Output) => void): grpc.ClientUnaryCall;
      Get(argument: messages.proto.GetRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.proto.GetResponse__Output) => void): grpc.ClientUnaryCall;
      Get(argument: messages.proto.GetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.proto.GetResponse__Output) => void): grpc.ClientUnaryCall;
      Get(argument: messages.proto.GetRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.proto.GetResponse__Output) => void): grpc.ClientUnaryCall;
      get(argument: messages.proto.GetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.proto.GetResponse__Output) => void): grpc.ClientUnaryCall;
      get(argument: messages.proto.GetRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.proto.GetResponse__Output) => void): grpc.ClientUnaryCall;
      get(argument: messages.proto.GetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.proto.GetResponse__Output) => void): grpc.ClientUnaryCall;
      get(argument: messages.proto.GetRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.proto.GetResponse__Output) => void): grpc.ClientUnaryCall;
      
      Put(argument: messages.proto.PutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.proto.Empty__Output) => void): grpc.ClientUnaryCall;
      Put(argument: messages.proto.PutRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.proto.Empty__Output) => void): grpc.ClientUnaryCall;
      Put(argument: messages.proto.PutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.proto.Empty__Output) => void): grpc.ClientUnaryCall;
      Put(argument: messages.proto.PutRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.proto.Empty__Output) => void): grpc.ClientUnaryCall;
      put(argument: messages.proto.PutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.proto.Empty__Output) => void): grpc.ClientUnaryCall;
      put(argument: messages.proto.PutRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.proto.Empty__Output) => void): grpc.ClientUnaryCall;
      put(argument: messages.proto.PutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: messages.proto.Empty__Output) => void): grpc.ClientUnaryCall;
      put(argument: messages.proto.PutRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: messages.proto.Empty__Output) => void): grpc.ClientUnaryCall;
      
    }
    export namespace PutRequest {
    }
  }
}

type ConstructorArguments<Constructor> = Constructor extends new (...args: infer Args) => any ? Args: never;
type SubtypeConstructor<Constructor, Subtype> = {
  new(...args: ConstructorArguments<Constructor>): Subtype;
}

export interface ProtoGrpcType {
  proto: {
    Empty: MessageTypeDefinition
    GetRequest: MessageTypeDefinition
    GetResponse: MessageTypeDefinition
    KV: SubtypeConstructor<typeof grpc.Client, ClientInterfaces.proto.KVClient> & { service: ServiceDefinition }
    PutRequest: MessageTypeDefinition
  }
}

export namespace ServiceHandlers {
  export namespace proto {
    export namespace Empty {
    }
    export namespace GetRequest {
    }
    export namespace GetResponse {
    }
    export interface KV {
      Get(call: grpc.ServerUnaryCall<messages.proto.GetRequest__Output, messages.proto.GetResponse>, callback: grpc.sendUnaryData<messages.proto.GetResponse>): void;
      
      Put(call: grpc.ServerUnaryCall<messages.proto.PutRequest__Output, messages.proto.Empty>, callback: grpc.sendUnaryData<messages.proto.Empty>): void;
      
    }
    export namespace PutRequest {
    }
  }
}
