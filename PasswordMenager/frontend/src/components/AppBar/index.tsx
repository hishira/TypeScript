import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { IGeneral, View } from "../../models/General";
import { SessionStorage } from "../../utils/localstorage.utils";
import Button from "../Button/index";
import PassBar from "../PassBarr";
import {
  AccountButtons,
  AccountView,
  Bar,
  LeftSide,
  RigthSide,
} from "./component.styled";
import { AccountIcon } from "../icons/AccountIcon";
import { useState } from "react";

type AppBarProps = {
  store?: IGeneral;
};
type AppBarLeftSideProp = {
  userActive?: boolean;
};
const AppBarLeftSide = ({ userActive }: AppBarLeftSideProp): JSX.Element => {
  return <LeftSide>{userActive ? <PassBar></PassBar> : null}</LeftSide>;
};
type AccountContainerProps = {
  store?: IGeneral;
};
const AccountContainer = ({ store }: AccountContainerProps) => {
  const [openAccountMenu, setOpenAccountMenu] = useState<boolean>(false);
  const hisotry = useHistory();

  const logouthandle = () => {
    store?.setUserActive(false);
    SessionStorage.getInstance().removeStorage();
    hisotry.push("/login");
  };
  const clickHandle = () => {
    store?.setViewType(View.Card);
  };

  return !store?.UserActivity ? null : (
    <AccountView>
      <AccountIcon click={() => setOpenAccountMenu(!openAccountMenu)} />
      <AccountButtons visible={openAccountMenu}>
        <Button onClick={logouthandle} color="lightblue">
          Logout
        </Button>
        <Button onClick={clickHandle}>Change view</Button>
      </AccountButtons>
    </AccountView>
  );
};
const AppBar = ({ store }: AppBarProps): JSX.Element => {
  return (
    <Bar>
      <AppBarLeftSide userActive={store?.UserActivity} />
      <RigthSide>
        <AccountContainer store={store} />
      </RigthSide>
    </Bar>
  );
};
export default inject("store")(observer(AppBar));
