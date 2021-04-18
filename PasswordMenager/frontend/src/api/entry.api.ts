import { getUrl, fetchPostObjectWithToken } from "./config.api";

const CreateNewEntry = async (
  newentry: CreateEntryDto,
  token: string
): Promise<Response> => {
  const url = getUrl("entry");
  return await fetch(url, fetchPostObjectWithToken(newentry, token));
};

export {
    CreateNewEntry,
}