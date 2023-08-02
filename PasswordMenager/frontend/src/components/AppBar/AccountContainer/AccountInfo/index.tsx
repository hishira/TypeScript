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

const ImportRequestElement = ({ imports }: { imports: any }) => {
  return (
    <ImportRequest>Import request {JSON.stringify(imports)}</ImportRequest>
  );
};

const LastElement = () => <Last>Last</Last>;
const GetCurrentView = (
  mainContentView: ContentType,
  imports: any
): JSX.Element => {
  return mainContentView === "Notification" ? (
    <NotificationElement />
  ) : mainContentView === "ImportRequest" ? (
    <ImportRequestElement imports={imports}></ImportRequestElement>
  ) : (
    <LastElement></LastElement>
  );
};
const AccountInfo = () => {
  const [userinfo, setUserInfo] = useState<IUser>();
  const [importRequests, setImportRequests] = useState<any>();
  const [mainContentView, setMainContentView] =
    useState<ContentType>("Notification");

  useEffect(() => {
    const firstPromise = Import.getInstance().ImportRequest();
    const secondPromise = User.getInstance().getUserInfo();
    Promise.all([firstPromise, secondPromise]).then((values) => {
      const [importsInfo, user] = values;
      setUserInfo(user);
      setImportRequests(importsInfo);
    });
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
      <AccountInfoContent>
        {GetCurrentView(mainContentView, importRequests)}
      </AccountInfoContent>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
