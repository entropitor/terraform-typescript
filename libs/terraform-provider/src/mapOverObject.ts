export const objectMap = <A, B>(
  mapFn: (
    keyValue: [string, A],
    index: number,
    array: Array<[string, A]>,
  ) => [string, B],
  obj: Record<string, A>,
): Record<string, B> => Object.fromEntries(Object.entries(obj).map(mapFn));

export const valueMap = <A, B>(
  mapFn: (keyValue: A, index: number) => B,
  obj: Record<string, A>,
): Record<string, B> =>
  objectMap(([key, value], index) => [key, mapFn(value, index)], obj);
