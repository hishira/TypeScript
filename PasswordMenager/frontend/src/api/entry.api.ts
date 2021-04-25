import {
  getUrl,
  fetchPostObjectWithToken,
  fetchGetObjectWithtoken,
  fetchDeleteObjectWithToken,
  fetchPutObjectWithToken,
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
const EditEntryByID = async (
  entrybody: EditEntry,
  accesstoken: string
): Promise<Response> => {
  const url = getUrl(`entry/edit`);
  return await fetch(url, fetchPutObjectWithToken(entrybody, accesstoken));
};

export { CreateNewEntry, GetEntriesByGroupID, DeleteEntryById, EditEntryByID };
