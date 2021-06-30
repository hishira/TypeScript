import {
  getUrl,
  fetchGetObjectWithtoken,
  fetchPostObjectWithToken,
} from "./config.api";

const getGroupByUser = async (token: string) => {
  const url = getUrl("group/byuser");
  return await fetch(url, fetchGetObjectWithtoken(token));
};

const createGroup = async (createGroup: CreateGroup, token: string) => {
  const url = getUrl("group/");
  return await fetch(url, fetchPostObjectWithToken(createGroup, token));
};
export { getGroupByUser, createGroup };
