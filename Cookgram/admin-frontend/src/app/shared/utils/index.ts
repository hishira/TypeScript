export const isNill: (value: unknown) => value is null | undefined = (
  value: unknown
): value is null | undefined => value === null || value === undefined;

export const hasProperty = <T extends Object>(
  propertyName: string,
  object: T
): object is T & { [propertyName: string]: any } => {
  return propertyName in object;
};


export const isEmptyString = (value: string): boolean => value === '';