export const isDefined = <T>(value: T | string | number): boolean =>
  value !== null && value !== undefined;
