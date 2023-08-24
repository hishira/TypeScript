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
  UserInfoFlexContainer,
  UserInforContainer,
} from "./component.styled";
import { GetAccountInfoPromise } from "./utils";
import { ContentType, GetCurrentView } from "./AccountInfoView";
import Modal from "../../../Modal";

const UserContainer = ({ user }: { user: IUser | undefined }): JSX.Element => {
  const [userEditModalVisible, setUserModalVisible] = useState<boolean>(false);
  return (
    <>
      <Modal
        visible={userEditModalVisible}
        onClose={() => setUserModalVisible(false)}
        component={<div>View</div>}
      ></Modal>
      <UserInfoFlexContainer>
        <UserInforContainer>
          <UserInfo>
            <span>Email</span> <span>{user?.email}</span>
          </UserInfo>
          <UserInfo>
            <span>Login</span> <span>{user?.login}</span>
          </UserInfo>
        </UserInforContainer>
        <UserIcons>
          <EditIcon click={() => setUserModalVisible(true)} />
        </UserIcons>
      </UserInfoFlexContainer>
    </>
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
      <UserContainer user={userinfo}></UserContainer>
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
