export const MongoDateGetter = (date: string | Date | any) => {
  if (typeof date === 'object' && date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return date;
};
