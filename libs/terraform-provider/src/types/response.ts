import { GrpcResponse } from "@terraform-typescript/grpc-utils";
import { getMonoid } from "fp-ts/lib/Array";
import * as TaskThese from "fp-ts/lib/TaskThese";
import { Diagnostic } from "src/generated/tfplugin5/Diagnostic";
import { Task } from "fp-ts/lib/Task";
import { Do } from "fp-ts-contrib/lib/Do";
import * as These from "fp-ts/lib/These";
import { pipe } from "fp-ts/lib/function";

export type GrpcAsyncResponse<T> = Promise<GrpcResponse<T>> | GrpcResponse<T>;
export type AsyncResponse<T> = TaskThese.TaskThese<Diagnostic[], T>;
export type SyncResponse<T> = These.These<Diagnostic[], T>;

export const responseMonad = TaskThese.getMonad(getMonoid<Diagnostic>());

export const runTask = <A = never>(task: Task<A>): Promise<A> => {
  return task();
};

export const responseDo = Do(responseMonad);

export const getDiagnostics = <T = never>(response: SyncResponse<T>) => {
  return pipe(
    response,
    These.fold(
      (left) => left,
      (_right) => [],
      (left, _right) => left
    )
  );
};

export const AsyncResponse = {
  right: <T = never>(t: T) => TaskThese.right<Diagnostic[], T>(t),
  left: <T = never>(diagnostics: Diagnostic[]) =>
    TaskThese.left<Diagnostic[], T>(diagnostics),
  both: <T = never>(diagnostics: Diagnostic[], t: T) =>
    TaskThese.both<Diagnostic[], T>(diagnostics, t),
};
