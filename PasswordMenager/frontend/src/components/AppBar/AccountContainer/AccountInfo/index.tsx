import { Dispatch, SetStateAction, useState } from "react";
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
type HeaderButtonsProps = {
  mainContentView: string;
  setMainContentView: Dispatch<SetStateAction<ContentType>>;
};
const HeaderButtons = ({
  mainContentView,
  setMainContentView,
}: HeaderButtonsProps) => (
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
);
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
          <UserView user={userinfo} setRefetch={setRefetch}></UserView>
          <Devider />
          <HeaderButtons
            mainContentView={mainContentView}
            setMainContentView={setMainContentView}
          />
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
