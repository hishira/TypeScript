import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { inject, observer } from "mobx-react";
import { IGeneral } from "../../models/General";
import { useHistory } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 90vh;
`;
const Typograph = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

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
      <Typograph>Hello</Typograph>
      <Button color="lightblue" onClick={() => StoreButtonHandle()}>
        Store
      </Button>
    </Container>
  );
};

export default inject("store")(observer(HomePage));
