import React, { FC, useState, useEffect } from "react";
import {
  TasksContainer,
  Task,
  TaskDateContainer,
  TaskContextContainer,
} from "./MainPageComponents";
import { FetchAllTasks } from "../utils/task.util";
type TasksComponentType = {
  refreshtasks: boolean;
};
const TasksComponent: FC<TasksComponentType> = ({
  refreshtasks,
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
  return (
    <TasksContainer>
      {tasks.map((task: ITask) => (
        <Task>
          <TaskDateContainer>{task.createDate}</TaskDateContainer>
          <TaskContextContainer>{task.content}</TaskContextContainer>
        </Task>
      ))}
    </TasksContainer>
  );
};
export default TasksComponent;
