import { SchemaDefinitionProperty } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MongoDateGetter = (date: any): any => {
  if (typeof date === 'object' && date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return date;
};
