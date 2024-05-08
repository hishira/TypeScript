export type UnknownkDateType = string | Date;
export const MongoDateGetter = (date: UnknownkDateType): UnknownkDateType => {
  if (typeof date === 'object' && date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return date;
};
