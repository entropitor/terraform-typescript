import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

type Proto<PackageName extends string, ServiceName extends string> = {
  [packageName in PackageName]: {
    [serviceName in ServiceName]: any;
  };
};
type PackageName<P> = P extends Proto<infer PackageName, any>
  ? PackageName
  : never;
type ServiceName<P, PN extends PackageName<P>> = P extends Proto<
  PN,
  infer ServiceName
>
  ? ServiceName
  : never;

type LoadProtoArgs<
  ProtoGrpcType,
  ServiceHandlers,
  PN extends PackageName<ProtoGrpcType>
> = {
  dirname: string;
  fileName: string;
  packageName: PN;
  serviceName: ServiceName<ProtoGrpcType, PN>;
  implementation: ServiceHandlers;
};
export const loadProto = <
  ProtoGrpcType,
  ServiceHandlers,
  PN extends PackageName<ProtoGrpcType>
>({
  dirname,
  fileName,
  packageName,
  serviceName,
  implementation,
}: LoadProtoArgs<ProtoGrpcType, ServiceHandlers, PN>) => {
  const fullPath = path.resolve(dirname, "proto", fileName);
  const packageDefinition = protoLoader.loadSync(fullPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const proto = grpc.loadPackageDefinition(packageDefinition) as any;

  const service: grpc.ServiceDefinition<ServiceHandlers> =
    proto[packageName][serviceName].service;
  return {
    proto,
    addToServer(server: grpc.Server) {
      // @ts-expect-error implementation wrongly typed
      server.addService(service, implementation);
    },
  };
};
