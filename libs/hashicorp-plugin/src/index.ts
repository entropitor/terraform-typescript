import { Http2Server } from 'http2';

import { loadProto } from '@entropitor/hashicorp-grpc-utils';
import * as grpc from '@grpc/grpc-js';
// @ts-expect-error no definition file
import health from 'grpc-js-health-check';
import * as forge from 'node-forge';

import { generateIdentity } from './certificate';
import * as GrpcStdio from './generated/grpc_stdio';
import { GRPCStdioHandlers } from './generated/plugin/GRPCStdio';

const CORE_PROTOCOL_VERSION = 1;
const PROTOCOL = 'grpc';

const grpcStdioProto = loadProto<
  GrpcStdio.ProtoGrpcType,
  GRPCStdioHandlers,
  'plugin'
>({
  dirname: __dirname,
  fileName: 'grpc_stdio.proto',
  implementation: {
    StreamStdio(call) {
      call.emit('error', {
        code: grpc.status.UNIMPLEMENTED,
        message: 'Unimplemented',
      });
    },
  },
  packageName: 'plugin',
  serviceName: 'GRPCStdio',
});

const statusMap = {
  '': health.servingStatus.NOT_SERVING,
  plugin: health.servingStatus.SERVING,
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
  let serverCertificateString = '';
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
      true,
    );
    serverCertificateString = forge.util
      .encode64(
        forge.asn1
          .toDer(forge.pki.certificateToAsn1(serverCertificate))
          .getBytes(),
      )
      // Remove padding
      .replace(/=*$/, '');
  }

  server.bindAsync('0.0.0.0:0', credentials, (_err, port) => {
    server.start();
    const networkType = 'tcp';
    const address = `127.0.0.1:${port}`;
    // eslint-disable-next-line no-console
    console.log(
      `${CORE_PROTOCOL_VERSION}|${appVersion}|${networkType}|${address}|${PROTOCOL}|${serverCertificateString}`,
    );
    // @ts-expect-error access internal variable to close connection when only client closes
    server.http2ServerList.forEach((http2Server: Http2Server) => {
      http2Server.on('connection', (socket) => {
        socket.on('close', () => {
          process.exit(0);
        });
      });
    });
  });
};
