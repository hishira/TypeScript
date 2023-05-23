import { randomUUID } from "./uuid.utils";

export const GetGroupMock = (): IGroup => ({
  _id: randomUUID(),
  name: "Group mock name",
  userid: randomUUID(),
});

export const GetGroupsMock = (number: number = 2): IGroup[] => {
  return Array.from({ length: number }, (v, i) => GetGroupMock());
};
