import { useEffect, useState } from "react";
import { Import } from "../../../../utils/import.utils";
import Button from "../../../Button/index";
import { EditIcon } from "../../../icons/EditIcon";
import {
  AccountInfoContainer,
  AccountInfoContent,
  AccountInfoHeader,
  HeaderButton,
  ImportRequest,
  Imports,
  Last,
  Notification,
  UserIcons,
  UserInfo,
  UserInforContainer,
} from "./component.styled";
import { GetAccountInfoPromise } from "./utils";
type ContentType = "Notification" | "ImportRequest" | "Last";
type ImportRequestData = {
  _id: string;
  created: string;
  state: string;
  userid: string;
  entriesToImport: {
    email: string;
    password: string;
    title: string;
    url: string;
    username: string;
  }[];
};
const NotificationElement = ({ notification }: { notification: any[] }) => {
  // TODO: Add notification which expire password
  return (
    <Notification>
      Number of active notification {notification.length}
    </Notification>
  );
};

const ImportRequestElement = ({
  imports,
}: {
  imports: ImportRequestData[];
}) => {
  const activateImportRequest = (importRequestId: string) => {
    Import.getInstance().AcceptImportRequest(importRequestId).then(console.log);
  };

  return (
    <ImportRequest>
      <div>
        <span>Import state</span>
        <span>Created at</span>
        <span>Number of entries to add</span>
        <span></span>
      </div>
      <Imports>
        {imports.map((importVal) => (
          <div key={importVal._id}>
            <span>{importVal.state}</span>
            <span>{importVal.created?.slice(0, 10)}</span>
            <span>{importVal.entriesToImport.length}</span>
            <Button onClick={() => activateImportRequest(importVal._id)}>
              Activate
            </Button>
          </div>
        ))}
      </Imports>
    </ImportRequest>
  );
};

const LastElement = () => <Last>Last</Last>;
const GetCurrentView = (
  mainContentView: ContentType,
  imports: any,
  notification: any
): JSX.Element => {
  return mainContentView === "Notification" ? (
    <NotificationElement notification={notification} />
  ) : mainContentView === "ImportRequest" ? (
    <ImportRequestElement imports={imports}></ImportRequestElement>
  ) : (
    <LastElement></LastElement>
  );
};
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
        {GetCurrentView(mainContentView, importRequests, notification)}
      </AccountInfoContent>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
