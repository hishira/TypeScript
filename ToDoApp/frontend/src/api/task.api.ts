import {
  getURL,
  fetchObject,
  GetFetchPostObject,
  GetFetchDeleteObject,
  DeleteObject
} from "./config.api";

export const GetAllTasks: Function = async (): Promise<any> => {
  const url: string = getURL("task/");
  return await fetch(url, fetchObject);
};

export const Create: Function = async (obj: CreateTaskDTO): Promise<any> => {
  const url: string = getURL("task/create");
  return await fetch(url, GetFetchPostObject(obj));
};

export const Delete: Function = async (obj: DeleteTaskDTO): Promise<any> => {
  const url: string = getURL("task/");
  return await fetch(url, GetFetchDeleteObject(obj));
};

export const SortAsc: Function = async (): Promise<any> => {
  const url: string = getURL("task/sortasc");
  return await fetch(url, fetchObject);
};

export const SortDesc: Function = async (): Promise<any> => {
  const url: string = getURL("task/sortdesc");
  return await fetch(url, fetchObject);
};

export const DeleteAll: Function = async (obj: object): Promise<any> => {
  const url: string = getURL("task/all");
  return await fetch(url, DeleteObject);
};
