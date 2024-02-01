import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Translation } from "../../components/Translation";
import { IGeneral } from "../../models/General";
import {
  ApplicationDatabase,
  ApplicationDatabaseType,
} from "../../models/applicationDatabase";
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

  const StoreButtonHandle = async (): Promise<void> => {
    
    if (store.UserActivity) history.push("/store");
    else history.push("/login");
    ApplicationDatabase.getInstance().DataBaseType =
      ApplicationDatabaseType.ONLINE;
    store.setIsLocal(false);
  };

  const localButtonHandle = async () => {
    if (store.UserActivity) history.push("/store");
    else history.push("/login");
    ApplicationDatabase.getInstance().DataBaseType =
      ApplicationDatabaseType.LOCAL;
    store.setIsLocal(true);
  };
  return (
    <Container>
      <Typograph>{Translation("appName")}</Typograph>
      <ButtonsContainer>
        <ButtonContainer onClick={() => StoreButtonHandle()}>
          Online
        </ButtonContainer>
        <ButtonContainer onClick={() => localButtonHandle()}>
          Local
        </ButtonContainer>
      </ButtonsContainer>
    </Container>
  );
};

export default inject("store")(observer(HomePage));
