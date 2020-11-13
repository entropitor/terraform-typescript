import path from 'path';
import * as KV from 'src/generated/kv';
import * as fs from 'fs';
import { hashicorpPlugin } from '@terraform-typescript/hashicorp-plugin';
import { loadProto } from '@terraform-typescript/grpc-utils';
import { KVHandlers } from './generated/proto/KV';

const kv = loadProto<KV.ProtoGrpcType, KVHandlers, 'proto'>({
  dirname: __dirname,
  fileName: 'kv.proto',
  packageName: 'proto',
  serviceName: 'KV',
  implementation: {
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
  },
});

hashicorpPlugin({
  appVersion: 1,
  configureServer(server) {
    kv.addToServer(server);
  },
});
