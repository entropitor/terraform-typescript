type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];
type FilteredKeysReverse<T, U> = {
  [P in keyof T]: U extends T[P] ? P : never;
}[keyof T];

type OmitNever<T> = Omit<T, FilteredKeys<T, never>>;

type OmitEmptyObjects<T> = Omit<T, FilteredKeysReverse<T, {}>>;
type OmitEmptyArrays<T> = Omit<T, FilteredKeysReverse<T, {}[]>>;

export type SmartOmit<T> = OmitEmptyArrays<OmitEmptyObjects<OmitNever<T>>>;

type User = {
  foo: {};
  foos: {}[];
  bar: {
    x: number;
  };
};
type Foo = SmartOmit<User>;
