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
import Button from "../../../Button/index";
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
const NotificationElement = () => {
  return <Notification>Notifications</Notification>;
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
      </div>
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
    </ImportRequest>
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
