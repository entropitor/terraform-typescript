// Original file: src/proto/grpc_stdio.proto

// Original file: src/proto/grpc_stdio.proto

export enum _plugin_StdioData_Channel {
  INVALID = 0,
  STDOUT = 1,
  STDERR = 2,
}

export interface StdioData {
  channel?: _plugin_StdioData_Channel | keyof typeof _plugin_StdioData_Channel;
  data?: Buffer | Uint8Array | string;
}

export interface StdioData__Output {
  channel?: _plugin_StdioData_Channel;
  data?: Buffer;
}
