import React, { FC, useState, useEffect } from "react";
import {
  TasksContainer,
  Task,
  TaskDateContainer,
  TaskContextContainer,
  TaskUpContainer,
  TaskDeleteButton,
} from "./MainPageComponents";
import { FetchAllTasks, TaskDelete } from "../utils/task.util";
type TasksComponentType = {
  refreshtasks: boolean;
  refresh: Function;
};
const TasksComponent: FC<TasksComponentType> = ({
  refreshtasks,
  refresh,
}: TasksComponentType) => {
  const [tasks, settasks] = useState<ITask[]>([]);
  const fetchAllTask: Function = async (): Promise<void> => {
    const response: AllTaskResponse = await FetchAllTasks();
    settasks(response.response);
    console.log(response.response);
  };
  useEffect(() => {
    fetchAllTask();
  }, [refreshtasks]);

  const deleteTaskHandle = async (taskid: string): Promise<void> => {
    const deletetask: DeleteTaskDTO = {
      taskid: taskid,
    };
    const response = await TaskDelete(deletetask);
    if (response !== false) {
      refresh();
    }
  };
  return (
    <TasksContainer>
      {tasks.map((task: ITask) => (
        <Task>
          <TaskUpContainer>
            <TaskDateContainer>{task.createDate}</TaskDateContainer>
            <TaskDeleteButton onClick={() => deleteTaskHandle(task._id)}>
              Delete
            </TaskDeleteButton>
          </TaskUpContainer>
          <TaskContextContainer>{task.content}</TaskContextContainer>
        </Task>
      ))}
    </TasksContainer>
  );
};
export default TasksComponent;
