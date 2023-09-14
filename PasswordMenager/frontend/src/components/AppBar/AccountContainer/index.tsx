import { useState } from "react";
import { IGeneral, View } from "../../../models/General";
import { useHistory } from "react-router-dom";
import { SessionStorage } from "../../../utils/localstorage.utils";
import { AccountButtons, AccountView } from "./component.styled";
import { AccountIcon } from "../../icons/AccountIcon";
import Button from "../../Button";
import { inject, observer } from "mobx-react";
import Modal from "../../Modal";
import AccountInfo from "./AccountInfo";
import { Translation } from "../../Translation";

type AccountContainerProps = {
  store?: IGeneral;
};

const AccountContainer = ({ store }: AccountContainerProps) => {
  const [openAccountMenu, setOpenAccountMenu] = useState<boolean>(false);
  const [useInfo, setUserInfoOpen] = useState<boolean>(false);
  const hisotry = useHistory();

  const logouthandle = () => {
    store?.setUserActive(false);
    SessionStorage.getInstance().removeStorage();
    hisotry.push("/login");
  };
  const clickHandle = () => {
    const currentView = store?.ViewType;
    store?.setViewType(currentView === View.Table ? View.Card : View.Table);
    setOpenAccountMenu(!openAccountMenu);
  };

  const accountInfoClick = () => {
    setUserInfoOpen(true);
    setOpenAccountMenu(!openAccountMenu);
  };

  return !store?.UserActivity ? null : (
    <>
      <Modal
        visible={useInfo}
        onClose={() => setUserInfoOpen(false)}
        component={<AccountInfo />}
      />
      <AccountView>
        <AccountIcon click={() => setOpenAccountMenu(!openAccountMenu)} />
        <AccountButtons visible={openAccountMenu}>
          <Button onClick={clickHandle}>{Translation('account.action.changeView')}</Button>
          <Button onClick={() => accountInfoClick()}>{Translation('account.action.accountInfo')}</Button>
          <Button onClick={logouthandle} color="lightblue">
          {Translation('account.action.logout')}
          </Button>
        </AccountButtons>
      </AccountView>
    </>
  );
};

export default inject("store")(observer(AccountContainer));
