import React, {
  FC,
  useState,
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import {
  MainPageComponent,
  MainTextComponent,
  MainInputContainer,
  MainInput,
  TaskButton,
} from "../../components/MainPageComponents";
import TasksComponent from "../../components/Tasks.component";
import { CreateNewTask } from "../../utils/task.util";
const MainPage: FC = (): JSX.Element => {
  const [refresh, setrefresh] = useState<boolean>(false);
  const [newtask, setnewtask] = useState<CreateTaskDTO>({ content: "" });

  const setnewcontenttask: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setnewtask({ content: e.target.value });
  };
  const addclick: MouseEventHandler = async (): Promise<void> => {
    console.log(newtask);
    const response: CreateTaskResponse = await CreateNewTask(newtask);
    if (response.status) {
      setrefresh(!refresh);
    }
  };

  const refreshTask: Function = (): void => setrefresh(!refresh);
  return (
    <MainPageComponent>
      <MainTextComponent>ToDo App</MainTextComponent>
      <MainInputContainer>
        <MainInput onChange={setnewcontenttask}></MainInput>
        <TaskButton onClick={addclick}>Add</TaskButton>
      </MainInputContainer>
      <TasksComponent refreshtasks={refresh} refresh={refreshTask} />
    </MainPageComponent>
  );
};

export default MainPage;
