// Original file: src/proto/grpc_stdio.proto

import type * as grpc from '@grpc/grpc-js';
import type {
  Empty as _google_protobuf_Empty,
  Empty__Output as _google_protobuf_Empty__Output,
} from '../google/protobuf/Empty';
import type {
  StdioData as _plugin_StdioData,
  StdioData__Output as _plugin_StdioData__Output,
} from '../plugin/StdioData';

export interface GRPCStdioClient extends grpc.Client {
  StreamStdio(
    argument: _google_protobuf_Empty,
    metadata: grpc.Metadata,
    options?: grpc.CallOptions,
  ): grpc.ClientReadableStream<_plugin_StdioData__Output>;
  StreamStdio(
    argument: _google_protobuf_Empty,
    options?: grpc.CallOptions,
  ): grpc.ClientReadableStream<_plugin_StdioData__Output>;
  streamStdio(
    argument: _google_protobuf_Empty,
    metadata: grpc.Metadata,
    options?: grpc.CallOptions,
  ): grpc.ClientReadableStream<_plugin_StdioData__Output>;
  streamStdio(
    argument: _google_protobuf_Empty,
    options?: grpc.CallOptions,
  ): grpc.ClientReadableStream<_plugin_StdioData__Output>;
}

export interface GRPCStdioHandlers extends grpc.UntypedServiceImplementation {
  StreamStdio: grpc.handleServerStreamingCall<
    _google_protobuf_Empty__Output,
    _plugin_StdioData
  >;
}
