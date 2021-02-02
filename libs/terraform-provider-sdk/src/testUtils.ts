export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const expectTypeToBeTrue = <_ extends true>() => {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const expectTypeToBeFalse = <_ extends false>() => {};
