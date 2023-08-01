import { useEffect, useState } from "react";
import { Import } from "../../../../utils/import.utils";
import { User } from "../../../../utils/user.utils";
import { EditIcon } from "../../../icons/EditIcon";
import {
  AccountInfoContainer,
  AccountInfoContent,
  AccountInfoHeader,
  HeaderButton,
  ImportRequest,
  Last,
  Notification,
  UserIcons,
  UserInfo,
  UserInforContainer,
} from "./component.styled";
type ContentType = "Notification" | "ImportRequest" | "Last";

const NotificationElement = () => {
  return <Notification>Notifications</Notification>;
};

const ImportRequestElement = () => {
  const [imports, setImports] = useState<any>();
  useEffect(() => {
    Import.getInstance()
      .ImportRequest()
      .then((val) => setImports(val));
  }, []);
  return (
    <ImportRequest>Import request {JSON.stringify(imports)}</ImportRequest>
  );
};

const LastElement = () => <Last>Last</Last>;
const GetCurrentView = (mainContentView: ContentType): JSX.Element => {
  return mainContentView === "Notification" ? (
    <NotificationElement />
  ) : mainContentView === "ImportRequest" ? (
    <ImportRequestElement></ImportRequestElement>
  ) : (
    <LastElement></LastElement>
  );
};
const AccountInfo = () => {
  const [userinfo, setUserInfo] = useState<IUser>();
  const [mainContentView, setMainContentView] =
    useState<ContentType>("Notification");
  useEffect(() => {
    Import.getInstance()
      .ImportRequest()
      .then((userInfo) => setUserInfo(userInfo));
  }, []);

  const setMainContent = (contentType: ContentType) =>
    setMainContentView(contentType);

  return (
    <AccountInfoContainer>
      <UserIcons>
        <EditIcon />
      </UserIcons>
      <UserInforContainer>
        <UserInfo>
          <span>Email</span> <span>{userinfo?.email}</span>
        </UserInfo>
        <UserInfo>
          <span>Login</span> <span>{userinfo?.login}</span>
        </UserInfo>
      </UserInforContainer>
      <AccountInfoHeader>
        <HeaderButton onClick={() => setMainContent("Notification")}>
          Notification
        </HeaderButton>
        <HeaderButton onClick={() => setMainContent("ImportRequest")}>
          Import request
        </HeaderButton>
        <HeaderButton onClick={() => setMainContent("Last")}>
          Last deleted
        </HeaderButton>
      </AccountInfoHeader>
      <AccountInfoContent>{GetCurrentView(mainContentView)}</AccountInfoContent>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
