import path from "path";
// import * as TF from "src/generated/tfplugin5.2";
import * as fs from "fs";
import { hashicorpPlugin } from "@terraform-typescript/hashicorp-plugin";
import { loadProto } from "@terraform-typescript/grpc-utils";

// TF.ProtoGrpcType,
// TF.ServiceHandlers.tfplugin5.Provider,
const tf = loadProto<any, any, "tfplugin5">({
  dirname: __dirname,
  fileName: "tfplugin5.proto",
  packageName: "tfplugin5",
  serviceName: "Provider",
  implementation: {
    ApplyResourceChange(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    Configure(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    GetSchema(call, callback) {
      console.error("GetSchema");
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    ImportResourceState(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    PlanResourceChange(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    PrepareProviderConfig(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    ReadDataSource(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    ReadResource(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    Stop(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    UpgradeResourceState(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    ValidateDataSourceConfig(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
    ValidateResourceTypeConfig(call, callback) {
      console.log(call.request!);
      callback({ code: 12 }, null);
    },
  },
});

hashicorpPlugin({
  appVersion: 5,
  configureServer(server) {
    tf.addToServer(server);
  },
});
