import { randomUUID } from "./uuid.utils";
export const GROUPNAME = "Group mock name";
export const GetGroupMock = (): IGroup => ({
  _id: randomUUID(),
  name: GROUPNAME,
  userid: randomUUID(),
});

export const GetGroupsMock = (number: number = 2): IGroup[] => {
  return Array.from({ length: number }, (v, i) => GetGroupMock());
};
