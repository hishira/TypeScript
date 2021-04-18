import { CreateNewEntry, GetEntriesByGroupID } from "../api/entry.api";
import { refreshToken } from "./auth.utils";
import { getAccessToken } from "./localstorage.utils";
import { EMPTYENTRYRESPONSE } from "./constans.utils";
const CreateEntry = async (
  newentry: CreateEntryDto,
  token: string
): Promise<IEntry | number> => {
  const response = await CreateNewEntry(newentry, token).then(
    (resp: Response) => {
      if (resp.status === 200 || resp.status === 201) return resp.json();
      return resp.status;
    }
  );
  return response;
};

const CreateNewEntryUser = async (
  newentry: CreateEntryDto
): Promise<CreateEntryResponse> => {
  let accesstoken: string = getAccessToken();
  let response: number | IEntry = await CreateEntry(newentry, accesstoken);
  if (response === 401) {
    await refreshToken();
    accesstoken = getAccessToken();
    response = await CreateEntry(newentry, accesstoken);
    if (response === 401) {
      return {
        status: false,
        response: EMPTYENTRYRESPONSE,
      };
    } else if (response === 500) {
      return {
        status: false,
        response: EMPTYENTRYRESPONSE,
      };
    }
  }
  if (typeof response !== "number") return { status: true, response: response };
  return {
    status: false,
    response: EMPTYENTRYRESPONSE,
  };
};

const GetEntries = async (
  groupid: GroupId,
  token: string
): Promise<number | Array<IEntry>> => {
  const response = await GetEntriesByGroupID(groupid, token).then(
    (resp: Response) => {
      if (resp.status === 200 || resp.status === 201) return resp.json();
      return resp.status;
    }
  );
  return response;
};

const GetUserEntriesByGroupID = async (
  groupid: GroupId
): Promise<GetEntriesResponse> => {
  let accesstoken = getAccessToken();
  let response: number | Array<IEntry> = await GetEntries(groupid, accesstoken);
  if (response === 401) {
    await refreshToken();
    accesstoken = getAccessToken();
    response = await GetEntries(groupid, accesstoken);
    if (response === 401) {
      return { status: false, response: [] };
    } else if (response === 500) {
      return { status: false, response: [] };
    }
  } else if (response === 505) {
    return { status: false, response: [] };
  }
  if (typeof response !== "number") return { status: true, response: response };
  return { status: false, response: [] };
};
export { CreateNewEntryUser, GetUserEntriesByGroupID };
