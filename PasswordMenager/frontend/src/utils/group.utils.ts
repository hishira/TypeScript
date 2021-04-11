import { getGroupByUser } from "../api/group.api";
import { refreshToken } from "./auth.utils";
import { getAccessToken } from "./localstorage.utils";
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
    console.log(response);
    if (response === 401 || response === 500) {
      return { status: false, response: [] };
    }
  } else if (response === 500) {
    return { status: false, response: [] };
  }
  if (typeof response !== "number") return { status: true, response: response };
  return { status: false, response: [] };
};

export { GetGroupsByUser };
