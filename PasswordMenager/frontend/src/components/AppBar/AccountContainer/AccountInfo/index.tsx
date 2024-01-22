import { useState } from "react";
import { AccountInfoEffect } from "../../../../hooks/accountInfo.hook";
import { Loading } from "../../../Loading";
import { Translation } from "../../../Translation";
import { ContentType, GetCurrentView } from "./AccountInfoView";
import UserView from "./UserView";
import {
  AccountInfoContainer,
  AccountInfoContent,
  AccountInfoHeader,
  Devider,
  HeaderButton,
} from "./component.styled";

const AccountInfo = () => {
  const [mainContentView, setMainContentView] =
    useState<ContentType>("Notification");
  const [refetch, setRefetch] = useState<boolean>(false);
  const { userinfo, importRequests, loading } = AccountInfoEffect(refetch);

  return (
    <Loading
      loading={loading}
      ComponentToLoad={
        <AccountInfoContainer>
          <UserView user={userinfo} setRefetch={setRefetch}></UserView> <Devider />
          <AccountInfoHeader>
            <HeaderButton
              onClick={() => setMainContentView("Notification")}
              active={mainContentView === "Notification"}
            >
              {Translation("account.view.accountInfo.notification")}
            </HeaderButton>
            <HeaderButton
              onClick={() => setMainContentView("ImportRequest")}
              active={mainContentView === "ImportRequest"}
            >
              {Translation("account.view.accountInfo.importRequest")}
            </HeaderButton>
            <HeaderButton
              onClick={() => setMainContentView("Last")}
              active={mainContentView === "Last"}
            >
              {Translation("account.view.accountInfo.lastDeleted")}
            </HeaderButton>
          </AccountInfoHeader>
          <Devider />
          <AccountInfoContent>
            {GetCurrentView(mainContentView, importRequests, setRefetch)}
          </AccountInfoContent>
        </AccountInfoContainer>
      }
    />
  );
};

export default AccountInfo;
