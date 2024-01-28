import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Translation } from "../../components/Translation";
import { IGeneral } from "../../models/General";
import {
  ButtonContainer,
  ButtonsContainer,
  Container,
  Typograph,
} from "./component.styled";
type HomePageProps = {
  store: IGeneral;
};

const HomePage = ({ store }: HomePageProps): JSX.Element => {
  const history = useHistory();
  const StoreButtonHandle = (): void => {
    if (store.UserActivity) history.push("/store");
    else history.push("/login");
  };
  return (
    <Container>
      <Typograph>{Translation("appName")}</Typograph>
      <ButtonsContainer>
        <ButtonContainer onClick={() => StoreButtonHandle()}>
          Online
        </ButtonContainer>
        <ButtonContainer>Local</ButtonContainer>
      </ButtonsContainer>
    </Container>
  );
};

export default inject("store")(observer(HomePage));
