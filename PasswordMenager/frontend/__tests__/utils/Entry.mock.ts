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
// TODO  check
const randomUUID = (): string => {
  let u = Date.now().toString(16) + Math.random().toString(16) + "0".repeat(16);
  return [
    u.substr(0, 8),
    u.substr(8, 4),
    "4000-8" + u.substr(13, 3),
    u.substr(16, 12),
  ].join("-");
};
