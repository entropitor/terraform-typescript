import { GrpcResponse } from '@terraform-typescript/grpc-utils';
import { Do } from 'fp-ts-contrib/lib/Do';
import { sequenceS, sequenceT } from 'fp-ts/lib/Apply';
import { getMonoid } from 'fp-ts/lib/Array';
import * as Either from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as Task from 'fp-ts/lib/Task';
import * as TaskThese from 'fp-ts/lib/TaskThese';
import * as These from 'fp-ts/lib/These';

import {
  _tfplugin5_Diagnostic_Severity as Severity,
  Diagnostic,
} from '../generated/tfplugin5/Diagnostic';

export type AsyncResponse<T> = TaskThese.TaskThese<Diagnostic[], T>;
export type SyncResponse<T> = These.These<Diagnostic[], T>;

export const runTask = <A = never>(task: Task.Task<A>): Promise<A> => {
  return task();
};

const responseMonad = TaskThese.getMonad(getMonoid<Diagnostic>());

export const sequenceResponseS = sequenceS(responseMonad);
export const sequenceResponseT = sequenceT(responseMonad);
export const responseDo = Do(responseMonad);

export const getDiagnostics = <T = never>(response: SyncResponse<T>) => {
  return pipe(
    response,
    These.fold(
      (left) => left,
      (_right) => [],
      (left, _right) => left,
    ),
  );
};

export const SyncResponse = {
  both: <T = never>(diagnostics: Diagnostic[], t: T) =>
    These.both<Diagnostic[], T>(diagnostics, t),
  catch: (summary: string) => (error: Error) =>
    SyncResponse.fromError(summary, error),
  fromError: (summary: string, error: Error) =>
    SyncResponse.fromErrorString(summary, error.message),
  fromErrorString: (summary: string, detail?: string) =>
    These.left<Diagnostic[], never>([
      {
        detail,
        severity: Severity.ERROR,
        summary,
      },
    ]),
  left: <T = never>(diagnostics: Diagnostic[]) =>
    These.left<Diagnostic[], T>(diagnostics),
  right: <T = never>(t: T) => These.right<Diagnostic[], T>(t),
};

export const AsyncResponse = {
  both: <T = never>(diagnostics: Diagnostic[], t: T) =>
    TaskThese.both<Diagnostic[], T>(diagnostics, t),
  fromError: (summary: string, error: Error) =>
    Task.of(SyncResponse.fromError(summary, error)),
  fromErrorString: (summary: string, detail?: string) =>
    Task.of(SyncResponse.fromErrorString(summary, detail)),
  left: <T = never>(diagnostics: Diagnostic[]) =>
    TaskThese.left<Diagnostic[], T>(diagnostics),
  leftAsync: <T = never>(diagnostics: Task.Task<Diagnostic[]>) =>
    TaskThese.leftTask<Diagnostic[], T>(diagnostics),
  mapLeft: (f: (diag: Diagnostic[]) => Diagnostic[]) => TaskThese.mapLeft(f),
  right: <T = never>(t: T) => TaskThese.right<Diagnostic[], T>(t),
  rightAsync: <T = never>(t: Task.Task<T>) =>
    TaskThese.rightTask<Diagnostic[], T>(t),
};

const asGrpcResponse = <T = never>(
  response: SyncResponse<T>,
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
  response: AsyncResponse<T>,
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
