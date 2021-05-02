import {
  getURL,
  fetchObject,
  GetFetchPostObject,
  GetFetchDeleteObject,
} from "./config.api";

export const GetAllTasks: Function = async (): Promise<any> => {
  const url = getURL("task/");
  return await fetch(url, fetchObject);
};

export const Create: Function = async (obj: CreateTaskDTO): Promise<any> => {
  const url = getURL("task/create");
  return await fetch(url, GetFetchPostObject(obj));
};

export const Delete: Function = async (obj: DeleteTaskDTO): Promise<any> => {
  const url = getURL("task/");
  return await fetch(url, GetFetchDeleteObject(obj));
};
