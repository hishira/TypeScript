import { inject, observer } from "mobx-react";
import { useRef, useState } from "react";
import { IGeneral } from "../../../models/General";
import Button from "../../Button";
import Modal from "../../Modal";
import { Translation } from "../../Translation";
import { AccountIcon } from "../../icons/AccountIcon";
import AccountInfo from "./AccountInfo";
import { AccountContainerHook } from "./accountContainer.hook";
import { AccountButtons, AccountView } from "./component.styled";

type AccountContainerProps = {
  store?: IGeneral;
};

const AccountContainer = ({ store }: AccountContainerProps) => {
  const subMenuRef = useRef<HTMLDivElement>(null);
  const { accountInfoClick, clickHandle, logouthandle, openHandle, useInfo,setUseInfo,openAccountMenu } =
    AccountContainerHook(subMenuRef, store);
  return !store?.UserActivity ? null : (
    <>
      <Modal
        visible={useInfo}
        onClose={() => setUseInfo(false)}
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
          <Button onClick={logouthandle} color="lightgrey">
            {Translation("account.action.logout")}
          </Button>
        </AccountButtons>
      </AccountView>
    </>
  );
};

export default inject("store")(observer(AccountContainer));
