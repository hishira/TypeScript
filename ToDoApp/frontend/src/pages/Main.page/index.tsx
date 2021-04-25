import React, { FC } from "react";
import {
  MainPageComponent,
  MainTextComponent,
  MainInputContainer, 
  MainInput,
  TaskButton,
} from "../../components/MainPageComponents";
const MainPage: FC = (): JSX.Element => {
  return <MainPageComponent>
      <MainTextComponent>ToDo App</MainTextComponent>
      <MainInputContainer>
          <MainInput
          >
              </MainInput>
          <TaskButton>Add</TaskButton>
      </MainInputContainer>
  </MainPageComponent>;
};

export default MainPage;
