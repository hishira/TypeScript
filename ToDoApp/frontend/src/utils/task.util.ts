import { GetAllTasks, Create, Delete } from "../api/task.api";

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

const CreateTask: Function = async (
  newtask: CreateTaskDTO
): Promise<ITask | boolean> => {
  const response: ITask | boolean = await Create(newtask).then(
    (resp: Response) => {
      if (resp.status === 200) return resp.json();
      return false;
    }
  );
  return response;
};

export const CreateNewTask: Function = async (
  newtask: CreateTaskDTO
): Promise<CreateTaskResponse> => {
  const response = await CreateTask(newtask);
  if (response !== false) {
    return { status: true, newtask: response };
  }
  return { status: false, newtask: null };
};

const DeleteTask: Function = async (
  deletetask: DeleteTaskDTO
): Promise<object | boolean> => {
  const response = await Delete(deletetask).then((resp: Response) => {
    if (resp.status === 200) return resp.json();
    return false;
  });
  return response;
};

export const TaskDelete:Function = async(deletetask:DeleteTaskDTO):Promise<object | boolean>=>{
  const response: object | boolean = await DeleteTask(deletetask);
  return response;
}
