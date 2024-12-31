export const isNill: (value: unknown) => value is null | undefined = (
  value: unknown
): value is null | undefined => value === null || value === undefined;
