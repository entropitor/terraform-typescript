import * as grpc from '@grpc/grpc-js';
import { ServiceDefinition, EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from './google/protobuf/Empty';
import { StdioData as _plugin_StdioData, StdioData__Output as _plugin_StdioData__Output } from './plugin/StdioData';

export namespace messages {
  export namespace google {
    export namespace protobuf {
      export type Empty = _google_protobuf_Empty;
      export type Empty__Output = _google_protobuf_Empty__Output;
    }
  }
  export namespace plugin {
    export namespace GRPCStdio {
    }
    export type StdioData = _plugin_StdioData;
    export type StdioData__Output = _plugin_StdioData__Output;
  }
}

export namespace ClientInterfaces {
  export namespace google {
    export namespace protobuf {
      export namespace Empty {
      }
    }
  }
  export namespace plugin {
    export interface GRPCStdioClient extends grpc.Client {
      StreamStdio(argument: messages.google.protobuf.Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<messages.plugin.StdioData__Output>;
      StreamStdio(argument: messages.google.protobuf.Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<messages.plugin.StdioData__Output>;
      streamStdio(argument: messages.google.protobuf.Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<messages.plugin.StdioData__Output>;
      streamStdio(argument: messages.google.protobuf.Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<messages.plugin.StdioData__Output>;
      
    }
    export namespace StdioData {
    }
  }
}

type ConstructorArguments<Constructor> = Constructor extends new (...args: infer Args) => any ? Args: never;
type SubtypeConstructor<Constructor, Subtype> = {
  new(...args: ConstructorArguments<Constructor>): Subtype;
}

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
  plugin: {
    GRPCStdio: SubtypeConstructor<typeof grpc.Client, ClientInterfaces.plugin.GRPCStdioClient> & { service: ServiceDefinition }
    StdioData: MessageTypeDefinition
  }
}

export namespace ServiceHandlers {
  export namespace google {
    export namespace protobuf {
      export namespace Empty {
      }
    }
  }
  export namespace plugin {
    export interface GRPCStdio {
      StreamStdio(call: grpc.ServerWritableStream<messages.google.protobuf.Empty__Output, messages.plugin.StdioData>): void;
      
    }
    export namespace StdioData {
    }
  }
}
