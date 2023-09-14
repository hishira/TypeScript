import { useState } from "react";
import { ModalOpenUtils } from "../../../../../utils/moda.open.utils";
import Button from "../../../../Button";
import FormElement from "../../../../FormElement";
import Modal from "../../../../Modal";
import { Translation } from "../../../../Translation";
import { EditIcon } from "../../../../icons/EditIcon";
import {
  FormElements,
  PasswordText,
  UserEditModalContainer,
  UserEditModalView,
  UserEditTitle,
  UserIcons,
  UserInfo,
  UserInfoFlexContainer,
  UserInforContainer,
  UserTitleText,
} from "./component.styled";

const UserEditModalComponent = ({ user }: any) => {
  const [isAdvancePossile, setIsAdvancePossible] = useState<boolean>(false);
  return (
    <UserEditModalView>
      <UserEditTitle>Edit user infromation</UserEditTitle>
      <Button onClick={() => setIsAdvancePossible(true)}>Advance</Button>
      <UserEditModalContainer>
        <FormElements>
          <FormElement
            label={"userinformation.edit.login.label"}
            inputplaceholder="userinformation.edit.login.label"
            inputChange={() => {}}
            inputtype="txt"
            fontSize="18px"
            width="80%"
            inputFontSize="16px"
            value={user.login}
          />
          <FormElement
            label={"userinformation.edit.email.label"}
            inputplaceholder="userinformation.edit.email.label"
            inputChange={() => {}}
            inputtype="txt"
            fontSize="18px"
            width="80%"
            inputFontSize="16px"
            value={user.email}
          />
        </FormElements>
        <PasswordText>
          Password (will replace the old one if specified)
        </PasswordText>
        <FormElements>
          <FormElement
            label={"userinformation.edit.password.label"}
            inputplaceholder="userinformation.edit.password.placeholder"
            inputChange={() => {}}
            fontSize="16px"
            width="80%"
            inputFontSize="16px"
            inputtype="password"
            value={""}
          />
          <FormElement
            label={"userinformation.edit.confirmpassword.label"}
            inputplaceholder="userinformation.edit.confirmpassword.label"
            inputChange={() => {}}
            fontSize="16px"
            width="80%"
            inputFontSize="16px"
            inputtype="password"
            value={""}
          />
        </FormElements>
      </UserEditModalContainer>
    </UserEditModalView>
  );
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
        component={<UserEditModalComponent user={user} />}
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
