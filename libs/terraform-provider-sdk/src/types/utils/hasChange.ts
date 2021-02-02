import R from 'ramda';

type SubKey<T> = T extends any[] ? number : T extends object ? keyof T : never;
export type PathOf<T> =
  | [keyof T]
  | {
      [key in keyof T]: [key, SubKey<T[key]>];
    }[keyof T]
  | {
      [key1 in keyof T]: {
        [key2 in SubKey<T[key1]>]: key2 extends keyof T[key1]
          ? [key1, key2, SubKey<T[key1][key2]>]
          : never;
      }[SubKey<T[key1]>];
    }[keyof T]
  | {
      [key1 in keyof T]: {
        [key2 in SubKey<T[key1]>]: key2 extends keyof T[key1]
          ? {
              [key3 in SubKey<T[key1][key2]>]: key3 extends keyof T[key1][key2]
                ? [key1, key2, key3, SubKey<T[key1][key2][key3]>]
                : never;
            }[SubKey<T[key1][key2]>]
          : never;
      }[SubKey<T[key1]>];
    }[keyof T];

// TODO integrate better with the schemaDescriptor?
export const hasChange = <T>(t1: T, t2: T) => (path: PathOf<T>) => {
  const lens = R.lensPath(path as Array<string | number>);
  const value1 = R.view(lens, t1);
  const value2 = R.view(lens, t2);
  return !R.equals(value1, value2);
};
