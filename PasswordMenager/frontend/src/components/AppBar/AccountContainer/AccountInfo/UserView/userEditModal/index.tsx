import { useState } from "react";
import Button from "../../../../../Button";
import FormElement from "../../../../../FormElement";
import { Translation } from "../../../../../Translation";
import { MoreOptionIcon } from "../../../../../icons/MoreOption";
import {
  FormElements,
  IconHoover,
  PasswordText,
  UserEditModalButtons,
  UserEditModalContainer,
  UserEditModalView,
  UserEditTitle,
} from "./component.styled";
import {
  GetPartialDefinedField,
  IsImportPasswordDefined,
  IsUserPasswordNotDefined,
} from "./utils";
import { ValidatorForm } from "../../../../../ValidatorForm";
import { Validators } from "../../../../../ValidatorForm/validators";

type UserEditModalType = {
  user: IUser | undefined;
  changeHandle: (partialUser: UserUpdate) => void;
  onClose: () => void;
};
export const UserEditModalComponent = ({
  user,
  changeHandle,
  onClose,
}: UserEditModalType) => {
  const [login, setLogin] = useState<string>(user ? user.login : "");
  const [email, setEmail] = useState<string>(user ? user.email : "");
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [importPassword, setImportPassword] = useState<string | undefined>(
    (user ? user.defaultPasswordForEntries : undefined) ?? undefined
  );
  const [isAdvanceOptionVisible, setAdvanceOption] = useState<boolean>(false);
  const onSaveHandler = () => {
    const isPasswordNotDefined = IsUserPasswordNotDefined(password);
    const isImportPasswordDefined = IsImportPasswordDefined(importPassword);
    changeHandle(
      GetPartialDefinedField(
        { login, email, password, importPassword },
        isPasswordNotDefined,
        isImportPasswordDefined
      )
    );
  };
  return (
    <UserEditModalView>
      <UserEditTitle>
        <span>
          {Translation("editusermodal.importpassword.infomodal.title")}
        </span>
        <IconHoover>
          <MoreOptionIcon
            click={() =>
              !isAdvanceOptionVisible
                ? setAdvanceOption(true)
                : setAdvanceOption(false)
            }
          />
          <span test-tooltip="test">
            {Translation("editusermodal.importpassword.infomodal.moreOption")}
          </span>
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
          <ValidatorForm
            validators={[Validators.EmailValidation]}
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
              withTooltip={true}
              tooltipText="editusermodal.importpassword.infomodal"
              label={"userinformation.edit.importPassword.label"}
              inputplaceholder="userinformation.edit.importPassword.label"
              inputChange={(e) => {
                setImportPassword(e.target.value);
              }}
              inputtype="txt"
              fontSize="18px"
              width="80%"
              inputFontSize="16px"
              value={importPassword}
            />
          </FormElements>
        ) : null}
        <PasswordText>
          {Translation(
            "editusermodal.importpassword.infomodal.editPasswordTest"
          )}
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
          <Button onClick={onClose}>
            {Translation(
              "editusermodal.importpassword.infomodal.button.cancel"
            )}
          </Button>
          <Button onClick={onSaveHandler}>
            {Translation("editusermodal.importpassword.infomodal.button.save")}
          </Button>
        </UserEditModalButtons>
      </UserEditModalContainer>
    </UserEditModalView>
  );
};
