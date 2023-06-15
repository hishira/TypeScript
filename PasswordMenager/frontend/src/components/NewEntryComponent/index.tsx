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
  Checkboxes,
  Checkboxwithlabel,
  EntryModalComponent,
  GeneratorInsideModal,
  GeneratorModal,
  GeneratorSecionContainer,
  NormalContainer,
  OptionContainer,
  PassLen,
  PasswordCheckbox,
  SectionContainer,
  SelectContainer,
  SelectLabel,
} from "./component.styled";
import { checkBoxHandler } from "./new-entry.utils";
import { CloseIcon } from "../icons/CloseIcon";
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
type GroupSelection = {
  edit: boolean | undefined;
  editEntry: EditEntryActionDispatcher;
  groups: IGroup[];
};
const GroupSelection = ({ edit, editEntry, groups }: GroupSelection) =>
  !edit ? (
    <NormalContainer>
      <SelectLabel>Select group</SelectLabel>
      <SelectContainer onChange={editEntry.groupset.bind(editEntry)}>
        {groups.map((group) => (
          <OptionContainer key={group._id} value={group._id}>
            {group.name}
          </OptionContainer>
        ))}
      </SelectContainer>
    </NormalContainer>
  ) : null;

type PasswordGeneratorOption = {
  editEntry: EditEntryActionDispatcher;
  open: boolean;
  passwordLength: number;
  passwordLengthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
};
const PasswordGeneratorOption = ({
  editEntry,
  open,
  passwordLength,
  passwordLengthChange,
  onClose,
}: PasswordGeneratorOption) => {
  return open ? (
    <GeneratorModal>
      <GeneratorInsideModal>
        <CloseIcon click={onClose} />
        <GeneratorSecionContainer>
          <Checkboxes>
            <Checkboxwithlabel>
              <PasswordCheckbox
                type="checkbox"
                onChange={editEntry.letterscheckbox.bind(editEntry)}
              />
              <div>Letters</div>
            </Checkboxwithlabel>
            <Checkboxwithlabel>
              <PasswordCheckbox
                type="checkbox"
                onChange={editEntry.numberscheckbox.bind(editEntry)}
              />
              <div>Numbers</div>
            </Checkboxwithlabel>
            <Checkboxwithlabel>
              <PasswordCheckbox
                type="checkbox"
                onChange={editEntry.specialcharacters.bind(editEntry)}
              />
              <div>Special characters</div>
            </Checkboxwithlabel>
          </Checkboxes>
          <div>
            <input
              type="range"
              min="6"
              max="50"
              value={passwordLength}
              onChange={passwordLengthChange}
            />
          </div>
        </GeneratorSecionContainer>
      </GeneratorInsideModal>
    </GeneratorModal>
  ) : null;
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
    });
  }, [refreshentry]);

  const addnewentry = async (): Promise<void> => {
    // TODO: Prevent from doing if inputs are empty even if
    console.log(newentry);
    Entry.getInstance()
      .CreateNewEntryUser(newentry)
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
            <Button size="small" color="lightblue">
              Save
            </Button>
            <PassLen id="passlen">{passlen}</PassLen>
          </ButtonsRangeContainer>
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
