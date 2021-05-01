import React, { FC, useState } from "react";
import {
  MainPageComponent,
  MainTextComponent,
  MainInputContainer,
  MainInput,
  TaskButton,
} from "../../components/MainPageComponents";
import TasksComponent from "../../components/Tasks.component";
const MainPage: FC = (): JSX.Element => {
  const [refresh, setrefresh] = useState<boolean>(false);
  return (
    <MainPageComponent>
      <MainTextComponent>ToDo App</MainTextComponent>
      <MainInputContainer>
        <MainInput></MainInput>
        <TaskButton>Add</TaskButton>
      </MainInputContainer>
      <TasksComponent refreshtasks={refresh} />
    </MainPageComponent>
  );
};

export default MainPage;
