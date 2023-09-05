import { useState } from "react";
import { ModalOpenUtils } from "../../../../../utils/moda.open.utils";
import {
  Buttons,
  UserEditModalView,
  UserIcons,
  UserInfo,
  UserInfoFlexContainer,
  UserInforContainer,
  UserTitleText,
} from "./component.styled";
import Modal from "../../../../Modal";
import { EditIcon } from "../../../../icons/EditIcon";
import Button from "../../../../Button";

const UserEditModalComponent = () => {
  return <UserEditModalView>Test</UserEditModalView>;
};
export const UserView = ({
  user,
}: {
  user: IUser | undefined;
}): JSX.Element => {
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
          <UserTitleText>User information:</UserTitleText>
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
