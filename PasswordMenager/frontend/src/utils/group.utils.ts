import { getGroupByUser } from "../api/group.api";
import {getAccessToken} from "./localstorage.utils"
const GetGroups = async (token: string): Promise<number | Array<IGroup>> => {
  const response: Promise<number | Array<IGroup>> = await getGroupByUser(
    token
  ).then((resp: Response) => {
    if (resp.status === 201) return resp.json();
    return resp.status;
  });
  return response;
};

const GetGroupsByUser = async () => {
  let token: string = getAccessToken();
  let response: number | Array<IGroup> = await GetGroups(token);
  if(response === 401){
      
  }
};
