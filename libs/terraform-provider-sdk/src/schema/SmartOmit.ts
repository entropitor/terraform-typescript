type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];
type FilteredKeysReverse<T, U> = {
  [P in keyof T]: U extends T[P] ? P : never;
}[keyof T];

type KeysToOmit<T> =
  // keys that are never
  | FilteredKeys<T, never>
  // keys that are empty objects
  | FilteredKeysReverse<T, {}>
  // keys that are arrays of empty objects
  | FilteredKeysReverse<T, Array<{}>>;

export type SmartOmit<T> = Omit<T, KeysToOmit<T>>;
