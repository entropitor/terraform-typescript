import * as grpc from "@grpc/grpc-js";
import * as GrpcStdio from "src/generated/grpc_stdio";
// @ts-expect-error no definition file
import health from "grpc-health-check";
import * as forge from "node-forge";
import { loadProto } from "@terraform-typescript/grpc-utils";
import { Http2Server } from "http2";
import { generateIdentity } from "./certificate";

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

  let credentials = grpc.ServerCredentials.createInsecure();
  let serverCertificateString = "";
  if (process.env.PLUGIN_CLIENT_CERT) {
    const clientCertString = process.env.PLUGIN_CLIENT_CERT;
    // const clientCertificate = forge.pki.certificateFromPem(clientCertString);
    // const pemCertificateClient = forge.pki.certificateToPem(clientCertificate);

    const { cert: serverCertificate, keys } = generateIdentity();
    const pemCertificateServer = forge.pki.certificateToPem(serverCertificate);
    const privateKey = forge.pki.privateKeyToPem(keys.privateKey);

    credentials = grpc.ServerCredentials.createSsl(
      Buffer.from(clientCertString),
      [
        {
          cert_chain: Buffer.from(pemCertificateServer),
          private_key: Buffer.from(privateKey),
        },
      ],
      true
    );
    serverCertificateString = forge.util
      .encode64(
        forge.asn1
          .toDer(forge.pki.certificateToAsn1(serverCertificate))
          .getBytes()
      )
      // Remove padding
      .replace(/=*$/, "");
  }

  server.bindAsync("0.0.0.0:0", credentials, (_err, port) => {
    server.start();
    const networkType = "tcp";
    const address = `127.0.0.1:${port}`;
    console.log(
      `${CORE_PROTOCOL_VERSION}|${appVersion}|${networkType}|${address}|${PROTOCOL}|${serverCertificateString}`
    );
    // @ts-expect-error
    server.http2ServerList.forEach((http2Server: Http2Server) => {
      http2Server.on("connection", (socket) => {
        socket.on("close", () => {
          process.exit(0);
        });
      });
    });
  });
};
