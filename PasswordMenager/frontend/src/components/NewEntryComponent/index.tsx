import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetEntryForEdit } from "../../hooks/getEntryForEdit.hook";
import { GroupEffect } from "../../hooks/groups.hook";
import { Entry } from "../../utils/entry.utils";
import Button from "../Button";
import FormElement from "../FormElement/";
import { Loading } from "../Loading";
import { EditEntryActionDispatcher } from "./EditEntryActionDispatcher";
import {
  ButtonsRangeContainer,
  CheckBox,
  EntryModalComponent,
  PassLen,
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
  const [passlen, setpasslen] = useState<number>(6);
  const [generatePasswordModal, setGeneratorPasswordModal] =
    useState<boolean>(false);
  const [, setLoading] = useState<boolean>(true);
  const [passwordcharacters, setpasswordcharacters] =
    useState<PasswordCharactersTypes>({
      letters: false,
      numbers: false,
      specialChar: false,
    });
  const [newentry, setnewentry] = useState<CreateEntryDto>({
    title: "",
    username: "",
    password: "",
    note: "",
    groupid: "",
    url: "",
    passwordExpiredDate: "",
  });
  const editEntry: EditEntryActionDispatcher = new EditEntryActionDispatcher(
    setnewentry,
    setpasswordcharacters,
    passwordcharacters,
    newentry,
    passlen
  );
  const passwordLenChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setpasslen(parseInt(e.target.value));

  const groups = GroupEffect(true);
  GetEntryForEdit(edit, editentryid, setnewentry, setLoading);
  useEffect(() => {
    setnewentry({
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
      // TODO Ref loading
      loading={false}
      ComponentToLoad={
        <EntryModalComponent disabled={generatePasswordModal}>
          <FormElement
            label={"Title"}
            inputplaceholder="Title"
            inputChange={editEntry.settitle.bind(editEntry)}
            inputtype="txt"
            value={newentry.title}
          />
          <FormElement
            label={"Username"}
            inputplaceholder="Username"
            inputChange={editEntry.setusername.bind(editEntry)}
            inputtype="txt"
            value={newentry.username}
          />
          <FormElement
            label={"Url"}
            inputplaceholder="Url link"
            inputChange={editEntry.seturl.bind(editEntry)}
            inputtype="txt"
            value={newentry.url}
          />
          <GroupSelection edit={edit} editEntry={editEntry} groups={groups} />
          <SectionContainer>
            <FormElement
              label={"Password"}
              inputplaceholder="***"
              inputChange={editEntry.setpassword.bind(editEntry)}
              inputtype="password"
              value={newentry.password}
            />
            <CheckBox type="checkbox" onChange={checkBoxHandler} />
          </SectionContainer>
          <PasswordGeneratorOption
            open={generatePasswordModal}
            editEntry={editEntry}
            passwordLength={passlen}
            passwordLengthChange={passwordLenChange}
            onClose={() => setGeneratorPasswordModal(false)}
          />
          <Button onClick={() => setGeneratorPasswordModal(true)}>
            Generator
          </Button>
          <ButtonsRangeContainer style={{ position: "relative" }}>
            <Button
              size="small"
              color="lightblue"
              onClick={editEntry.generateHandle.bind(editEntry)}
            >
              Generate
            </Button>
            <PassLen id="passlen">{passlen}</PassLen>
          </ButtonsRangeContainer>
          <FormElement
            label={"Password expire date (optional)"}
            inputplaceholder="Password expire date"
            inputChange={editEntry.setexirationpassworddate.bind(editEntry)}
            inputtype="date"
            value={newentry.passwordExpiredDate}
          />
          <FormElement
            label={"Note"}
            inputplaceholder="note..."
            inputChange={editEntry.setnote.bind(editEntry)}
            inputtype="text"
            value={newentry.note}
          />
          {!edit ? (
            <Button
              disabled={!editEntry.isFormValid}
              size="small"
              color="lightblue"
              onClick={addnewentry}
            >
              Add
            </Button>
          ) : (
            <Button size="small" color="lightblue" onClick={edithaneld}>
              Update
            </Button>
          )}
        </EntryModalComponent>
      }
    ></Loading>
  );
};
export default NewEntryComponent;
