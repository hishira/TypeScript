import { useState } from "react";
import { IGeneral, View } from "../../../models/General";
import { useHistory } from "react-router-dom";
import { SessionStorage } from "../../../utils/localstorage.utils";
import { AccountButtons, AccountView } from "./component.styled";
import { AccountIcon } from "../../icons/AccountIcon";
import Button from "../../Button";
import { inject, observer } from "mobx-react";

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
    const currentView = store?.ViewType;
    store?.setViewType(currentView === View.Table ? View.Card : View.Table);
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

export default inject("store")(observer(AccountContainer));
