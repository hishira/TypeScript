export const isDefined = <T>(value: T | string | number): boolean =>
  value !== null && value !== undefined;

export const IsNotUndefined = <T>(value: T | string | number): boolean =>
  value !== undefined;
