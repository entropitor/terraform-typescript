// Original file: src/proto/kv.proto

import type * as grpc from '@grpc/grpc-js';
import type {
  Empty as _proto_Empty,
  Empty__Output as _proto_Empty__Output,
} from '../proto/Empty';
import type {
  GetRequest as _proto_GetRequest,
  GetRequest__Output as _proto_GetRequest__Output,
} from '../proto/GetRequest';
import type {
  GetResponse as _proto_GetResponse,
  GetResponse__Output as _proto_GetResponse__Output,
} from '../proto/GetResponse';
import type {
  PutRequest as _proto_PutRequest,
  PutRequest__Output as _proto_PutRequest__Output,
} from '../proto/PutRequest';

export interface KVClient extends grpc.Client {
  Get(
    argument: _proto_GetRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_GetResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Get(
    argument: _proto_GetRequest,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_GetResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Get(
    argument: _proto_GetRequest,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_GetResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Get(
    argument: _proto_GetRequest,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_GetResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  get(
    argument: _proto_GetRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_GetResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  get(
    argument: _proto_GetRequest,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_GetResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  get(
    argument: _proto_GetRequest,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_GetResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  get(
    argument: _proto_GetRequest,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_GetResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;

  Put(
    argument: _proto_PutRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_Empty__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Put(
    argument: _proto_PutRequest,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_Empty__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Put(
    argument: _proto_PutRequest,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_Empty__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  Put(
    argument: _proto_PutRequest,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_Empty__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  put(
    argument: _proto_PutRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_Empty__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  put(
    argument: _proto_PutRequest,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_Empty__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  put(
    argument: _proto_PutRequest,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_Empty__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  put(
    argument: _proto_PutRequest,
    callback: (
      error?: grpc.ServiceError,
      result?: _proto_Empty__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
}

export interface KVHandlers extends grpc.UntypedServiceImplementation {
  Get: grpc.handleUnaryCall<_proto_GetRequest__Output, _proto_GetResponse>;

  Put: grpc.handleUnaryCall<_proto_PutRequest__Output, _proto_Empty>;
}
