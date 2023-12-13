import { useState } from "react";
import { ModalOpenUtils } from "../../../../../utils/moda.open.utils";
import Modal from "../../../../Modal";
import { Translation } from "../../../../Translation";
import { EditIcon } from "../../../../icons/EditIcon";
import {
  UserIcons,
  UserInfo,
  UserInfoFlexContainer,
  UserInforContainer,
  UserTitleText,
} from "./component.styled";
import { UserEditModalComponent } from "./userEditModal";
import { User } from "../../../../../utils/user.utils";

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

  const saveUserHandle = (user: UserUpdate) => {
    const isLoginEmpty = 'login' in user && user.login === '';
    const isEmailEmpty = 'email' in user && user.email === '';
    if(isLoginEmpty || isEmailEmpty) return;
    User.getInstance().updateUser(user);
  };
  return (
    <>
      <Modal
        visible={userEditModalVisible}
        onClose={() => closeCheck()}
        component={
          <UserEditModalComponent
            user={user}
            onClose={() => closeCheck()}
            changeHandle={saveUserHandle}
          />
        }
      ></Modal>
      <UserInfoFlexContainer>
        <UserInforContainer>
          <UserTitleText>
            {Translation("userinformation.userinfo")}
          </UserTitleText>
          <UserInfo>
            <span>{Translation("userinformation.email")}</span>{" "}
            <span>{user?.email}</span>
          </UserInfo>
          <UserInfo>
            <span>{Translation("userinformation.login")}</span>{" "}
            <span>{user?.login}</span>
          </UserInfo>
        </UserInforContainer>
        <UserIcons>
          <EditIcon click={() => check()} />
        </UserIcons>
      </UserInfoFlexContainer>
    </>
  );
};
