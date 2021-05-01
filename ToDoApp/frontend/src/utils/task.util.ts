import { GetAllTasks } from "../api/task.api";

const GetTasks: Function = async (): Promise<Array<ITask> | boolean> => {
  const response: Array<ITask> | boolean = await GetAllTasks().then(
    (resp: Response) => {
      if (resp.status === 200) return resp.json();
      return false;
    }
  );
  return response;
};

export const FetchAllTasks: Function = async (): Promise<AllTaskResponse> => {
  const response = await GetTasks();
  if (response !== false) {
    console.log(response);
    return { status: true, response: response };
  }
  return { status: false, response: [] };
};
