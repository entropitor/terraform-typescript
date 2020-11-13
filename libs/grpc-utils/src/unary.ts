import * as grpc from '@grpc/grpc-js';
import * as Either from 'fp-ts/Either';

export const cbReturn = <E, V>(
  callback: (error: E | null, value: V | null) => void,
  promiseFn: () => Promise<Either.Either<E, V>>,
): void => {
  promiseFn().then(
    (result) => {
      Either.fold<E, V, void>(
        (error) => callback(error, null),
        (value) => callback(null, value),
      )(result);
    },
    (error) => callback(error, null),
  );
};

export type GrpcResponse<Res> = Either.Either<
  Exclude<Parameters<grpc.sendUnaryData<Res>>[0], null>,
  Res
>;

export type UnaryCall<Req, Res> = (
  call: grpc.ServerUnaryCall<Req, Res>,
  callback: grpc.sendUnaryData<Res>,
) => void;

export const unary: <Req, Res>(
  implementation: (
    call: grpc.ServerUnaryCall<Req, Res>,
  ) => Promise<GrpcResponse<Res>>,
) => UnaryCall<Req, Res> = (implementation) => (call, callback) =>
  cbReturn(callback, () => implementation(call));
