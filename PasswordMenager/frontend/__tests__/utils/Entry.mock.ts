export const GetEntryMock = (): IEntry => ({
  _id: "2133-1234-54123-1234",
  title: "Mock title",
  note: "Mock note",
  groupid: "2133-1234-77123-1234",
  password: "Mock password",
  username: "Mock_username",
});

export const GetEntriesMock = (number: number = 2): IEntry[] => {
  return Array.from({ length: number }, (v, i) => GetEntryMock());
};