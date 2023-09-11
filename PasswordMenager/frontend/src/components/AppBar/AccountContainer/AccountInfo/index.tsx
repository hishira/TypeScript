import { useEffect, useState } from "react";
import { ContentType, GetCurrentView } from "./AccountInfoView";
import {
  AccountInfoContainer,
  AccountInfoContent,
  AccountInfoHeader,
  Devider,
  HeaderButton,
} from "./component.styled";
import { GetAccountInfoPromise } from "./utils";
import { UserView } from "./UserView";
import { Translation } from "../../../Translation";
import { Loading } from "../../../Loading";

const AccountInfo = () => {
  const [userinfo, setUserInfo] = useState<IUser>();
  const [importRequests, setImportRequests] = useState<any[]>([]);
  const [notification, setNotification] = useState<any[]>([]);
  const [mainContentView, setMainContentView] =
    useState<ContentType>("Notification");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    GetAccountInfoPromise().then((values) => {
      const [importsInfo, user, activeNotifications] = values;
      setUserInfo(user);
      setImportRequests(importsInfo);
      setNotification(activeNotifications);
      setLoading(false);
    });
  }, []);

  const setMainContent = (contentType: ContentType) =>
    setMainContentView(contentType);

  return (
    <AccountInfoContainer>
      <Loading
        loading={loading}
        ComponentToLoad={<UserView user={userinfo}></UserView>}
      />
      <Devider />
      <Loading
        loading={loading}
        ComponentToLoad={
          <>
            <AccountInfoHeader>
              <HeaderButton
                onClick={() => setMainContent("Notification")}
                active={mainContentView === "Notification"}
              >
                {Translation("account.view.accountInfo.notification")}
              </HeaderButton>
              <HeaderButton
                onClick={() => setMainContent("ImportRequest")}
                active={mainContentView === "ImportRequest"}
              >
                {Translation("account.view.accountInfo.importRequest")}
              </HeaderButton>
              <HeaderButton
                onClick={() => setMainContent("Last")}
                active={mainContentView === "Last"}
              >
                {Translation("account.view.accountInfo.lastDeleted")}
              </HeaderButton>
            </AccountInfoHeader>
            <Devider />
            <AccountInfoContent>
              {GetCurrentView(mainContentView, importRequests, notification)}
            </AccountInfoContent>
          </>
        }
      />
    </AccountInfoContainer>
  );
};

export default AccountInfo;
