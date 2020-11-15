import R from 'ramda';

export const hasChange = <T>(t1: T, t2: T) => (path: R.Path) => {
  const lens = R.lensPath(path);
  const value1 = R.view(lens, t1);
  const value2 = R.view(lens, t2);
  return !R.equals(value1, value2);
};
