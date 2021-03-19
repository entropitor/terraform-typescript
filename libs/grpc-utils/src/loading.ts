import path from 'path';

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

type Proto<PackageName extends string, ServiceName extends string> = {
  [packageName in PackageName]: {
    [serviceName in ServiceName]: any;
  };
};
type PackageName<P> = P extends Proto<infer Name, any> ? Name : never;
type ServiceName<P, PN extends PackageName<P>> = P extends Proto<PN, infer Name>
  ? Name
  : never;

type LoadProtoArgs<
  ProtoGrpcType,
  ServiceHandlers,
  PN extends PackageName<ProtoGrpcType>
> = {
  dirname: string;
  fileName: string;
  implementation: ServiceHandlers;
  packageName: PN;
  serviceName: ServiceName<ProtoGrpcType, PN>;
};

export const loadProto = <
  ProtoGrpcType,
  ServiceHandlers,
  PN extends PackageName<ProtoGrpcType>
>({
  dirname,
  fileName,
  implementation,
  packageName,
  serviceName,
}: LoadProtoArgs<ProtoGrpcType, ServiceHandlers, PN>) => {
  const fullPath = path.resolve(dirname, 'proto', fileName);
  const packageDefinition = protoLoader.loadSync(fullPath, {
    defaults: true,
    enums: String,
    keepCase: true,
    longs: Number,
    oneofs: true,
  });
  const proto = grpc.loadPackageDefinition(packageDefinition) as any;

  const { service } = proto[packageName][serviceName];
  return {
    addToServer(server: grpc.Server) {
      // @ts-expect-error implementation wrongly typed
      server.addService(service, implementation);
    },
    proto,
  };
};
