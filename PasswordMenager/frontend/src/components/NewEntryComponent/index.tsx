import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Entry } from "../../utils/entry.utils";
import Button from "../Button";
import FormElement from "../FormElement/";
import {
  ButtonsRangeContainer,
  CheckBox,
  Checkboxes,
  Checkboxwithlabel,
  EntryModalComponent,
  NormalContainer,
  OptionContainer,
  PassLen,
  PasswordCheckbox,
  SectionContainer,
  SelectContainer,
  SelectLabel,
} from "./component.styled";
import { checkBoxHandler } from "./new-entry.utils";
import { GroupEffect } from "../../hooks/groups.hook";
import { GetEntryForEdit } from "../../hooks/getEntryForEdit.hook";
import { Loading } from "../Loading";
import { EditEntryActionDispatcher } from "./EditEntryActionDispatcher";
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
          console.log("OK");
          editEntry.clearInputData();
        } else {
          console.log("Something wrong");
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
        <EntryModalComponent>
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
          {!edit ? (
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
          ) : null}
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
          <SectionContainer>
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
          </SectionContainer>
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
            <input
              type="range"
              min="6"
              max="50"
              value={passlen}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setpasslen(parseInt(e.target.value))
              }
            />
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
