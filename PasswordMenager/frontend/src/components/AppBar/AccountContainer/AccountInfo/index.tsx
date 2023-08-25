import { useEffect, useState } from "react";
import Modal from "../../../Modal";
import { EditIcon } from "../../../icons/EditIcon";
import { ContentType, GetCurrentView } from "./AccountInfoView";
import {
  AccountInfoContainer,
  AccountInfoContent,
  AccountInfoHeader,
  HeaderButton,
  UserEditModalView,
  UserIcons,
  UserInfo,
  UserInfoFlexContainer,
  UserInforContainer,
} from "./component.styled";
import { GetAccountInfoPromise } from "./utils";
import { ModalOpenUtils } from "../../../../utils/moda.open.utils";

const UserEditModalComponent = () => {
  return <UserEditModalView>Test</UserEditModalView>;
};
const UserContainer = ({ user }: { user: IUser | undefined }): JSX.Element => {
  const [userEditModalVisible, setUserModalVisible] = useState<boolean>(false);
  const check = () => {
    setUserModalVisible(true);
    ModalOpenUtils.getInstance().CloseModal = true;
  };

  const closeCheck = () => {
    setUserModalVisible(false);
    ModalOpenUtils.getInstance().CloseModal = false;
  };
  return (
    <>
      <Modal
        visible={userEditModalVisible}
        onClose={() => closeCheck()}
        component={<UserEditModalComponent />}
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
          <EditIcon click={() => check()} />
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
