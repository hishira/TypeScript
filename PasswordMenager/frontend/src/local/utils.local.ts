import { EntryValue } from "../local-database/localDatabase.interface";

export const GetEntryValue = (createEntryDto: CreateEntryDto): Partial<EntryValue> => ({
  ...createEntryDto,
  groupid: createEntryDto.groupid === "" ? null : createEntryDto.groupid,
  _id: crypto.randomUUID(),
});
