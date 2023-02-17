import { getGroupByUser, createGroup } from "../api/group.api";
import { refreshToken } from "./auth.utils";
import { getAccessToken } from "./localstorage.utils";
import {EMPTYGROUPRESPONSE} from "./constans.utils";
const GetGroups = async (token: string): Promise<number | Array<IGroup>> => {
  const response: Promise<number | Array<IGroup>> = await getGroupByUser(
    token
  ).then((resp: Response) => {
    if (resp.status === 201 || resp.status === 200) return resp.json();
    return resp.status;
  });
  return response;
};

const GetGroupsByUser = async (): Promise<GroupResponse> => {
  let token: string = getAccessToken();
  let response: number | Array<IGroup> = await GetGroups(token);
  if (response === 401) {
    await refreshToken();
    token = getAccessToken();
    response = await GetGroups(token);
    if (response === 401 || response === 500) {
      return { status: false, response: [] };
    }
  } else if (response === 500) {
    return { status: false, response: [] };
  }
  if (typeof response !== "number") return { status: true, response: response };
  return { status: false, response: [] };
};

const GroupCreate = async (
  creategroup: CreateGroup,
  accesstoken: string
): Promise<number | IGroup> => {
  const response = await createGroup(creategroup, accesstoken).then(
    (resp: Response) => {
      if (resp.status === 200 || resp.status === 201) return resp.json();
      return resp.status;
    }
  );
  return response;
};

const CreateGroupForUser = async (
  creategroup: CreateGroup
): Promise<CreateGroupResponse> => {
  let accesstoken: string = getAccessToken();
  let response: number | IGroup = await GroupCreate(creategroup, accesstoken);
  if (response === 401) {
    await refreshToken();
    accesstoken = getAccessToken();
    response = await GroupCreate(creategroup, accesstoken);
    if (response === 401 || response === 500) {
      return { status: false, response: EMPTYGROUPRESPONSE };
    }
  } else if (response === 500) {
    return { status: false, response: EMPTYGROUPRESPONSE };
  }
  if (typeof response !== "number") return { status: true, response: response };
  return { status: false, response: EMPTYGROUPRESPONSE };
};
export { GetGroupsByUser, CreateGroupForUser };
