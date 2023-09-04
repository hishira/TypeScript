import React from "react";
import Button from "../../components/Button";
import { inject, observer } from "mobx-react";
import { IGeneral } from "../../models/General";
import { useHistory } from "react-router-dom";
import { ButtonContainer, Container, Typograph } from "./component.styled";

type HomePageProps = {
  store: IGeneral;
};
const HomePage = ({ store }: HomePageProps) => {
  const history = useHistory();
  const StoreButtonHandle = (): void => {
    if (store.UserActivity) history.push("/store");
    else history.push("/login");
  };
  return (
    <Container>
      <ButtonContainer onClick={() => StoreButtonHandle()}>
        <Typograph>Password manager</Typograph>
      </ButtonContainer>
    </Container>
  );
};

export default inject("store")(observer(HomePage));
