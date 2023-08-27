import { useEffect, useState } from "react";
import { ContentType, GetCurrentView } from "./AccountInfoView";
import {
  AccountInfoContainer,
  AccountInfoContent,
  AccountInfoHeader,
  HeaderButton,
} from "./component.styled";
import { GetAccountInfoPromise } from "./utils";
import { UserView } from "./UserView";

const AccountInfo = () => {
  const [userinfo, setUserInfo] = useState<IUser>();
  const [importRequests, setImportRequests] = useState<any[]>([]);
  const [notification, setNotification] = useState<any[]>([]);
  const [mainContentView, setMainContentView] =
    useState<ContentType>("Notification");

  useEffect(() => {
    GetAccountInfoPromise().then((values) => {
      const [importsInfo, user, activeNotifications] = values;
      setUserInfo(user);
      setImportRequests(importsInfo);
      setNotification(activeNotifications);
    });
  }, []);

  const setMainContent = (contentType: ContentType) =>
    setMainContentView(contentType);

  return (
    <AccountInfoContainer>
      <UserView user={userinfo}></UserView>
      <AccountInfoHeader>
        <HeaderButton
          onClick={() => setMainContent("Notification")}
          active={mainContentView === "Notification"}
        >
          Notification
        </HeaderButton>
        <HeaderButton
          onClick={() => setMainContent("ImportRequest")}
          active={mainContentView === "ImportRequest"}
        >
          Import request
        </HeaderButton>
        <HeaderButton
          onClick={() => setMainContent("Last")}
          active={mainContentView === "Last"}
        >
          Last deleted
        </HeaderButton>
      </AccountInfoHeader>
      <AccountInfoContent>
        {GetCurrentView(mainContentView, importRequests, notification)}
      </AccountInfoContent>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
