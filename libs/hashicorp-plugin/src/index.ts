import * as grpc from "@grpc/grpc-js";
import * as GrpcStdio from "src/generated/grpc_stdio";
// @ts-expect-error no definition file
import health from "grpc-health-check";

import { loadProto } from "@terraform-typescript/grpc-utils";

const CORE_PROTOCOL_VERSION = 1;
const PROTOCOL = "grpc";

const grpcStdioProto = loadProto<
  GrpcStdio.ProtoGrpcType,
  GrpcStdio.ServiceHandlers.plugin.GRPCStdio,
  "plugin"
>({
  dirname: __dirname,
  fileName: "grpc_stdio.proto",
  implementation: {
    StreamStdio(call) {
      call.emit("error", {
        code: grpc.status.UNIMPLEMENTED,
        message: "Unimplemented",
      });
    },
  },
  packageName: "plugin",
  serviceName: "GRPCStdio",
});

const statusMap = {
  plugin: health.messages.HealthCheckResponse.ServingStatus.SERVING,
  "": health.messages.HealthCheckResponse.ServingStatus.NOT_SERVING,
};
const healthImpl = new health.Implementation(statusMap);

type HashiCorpPluginArgs = {
  appVersion: number;
  configureServer: (server: grpc.Server) => void | Promise<void>;
};
export const hashicorpPlugin = async ({
  appVersion,
  configureServer,
}: HashiCorpPluginArgs) => {
  const server = new grpc.Server();

  server.addService(health.service, healthImpl);
  grpcStdioProto.addToServer(server);

  await configureServer(server);

  server.bindAsync(
    "0.0.0.0:0",
    grpc.ServerCredentials.createInsecure(),
    (_err, port) => {
      console.error(port);
      server.start();
      console.log(`1|1|tcp|127.0.0.1:${port}|grpc`);
      const networkType = "tcp";
      const address = `127.0.0.1:${port}`;
      const serverCertificate = "";
      console.log(
        `${CORE_PROTOCOL_VERSION}|${appVersion}|${networkType}|${address}|${PROTOCOL}|${serverCertificate}`
      );
    }
  );
};
