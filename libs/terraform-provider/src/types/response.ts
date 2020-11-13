import { GrpcResponse } from "@terraform-typescript/grpc-utils";
import { getMonoid } from "fp-ts/lib/Array";
import * as TaskThese from "fp-ts/lib/TaskThese";
import { Task } from "fp-ts/lib/Task";
import { Do } from "fp-ts-contrib/lib/Do";
import * as These from "fp-ts/lib/These";
import { pipe } from "fp-ts/lib/function";
import * as Either from "fp-ts/lib/Either";
import { Diagnostic } from "../generated/tfplugin5/Diagnostic";

export type AsyncResponse<T> = TaskThese.TaskThese<Diagnostic[], T>;
export type SyncResponse<T> = These.These<Diagnostic[], T>;

export const runTask = <A = never>(task: Task<A>): Promise<A> => {
  return task();
};

const responseMonad = TaskThese.getMonad(getMonoid<Diagnostic>());
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
  rightAsync: <T = never>(t: Task<T>) =>
    TaskThese.rightTask<Diagnostic[], T>(t),
  left: <T = never>(diagnostics: Diagnostic[]) =>
    TaskThese.left<Diagnostic[], T>(diagnostics),
  leftAsync: <T = never>(diagnostics: Task<Diagnostic[]>) =>
    TaskThese.leftTask<Diagnostic[], T>(diagnostics),
  both: <T = never>(diagnostics: Diagnostic[], t: T) =>
    TaskThese.both<Diagnostic[], T>(diagnostics, t),
};

export const SyncResponse = {
  right: <T = never>(t: T) => These.right<Diagnostic[], T>(t),
  left: <T = never>(diagnostics: Diagnostic[]) =>
    These.left<Diagnostic[], T>(diagnostics),
  both: <T = never>(diagnostics: Diagnostic[], t: T) =>
    These.both<Diagnostic[], T>(diagnostics, t),
};

const asGrpcResponse = <T = never>(
  response: SyncResponse<T>
): GrpcResponse<
  Partial<T> & {
    diagnostics?: Diagnostic[];
  }
> => {
  const diagnostics = getDiagnostics(response);

  if (These.isLeft(response)) {
    // @ts-expect-error typescript doesn't recognize this properly
    return Either.right({
      diagnostics,
    });
  }

  const t: T = response.right;

  return Either.right({
    ...t,
    diagnostics,
  });
};

export const runTaskTillGrpcResponse = async <T = never>(
  response: AsyncResponse<T>
): Promise<
  GrpcResponse<
    Partial<T> & {
      diagnostics?: Diagnostic[];
    }
  >
> => {
  const result = await runTask(response);
  return asGrpcResponse(result);
};
