export const branch = <T>(condition: boolean, isTrue: T, fallBackValue: T): T =>
  condition ? isTrue : fallBackValue;

export const isObjectAndHasProperKeys = <T>(value: T, key: string): boolean =>
  value && typeof value === "object" && key in value;

export const ResponseJsonRun = (r: Response) => r.json();

export const retriveKeyFromObjectIfExists = <T extends Record<string, unknown>>(
  value: T,
  key: string,
  defaultValueToReturn = null
) => (isObjectAndHasProperKeys(value, key) ? value[key] : defaultValueToReturn);
