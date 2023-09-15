import { useState } from "react";
import { ModalOpenUtils } from "../../../../../utils/moda.open.utils";
import Button from "../../../../Button";
import FormElement from "../../../../FormElement";
import Modal from "../../../../Modal";
import { Translation } from "../../../../Translation";
import { EditIcon } from "../../../../icons/EditIcon";
import {
  FormElements,
  IconHoover,
  PasswordText,
  UserEditModalButtons,
  UserEditModalContainer,
  UserEditModalView,
  UserEditTitle,
  UserIcons,
  UserInfo,
  UserInfoFlexContainer,
  UserInforContainer,
  UserTitleText,
} from "./component.styled";
import { MoreOptionIcon } from "../../../../icons/MoreOption";

const UserEditModalComponent = ({ user, onClose }: any) => {
  const [login, setLogin] = useState<string>(user.login);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [isAdvanceOptionVisible, setAdvanceOption] = useState<boolean>(false);

  return (
    <UserEditModalView>
      <UserEditTitle>
        <span>Edit user infromation</span>
        <IconHoover>
          <MoreOptionIcon click={() => setAdvanceOption(true)} />
          <span test-tooltip="test">More option</span>
        </IconHoover>
      </UserEditTitle>
      <UserEditModalContainer>
        <FormElements>
          <FormElement
            label={"userinformation.edit.login.label"}
            inputplaceholder="userinformation.edit.login.label"
            inputChange={(e) => {
              setLogin(e.target.value);
            }}
            inputtype="txt"
            fontSize="18px"
            width="80%"
            inputFontSize="16px"
            value={login}
          />
          <FormElement
            label={"userinformation.edit.email.label"}
            inputplaceholder="userinformation.edit.email.label"
            inputChange={(e) => {
              setEmail(e.target.value);
            }}
            inputtype="txt"
            fontSize="18px"
            width="80%"
            inputFontSize="16px"
            value={email}
          />
        </FormElements>
        {isAdvanceOptionVisible ? (
          <FormElements>
            <FormElement
              label={"userinformation.edit.importPassword.label"}
              inputplaceholder="userinformation.edit.importPassword.label"
              inputChange={(e) => {}}
              inputtype="txt"
              fontSize="18px"
              width="80%"
              inputFontSize="16px"
              value={""}
            />
          </FormElements>
        ) : null}
        <PasswordText>
          Password (will replace the old one if specified)
        </PasswordText>
        <FormElements>
          <FormElement
            label={"userinformation.edit.password.label"}
            inputplaceholder="userinformation.edit.password.placeholder"
            inputChange={(e) => {
              setPassword(e.target.value);
            }}
            fontSize="16px"
            width="80%"
            inputFontSize="16px"
            inputtype="password"
            value={password}
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
        <UserEditModalButtons>
          <Button onClick={onClose}>Cancel</Button>
          <Button>Save</Button>
        </UserEditModalButtons>
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
        component={
          <UserEditModalComponent user={user} onClose={() => closeCheck()} />
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
