import { inject, observer } from "mobx-react";
import Button from "../Button";
import FormElement from "../FormElement/";
import { Loading } from "../Loading";
import { Translation, TranslationFunction } from "../Translation";
import { HideIcon } from "../icons/HideIcon";
import { ShowIcon } from "../icons/ShowIcon";
import { TitleContainer } from "../shared/styled-components";
import { EditEntryActionDispatcher } from "./EditEntryActionDispatcher";
import { GroupSelection } from "./GroupSelection";
import { PasswordGeneratorOption } from "./PasswordGenerationOption";
import {
  ButtonContainer,
  ButtonsRangeContainer,
  EntryModalComponent,
  PasswordFormContainer,
  SectionContainer,
} from "./component.styled";
import { NewEntryUtils } from "./newentry.utils";
import { NewEntryProps } from "./types";

const PasswordElementContainer = ({
  newentry,
  editEntry,
  passwordVisible,
  passwordVisibleFunc,
}: {
  passwordVisible: boolean;
  passwordVisibleFunc: (ps: boolean) => void;
  newentry: CreateEntryDto;
  editEntry: EditEntryActionDispatcher;
}) => (
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
);
const ButtonOption = ({
  edit,
  editEntry,
  addnewentry,
  edithaneld,
}: {
  edit: boolean | undefined;
  editEntry: EditEntryActionDispatcher;
  addnewentry: () => Promise<void>;
  edithaneld: () => void;
}) => {
  return (
    <ButtonContainer>
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
          color="whitesmoke"
          onClick={edithaneld}
        >
          {Translation("newentry.action.update")}
        </Button>
      )}
    </ButtonContainer>
  );
};
const NewEntryComponent = ({
  edit,
  editentryid,
  refreshentry,
  refresh,
  closeModalDispatcherHandle,
  store,
}: NewEntryProps): JSX.Element => {
  const {
    newentry,
    loading,
    passwordVisible,
    editEntry,
    generatePasswordModal,
    passwordVisibleFunc,
    passlen,
    groups,
    passwordLenChange,
    setGeneratePasswordModal,
    addnewentry,
    edithaneld,
  } = NewEntryUtils(
    edit ?? false,
    editentryid,
    refresh,
    closeModalDispatcherHandle,
    store
  );
  return (
    <Loading
      loading={loading}
      ComponentToLoad={
        <div>
          <EntryModalComponent disabled={generatePasswordModal}>
            <TitleContainer>
              {TranslationFunction(edit ? "edit.title" : "newentry.title")}
            </TitleContainer>
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
              <PasswordElementContainer
                newentry={newentry}
                editEntry={editEntry}
                passwordVisible={passwordVisible}
                passwordVisibleFunc={passwordVisibleFunc}
              />
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
          </EntryModalComponent>
          <ButtonOption
            editEntry={editEntry}
            addnewentry={addnewentry}
            edithaneld={edithaneld}
            edit={edit}
          />
        </div>
      }
    ></Loading>
  );
};
export default inject("store")(observer(NewEntryComponent));
