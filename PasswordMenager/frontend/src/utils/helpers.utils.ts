export const branch = <T>(
  condition: boolean,
  isTrue: T,
  fallBackValue: T
): T => (condition ? isTrue : fallBackValue);
