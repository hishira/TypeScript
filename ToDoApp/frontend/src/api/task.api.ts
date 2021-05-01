import { getURL, fetchObject } from "./config.api";

export const GetAllTasks:Function = async (): Promise<any> => {
  const url = getURL("task/");
  return await fetch(url, fetchObject);
};

