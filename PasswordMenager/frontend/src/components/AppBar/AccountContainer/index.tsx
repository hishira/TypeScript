import { inject, observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { IGeneral, View } from "../../../models/General";
import { SessionStorage } from "../../../utils/localstorage.utils";
import Button from "../../Button";
import Modal from "../../Modal";
import { Translation } from "../../Translation";
import { AccountIcon } from "../../icons/AccountIcon";
import AccountInfo from "./AccountInfo";
import { AccountButtons, AccountView } from "./component.styled";

type AccountContainerProps = {
  store?: IGeneral;
};

const singleObject = {
  openMenu: false,
  setMenuOpen(value: boolean) {
    this.openMenu = value;
  },
};

const AccountContainer = ({ store }: AccountContainerProps) => {
  const [openAccountMenu, setOpenAccountMenu] = useState<boolean>(false);
  const [useInfo, setUserInfoOpen] = useState<boolean>(false);
  const hisotry = useHistory();
  const subMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("click", clickwhetheverHandler);
    return () => document.removeEventListener("click", clickwhetheverHandler);
  }, []);

  const clickwhetheverHandler = (e: Event) => {
    const isMenuOpenAndNotClicked =
      singleObject.openMenu &&
      e.target &&
      "id" in e.target &&
      subMenuRef.current?.id !== e.target?.id;
    if (isMenuOpenAndNotClicked) {
      setOpenAccountMenu((a) => {
        singleObject.setMenuOpen(false);
        return !a;
      });
    }
  };
  const logouthandle = () => {
    store?.setUserActive(false);
    SessionStorage.getInstance().removeStorage();
    hisotry.push("/login");
  };
  const clickHandle = () => {
    const currentView = store?.ViewType;
    store?.setViewType(currentView === View.Table ? View.Card : View.Table);
    setOpenAccountMenu((a) => {
      singleObject.setMenuOpen(!a);
      return !a;
    });
  };

  const accountInfoClick = () => {
    setUserInfoOpen(true);
    setOpenAccountMenu((a) => {
      singleObject.setMenuOpen(!a);
      return !a;
    });
  };

  const openHandle = (e: Event) => {
    e.stopPropagation();
    setOpenAccountMenu((a) => {
      singleObject.setMenuOpen(!a);
      return !a;
    });
  };
  return !store?.UserActivity ? null : (
    <>
      <Modal
        visible={useInfo}
        onClose={() => setUserInfoOpen(false)}
        component={<AccountInfo />}
      />
      <AccountView>
        <AccountIcon click={(e: Event) => openHandle(e)} />
        <AccountButtons id={"test"} visible={openAccountMenu} ref={subMenuRef}>
          <Button onClick={clickHandle}>
            {Translation("account.action.changeView")}
          </Button>
          <Button onClick={() => accountInfoClick()}>
            {Translation("account.action.accountInfo")}
          </Button>
          <Button onClick={logouthandle} color="lightblue">
            {Translation("account.action.logout")}
          </Button>
        </AccountButtons>
      </AccountView>
    </>
  );
};

export default inject("store")(observer(AccountContainer));
