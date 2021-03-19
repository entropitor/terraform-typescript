export const unreachable = (_arg: never) => {
  throw new Error('Argument should be never, this code should beunreachable');
};
