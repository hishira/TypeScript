import React, {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import {
  TasksContainer,
  Task,
  TaskDateContainer,
  TaskContextContainer,
  TaskUpContainer,
  TaskDeleteButton,
  SelectContainer,
  SelectLabel,
  Select,
  SelectOption,
  DeleteAllTaskButton,
} from "./MainPageComponents";
import {
  FetchAllTasks,
  TaskDelete,
  TaskSortingAsc,
  TaskSortingDesc,
  DeleteTaskAll,
} from "../utils/task.util";
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
  const selecthandle: ChangeEventHandler<HTMLSelectElement> = async (
    e: ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    if (parseInt(e.target.value) === 10) {
      const response = await TaskSortingAsc();
      if (response.status) {
        console.log(response.response);
        settasks(response.response);
      }
    } else {
      const response = await TaskSortingDesc();
      if (response.status) {
        console.log(response.response);
        settasks(response.response);
      }
    }
  };

  const DeleteAllTaskHandle: MouseEventHandler<HTMLButtonElement> = async (): Promise<void> => {
    console.log("delete all");
    const response: boolean = await DeleteTaskAll();
    if (!response) {
      console.log("Problem");
    }else{
      refresh();
    }
  };
  return (
    <TasksContainer>
      <SelectContainer>
        <SelectLabel>Sort by:</SelectLabel>
        <Select onChange={selecthandle}>
          <SelectOption value={10}>By date ascending</SelectOption>
          <SelectOption value={20}>By date descending</SelectOption>
        </Select>
        <DeleteAllTaskButton onClick={DeleteAllTaskHandle}>
          Delete all
        </DeleteAllTaskButton>
      </SelectContainer>
      {tasks.map((task: ITask) => (
        <Task>
          <TaskUpContainer>
            <TaskDateContainer>{task.createDate}</TaskDateContainer>
            <TaskDeleteButton
              onClick={() => deleteTaskHandle(task._id)}
            ></TaskDeleteButton>
          </TaskUpContainer>
          <TaskContextContainer>{task.content}</TaskContextContainer>
        </Task>
      ))}
    </TasksContainer>
  );
};
export default TasksComponent;
