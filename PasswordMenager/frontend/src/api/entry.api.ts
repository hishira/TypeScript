import { getUrl, fetchPostObjectWithToken, fetchGetObjectWithtoken } from "./config.api";

const CreateNewEntry = async (
  newentry: CreateEntryDto,
  token: string
): Promise<Response> => {
  const url = getUrl("entry");
  return await fetch(url, fetchPostObjectWithToken(newentry, token));
};
const GetEntriesByGroupID = async(groupid:GroupId, token:string):Promise<Response>=>{
  const url = getUrl(`entry/bygroup/${groupid.id}`)
  return await fetch(url,fetchGetObjectWithtoken(token));
}

export {
    CreateNewEntry,
    GetEntriesByGroupID,
}