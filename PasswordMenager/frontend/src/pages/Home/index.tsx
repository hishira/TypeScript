import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Translation } from "../../components/Translation";
import { IGeneral } from "../../models/General";
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
        <Typograph>{Translation("appName")}</Typograph>
      </ButtonContainer>
    </Container>
  );
};

export default inject("store")(observer(HomePage));
