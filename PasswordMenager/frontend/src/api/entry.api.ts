import {
  getUrl,
  fetchPostObjectWithToken,
  fetchGetObjectWithtoken,
  fetchDeleteObjectWithToken,
} from "./config.api";

const CreateNewEntry = async (
  newentry: CreateEntryDto,
  token: string
): Promise<Response> => {
  const url = getUrl("entry");
  return await fetch(url, fetchPostObjectWithToken(newentry, token));
};
const GetEntriesByGroupID = async (
  groupid: GroupId,
  token: string
): Promise<Response> => {
  const url = getUrl(`entry/bygroup/${groupid.id}`);
  return await fetch(url, fetchGetObjectWithtoken(token));
};
const DeleteEntryById = async (
  entryid: string,
  accesstoken: string
): Promise<Response> => {
  const url = getUrl(`entry/byentityid/${entryid}`);
  return await fetch(url, fetchDeleteObjectWithToken(accesstoken));
};

export { CreateNewEntry, GetEntriesByGroupID, DeleteEntryById };
