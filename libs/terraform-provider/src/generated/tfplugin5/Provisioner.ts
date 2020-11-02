// Original file: src/proto/tfplugin5.proto

import type * as grpc from '@grpc/grpc-js'
import type { _tfplugin5_GetProvisionerSchema_Request, _tfplugin5_GetProvisionerSchema_Request__Output } from '../tfplugin5/GetProvisionerSchema';
import type { _tfplugin5_ValidateProvisionerConfig_Request, _tfplugin5_ValidateProvisionerConfig_Request__Output } from '../tfplugin5/ValidateProvisionerConfig';
import type { _tfplugin5_ProvisionResource_Request, _tfplugin5_ProvisionResource_Request__Output } from '../tfplugin5/ProvisionResource';
import type { _tfplugin5_Stop_Request, _tfplugin5_Stop_Request__Output } from '../tfplugin5/Stop';
import type { _tfplugin5_GetProvisionerSchema_Response, _tfplugin5_GetProvisionerSchema_Response__Output } from '../tfplugin5/GetProvisionerSchema';
import type { _tfplugin5_ValidateProvisionerConfig_Response, _tfplugin5_ValidateProvisionerConfig_Response__Output } from '../tfplugin5/ValidateProvisionerConfig';
import type { _tfplugin5_ProvisionResource_Response, _tfplugin5_ProvisionResource_Response__Output } from '../tfplugin5/ProvisionResource';
import type { _tfplugin5_Stop_Response, _tfplugin5_Stop_Response__Output } from '../tfplugin5/Stop';

export interface ProvisionerClient extends grpc.Client {
  GetSchema(argument: _tfplugin5_GetProvisionerSchema_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_GetProvisionerSchema_Response__Output) => void): grpc.ClientUnaryCall;
  GetSchema(argument: _tfplugin5_GetProvisionerSchema_Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _tfplugin5_GetProvisionerSchema_Response__Output) => void): grpc.ClientUnaryCall;
  GetSchema(argument: _tfplugin5_GetProvisionerSchema_Request, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_GetProvisionerSchema_Response__Output) => void): grpc.ClientUnaryCall;
  GetSchema(argument: _tfplugin5_GetProvisionerSchema_Request, callback: (error?: grpc.ServiceError, result?: _tfplugin5_GetProvisionerSchema_Response__Output) => void): grpc.ClientUnaryCall;
  getSchema(argument: _tfplugin5_GetProvisionerSchema_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_GetProvisionerSchema_Response__Output) => void): grpc.ClientUnaryCall;
  getSchema(argument: _tfplugin5_GetProvisionerSchema_Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _tfplugin5_GetProvisionerSchema_Response__Output) => void): grpc.ClientUnaryCall;
  getSchema(argument: _tfplugin5_GetProvisionerSchema_Request, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_GetProvisionerSchema_Response__Output) => void): grpc.ClientUnaryCall;
  getSchema(argument: _tfplugin5_GetProvisionerSchema_Request, callback: (error?: grpc.ServiceError, result?: _tfplugin5_GetProvisionerSchema_Response__Output) => void): grpc.ClientUnaryCall;
  
  ProvisionResource(argument: _tfplugin5_ProvisionResource_Request, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_tfplugin5_ProvisionResource_Response__Output>;
  ProvisionResource(argument: _tfplugin5_ProvisionResource_Request, options?: grpc.CallOptions): grpc.ClientReadableStream<_tfplugin5_ProvisionResource_Response__Output>;
  provisionResource(argument: _tfplugin5_ProvisionResource_Request, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_tfplugin5_ProvisionResource_Response__Output>;
  provisionResource(argument: _tfplugin5_ProvisionResource_Request, options?: grpc.CallOptions): grpc.ClientReadableStream<_tfplugin5_ProvisionResource_Response__Output>;
  
  Stop(argument: _tfplugin5_Stop_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_Stop_Response__Output) => void): grpc.ClientUnaryCall;
  Stop(argument: _tfplugin5_Stop_Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _tfplugin5_Stop_Response__Output) => void): grpc.ClientUnaryCall;
  Stop(argument: _tfplugin5_Stop_Request, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_Stop_Response__Output) => void): grpc.ClientUnaryCall;
  Stop(argument: _tfplugin5_Stop_Request, callback: (error?: grpc.ServiceError, result?: _tfplugin5_Stop_Response__Output) => void): grpc.ClientUnaryCall;
  stop(argument: _tfplugin5_Stop_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_Stop_Response__Output) => void): grpc.ClientUnaryCall;
  stop(argument: _tfplugin5_Stop_Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _tfplugin5_Stop_Response__Output) => void): grpc.ClientUnaryCall;
  stop(argument: _tfplugin5_Stop_Request, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_Stop_Response__Output) => void): grpc.ClientUnaryCall;
  stop(argument: _tfplugin5_Stop_Request, callback: (error?: grpc.ServiceError, result?: _tfplugin5_Stop_Response__Output) => void): grpc.ClientUnaryCall;
  
  ValidateProvisionerConfig(argument: _tfplugin5_ValidateProvisionerConfig_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_ValidateProvisionerConfig_Response__Output) => void): grpc.ClientUnaryCall;
  ValidateProvisionerConfig(argument: _tfplugin5_ValidateProvisionerConfig_Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _tfplugin5_ValidateProvisionerConfig_Response__Output) => void): grpc.ClientUnaryCall;
  ValidateProvisionerConfig(argument: _tfplugin5_ValidateProvisionerConfig_Request, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_ValidateProvisionerConfig_Response__Output) => void): grpc.ClientUnaryCall;
  ValidateProvisionerConfig(argument: _tfplugin5_ValidateProvisionerConfig_Request, callback: (error?: grpc.ServiceError, result?: _tfplugin5_ValidateProvisionerConfig_Response__Output) => void): grpc.ClientUnaryCall;
  validateProvisionerConfig(argument: _tfplugin5_ValidateProvisionerConfig_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_ValidateProvisionerConfig_Response__Output) => void): grpc.ClientUnaryCall;
  validateProvisionerConfig(argument: _tfplugin5_ValidateProvisionerConfig_Request, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _tfplugin5_ValidateProvisionerConfig_Response__Output) => void): grpc.ClientUnaryCall;
  validateProvisionerConfig(argument: _tfplugin5_ValidateProvisionerConfig_Request, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _tfplugin5_ValidateProvisionerConfig_Response__Output) => void): grpc.ClientUnaryCall;
  validateProvisionerConfig(argument: _tfplugin5_ValidateProvisionerConfig_Request, callback: (error?: grpc.ServiceError, result?: _tfplugin5_ValidateProvisionerConfig_Response__Output) => void): grpc.ClientUnaryCall;
  
}

export interface ProvisionerHandlers extends grpc.UntypedServiceImplementation {
  GetSchema: grpc.handleUnaryCall<_tfplugin5_GetProvisionerSchema_Request__Output, _tfplugin5_GetProvisionerSchema_Response>;
  
  ProvisionResource: grpc.handleServerStreamingCall<_tfplugin5_ProvisionResource_Request__Output, _tfplugin5_ProvisionResource_Response>;
  
  Stop: grpc.handleUnaryCall<_tfplugin5_Stop_Request__Output, _tfplugin5_Stop_Response>;
  
  ValidateProvisionerConfig: grpc.handleUnaryCall<_tfplugin5_ValidateProvisionerConfig_Request__Output, _tfplugin5_ValidateProvisionerConfig_Response>;
  
}
