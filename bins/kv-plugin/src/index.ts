import * as fs from 'fs';

import { loadProto } from '@terraform-typescript/grpc-utils';
import { hashicorpPlugin } from '@terraform-typescript/hashicorp-plugin';

import * as KV from './generated/kv';
import { KVHandlers } from './generated/proto/KV';

const kv = loadProto<KV.ProtoGrpcType, KVHandlers, 'proto'>({
  dirname: __dirname,
  fileName: 'kv.proto',
  implementation: {
    Get(call, callback) {
      callback(null, {
        value: fs.readFileSync(`kv_${call.request!.key!}`),
      });
    },
    Put(call, callback) {
      fs.writeFileSync(`kv_${call.request!.key!}`, call.request!.value!);
      callback(null, {});
    },
  },
  packageName: 'proto',
  serviceName: 'KV',
});

hashicorpPlugin({
  appVersion: 1,
  configureServer(server) {
    kv.addToServer(server);
  },
});
