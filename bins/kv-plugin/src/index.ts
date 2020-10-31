import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import {
  ProtoGrpcType as KVProto,
  ServiceHandlers as KVHandlers,
} from "src/generated/kv";
import {
  ProtoGrpcType as GrpcStdioProto,
  ServiceHandlers as GrpcStdioHandlers,
} from "src/generated/grpc_stdio";
// @ts-expect-error no definition file
import health from "grpc-health-check";
import * as fs from "fs";

const PROTO_PATH = path.join(__dirname, "proto");
const load = <T>(name: string): T => {
  const fullPath = path.resolve(PROTO_PATH, name);
  const packageDefinition = protoLoader.loadSync(fullPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const proto = grpc.loadPackageDefinition(packageDefinition) as any;
  return proto as T;
};

const kvProto: KVProto = load("kv.proto");
const kvImpl: KVHandlers.proto.KV = {
  Get(call, callback) {
    console.log(call.request);

    callback(null, {
      value: fs.readFileSync(`kv_${call.request!.key!}`),
    });
  },
  Put(call, callback) {
    fs.writeFileSync(`kv_${call.request!.key!}`, call.request!.value!);
    callback(null, {});
  },
};

const grpcStdioProto: GrpcStdioProto = load("grpc_stdio.proto");
const grpcStdioImpl: GrpcStdioHandlers.plugin.GRPCStdio = {
  StreamStdio(call) {
    call.emit("error", {
      code: grpc.status.UNIMPLEMENTED,
      message: "Unimplemented",
    });
  },
};

const statusMap = {
  plugin: health.messages.HealthCheckResponse.ServingStatus.SERVING,
  "": health.messages.HealthCheckResponse.ServingStatus.NOT_SERVING,
};
const healthImpl = new health.Implementation(statusMap);

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  const server = new grpc.Server();
  server.addService(kvProto.proto.KV.service, kvImpl as any);
  server.addService(
    grpcStdioProto.plugin.GRPCStdio.service,
    grpcStdioImpl as any
  );
  server.addService(health.service, healthImpl);
  server.bindAsync(
    "0.0.0.0:0",
    grpc.ServerCredentials.createInsecure(),
    (_err, port) => {
      console.error(port);
      server.start();
      console.log(`1|1|tcp|127.0.0.1:${port}|grpc`);
    }
  );
}

main();
