import { EntryApi } from "../api/entry.api";
import { refreshToken } from "./auth.utils";
import { getAccessToken } from "./localstorage.utils";
import { EMPTYENTRYRESPONSE } from "./constans.utils";
const CreateEntry = async (
  newentry: CreateEntryDto,
  token: string
): Promise<IEntry | number> => {
  const response = await EntryApi.getInstance()
    .CreateNewEntry(newentry, token)
    .then((resp: Response) => {
      if (resp.status === 200 || resp.status === 201) return resp.json();
      return resp.status;
    });
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
  const response = await EntryApi.getInstance()
    .GetEntriesByGroupID(groupid, token)
    .then((resp: Response) => {
      if (resp.status === 200 || resp.status === 201) return resp.json();
      return resp.status;
    });
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

const DeleteEntry = async (
  deleteid: string,
  accesstoken: string
): Promise<DeleteEntryResponse> => {
  const response = await EntryApi.getInstance()
    .DeleteEntryById(deleteid, accesstoken)
    .then((resp: Response) => {
      return resp.json();
    });
  return response;
};

const DeleteUserEntry = async (
  entryid: string
): Promise<DeleteEntryResponse> => {
  let accesstoken = getAccessToken();
  let response: DeleteEntryResponse = await DeleteEntry(entryid, accesstoken);
  if (response.status === false) {
    await refreshToken();
    accesstoken = getAccessToken();
    response = await DeleteEntry(entryid, accesstoken);
  }
  return response;
};

const EditEntry = async (
  editedbody: EditEntry,
  accesstoken: string
): Promise<EditEntryResponse> => {
  const response: EditEntryResponse = await EntryApi.getInstance()
    .EditEntryByID(editedbody, accesstoken)
    .then((resp: Response) => {
      return resp.json();
    });
  return response;
};
const EntryEditById = async (
  entrybody: EditEntry
): Promise<EditEntryResponse> => {
  let accesstoken = getAccessToken();
  let response: EditEntryResponse = await EditEntry(entrybody, accesstoken);
  if (!response.status) {
    await refreshToken();
    accesstoken = getAccessToken();
    response = await EditEntry(entrybody, accesstoken);
  }
  return response;
};
export {
  CreateNewEntryUser,
  GetUserEntriesByGroupID,
  DeleteUserEntry,
  EntryEditById,
};
