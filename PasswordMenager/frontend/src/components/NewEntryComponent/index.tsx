import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetEntryForEdit } from "../../hooks/getEntryForEdit.hook";
import { GroupEffect } from "../../hooks/groups.hook";
import { Entry } from "../../utils/entry.utils";
import Button from "../Button";
import FormElement from "../FormElement/";
import { Loading } from "../Loading";
import { Translation } from "../Translation";
import { HideIcon } from "../icons/HideIcon";
import { ShowIcon } from "../icons/ShowIcon";
import { EditEntryActionDispatcher } from "./EditEntryActionDispatcher";
import {
  ButtonsRangeContainer,
  EntryModalComponent,
  PasswordFormContainer,
  SectionContainer,
} from "./component.styled";
import { GroupSelection, PasswordGeneratorOption } from "./helpers";
import { checkBoxHandler } from "./new-entry.utils";

export type PasswordCharactersTypes = {
  letters: boolean;
  numbers: boolean;
  specialChar: boolean;
};
type NewEntryProps = {
  edit?: boolean;
  editentryid?: string;
  refreshentry: boolean;
  refresh?: Function;
  closeModalDispatcherHandle?: Dispatch<SetStateAction<boolean>>;
};

const NewEntryComponent = ({
  edit,
  editentryid,
  refreshentry,
  refresh,
  closeModalDispatcherHandle,
}: NewEntryProps): JSX.Element => {
  const [passlen, setPasslen] = useState<number>(6);
  const [generatePasswordModal, setGeneratePasswordModal] =
    useState<boolean>(false);
  const [passwordcharacters, setPasswordcharacters] =
    useState<PasswordCharactersTypes>({
      letters: false,
      numbers: false,
      specialChar: false,
    });
  const [loading, setLoading] = useState<boolean>(false);
  const [newentry, setNewentry] = useState<CreateEntryDto>({
    title: "",
    username: "",
    password: "",
    note: "",
    groupid: "",
    url: "",
    passwordExpiredDate: "",
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const passwordVisibleFunc = (ps: boolean) => {
    setPasswordVisible(ps);
    checkBoxHandler({ target: { checked: ps } });
  };
  const editEntry: EditEntryActionDispatcher = new EditEntryActionDispatcher(
    setNewentry,
    setPasswordcharacters,
    passwordcharacters,
    newentry,
    passlen
  );
  const passwordLenChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasslen(parseInt(e.target.value));

  const groups = GroupEffect(true);
  GetEntryForEdit(edit, editentryid, setNewentry, setLoading);
  useEffect(() => {
    setNewentry({
      title: "",
      username: "",
      password: "",
      note: "",
      groupid: "",
      url: "",
      passwordExpiredDate: "",
    });
  }, [refreshentry]);

  const addnewentry = async (): Promise<void> => {
    // TODO: Prevent from doing if inputs are empty even if
    // TODO: Ref
    const newEntry = newentry;
    if (newEntry.passwordExpiredDate === "")
      delete newEntry.passwordExpiredDate;
    Entry.getInstance()
      .CreateNewEntryUser(newEntry)
      .then((responsenewentry) => {
        if (responsenewentry.status) {
          editEntry.clearInputData();
        }
      })
      .catch(console.error);
  };

  const getRechangeObject = (): EditEntry => {
    return {
      _id: editentryid,
      title: newentry.title,
      username: newentry.username,
      password: newentry.password,
      note: newentry.note,
      url: newentry.url,
      passwordExpiredDate: newentry.passwordExpiredDate,
    };
  };

  const edithaneld = (): void => {
    if (editentryid !== "") {
      const editedvalues: EditEntry = getRechangeObject();
      Entry.getInstance()
        .EntryEditById(editedvalues)
        .then((response) => {
          if (response.status) {
            closeModalDispatcherHandle?.(false);
            if (refresh !== undefined) refresh();
          }
        })
        .catch((e) => e && console.error(e));
    }
  };

  return (
    <Loading
      loading={loading}
      ComponentToLoad={
        <EntryModalComponent disabled={generatePasswordModal}>
          <FormElement
            label={"newentry.field.title"}
            inputplaceholder="newentry.field.title"
            inputChange={editEntry.settitle.bind(editEntry)}
            inputtype="txt"
            value={newentry.title}
          />
          <FormElement
            label={"newentry.field.username"}
            inputplaceholder="newentry.field.username"
            inputChange={editEntry.setusername.bind(editEntry)}
            inputtype="txt"
            value={newentry.username}
          />
          <SectionContainer>
            <PasswordFormContainer>
              <FormElement
                label={"newentry.field.password"}
                inputplaceholder="***"
                width="90%"
                inputChange={editEntry.setpassword.bind(editEntry)}
                inputtype="password"
                value={newentry.password}
              />
              {!passwordVisible ? (
                <ShowIcon click={() => passwordVisibleFunc(true)} />
              ) : (
                <HideIcon click={() => passwordVisibleFunc(false)} />
              )}
            </PasswordFormContainer>
            <FormElement
              fontSize="14px"
              width="30%"
              label={"newentry.field.passwordExpireDate"}
              inputplaceholder="newentry.field.passwordExpireDate.placeholder"
              inputChange={editEntry.setexirationpassworddate.bind(editEntry)}
              inputtype="date"
              value={newentry.passwordExpiredDate}
            />
          </SectionContainer>
          <PasswordGeneratorOption
            open={generatePasswordModal}
            editEntry={editEntry}
            passwordLength={passlen}
            passwordLengthChange={passwordLenChange}
            onClose={() => setGeneratePasswordModal(false)}
          />

          <ButtonsRangeContainer style={{ position: "relative" }}>
            <Button onClick={() => setGeneratePasswordModal(true)}>
              {Translation("newentry.action.generator")}
            </Button>
          </ButtonsRangeContainer>

          <FormElement
            label={"newentry.field.url"}
            inputplaceholder="newentry.field.url.placeholder"
            inputChange={editEntry.seturl.bind(editEntry)}
            inputtype="txt"
            value={newentry.url}
          />
          <FormElement
            label={"newentry.field.passwordExpireDate.note"}
            inputplaceholder="newentry.field.passwordExpireDate.note.placehodler"
            inputChange={editEntry.setnote.bind(editEntry)}
            inputtype="text"
            value={newentry.note}
          />

          <GroupSelection edit={edit} editEntry={editEntry} groups={groups} />

          {!edit ? (
            <Button
              disabled={!editEntry.isFormValid}
              size="small"
              color="whitesmoke"
              onClick={addnewentry}
            >
              {Translation("newentry.action.add")}
            </Button>
          ) : (
            <Button
              disabled={!editEntry.isFormValid}
              size="small"
              color="lightblue"
              onClick={edithaneld}
            >
              {Translation("newentry.action.update")}
            </Button>
          )}
        </EntryModalComponent>
      }
    ></Loading>
  );
};
export default NewEntryComponent;
