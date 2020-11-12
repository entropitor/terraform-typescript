import { GrpcResponse } from "@terraform-typescript/grpc-utils";

export type GrpcAsyncResponse<T> = Promise<GrpcResponse<T>> | GrpcResponse<T>;
