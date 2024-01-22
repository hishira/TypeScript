import { inject, observer } from "mobx-react";
import { Dispatch, SetStateAction, useState } from "react";
import { IGeneral } from "../../../../../models/General";
import { ModalOpenUtils } from "../../../../../utils/moda.open.utils";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../utils/popup.utils";
import { User } from "../../../../../utils/user.utils";
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

const UserView = ({
  user,
  store,
  setRefetch,
}: {
  user: IUser | undefined;
  store?: IGeneral;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const [userEditModalVisible, setUserModalVisible] = useState<boolean>(false);
  const check = () => {
    setUserModalVisible(true);
    ModalOpenUtils.getInstance().CloseModal = true;
  };

  const closeCheck = () => {
    setUserModalVisible(false);
    ModalOpenUtils.getInstance().CloseModal = false;
    setRefetch((a) => !a);
  };

  const saveUserHandle = (user: UserUpdate) => {
    const isLoginEmpty = "login" in user && user.login === "";
    const isEmailEmpty = "email" in user && user.email === "";
    if (isLoginEmpty || isEmailEmpty) return;
    User.getInstance()
      .updateUser(user)
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          store?.setPopUpinfo(SuccessPopUpObject("User successfull update"));
        } else {
          store?.setPopUpinfo(
            ErrorPopUpObject("Error occur while user update")
          );
        }
        closeCheck();
      });
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

export default inject("store")(observer(UserView));
