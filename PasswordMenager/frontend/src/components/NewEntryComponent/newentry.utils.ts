import { Dispatch, SetStateAction, useState } from "react";
import { GetEntryForEdit } from "../../hooks/getEntryForEdit.hook";
import { GroupEffect } from "../../hooks/groups.hook";
import { IGeneral } from "../../models/General";
import { Entry } from "../../utils/entry.utils";
import { ErrorPopUpObject, SuccessPopUpObject } from "../../utils/popup.utils";
import { TranslationFunction } from "../Translation";
import { EditEntryActionDispatcher } from "./EditEntryActionDispatcher";
import { EmptyEntry, checkBoxHandler } from "./new-entry.utils";
import { PasswordCharactersTypes } from "./types";

export const NewEntryUtils = (
  edit: boolean,
  editentryid: string | undefined,
  refresh: Function | undefined,
  closeModalDispatcherHandle: Dispatch<SetStateAction<boolean>> | undefined,
  store?: IGeneral,
) => {
  const [newentry, setNewentry] = useState<CreateEntryDto>(EmptyEntry());
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [passwordcharacters, setPasswordcharacters] =
    useState<PasswordCharactersTypes>({
      letters: false,
      numbers: false,
      specialChar: false,
    });
  const [passlen, setPasslen] = useState<number>(6);
  const [generatePasswordModal, setGeneratePasswordModal] =
    useState<boolean>(false);
  const successCreate = TranslationFunction("entry.createToast.success");
  const errorCreate = TranslationFunction("entry.createToast.error");
  const successEdit = TranslationFunction("entry.editToast.success");
  const errorEdit = TranslationFunction("entry.editToast.error");
  GetEntryForEdit(edit, editentryid, setNewentry, setLoading);
  const editEntry: EditEntryActionDispatcher = new EditEntryActionDispatcher(
    setNewentry,
    setPasswordcharacters,
    passwordcharacters,
    newentry,
    passlen
  );

  const groups = GroupEffect(true);

  const passwordVisibleFunc = (ps: boolean) => {
    setPasswordVisible(ps);
    checkBoxHandler({ target: { checked: ps } });
  };

  const passwordLenChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasslen(parseInt(e.target.value));

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
          if (refresh !== undefined) refresh();

          editEntry.clearInputData();
          store?.setPopUpinfo(SuccessPopUpObject(successCreate));
        } else {
          store?.setPopUpinfo(ErrorPopUpObject(errorCreate));
        }
      })
      .catch((e) => {
        console.error(e);
        store?.setPopUpinfo(ErrorPopUpObject(errorCreate));
      });
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
            store?.setPopUpinfo(SuccessPopUpObject(successEdit));
          } else {
            store?.setPopUpinfo(ErrorPopUpObject(errorEdit));
          }
        })
        .catch((e) => {
          e && console.error(e);
          store?.setPopUpinfo(ErrorPopUpObject(errorEdit));
        });
    }
  };
  return {
    newentry,
    passwordVisible,
    loading,
    editEntry,
    generatePasswordModal,
    passwordVisibleFunc,
    passlen,
    groups,
    passwordLenChange,
    setGeneratePasswordModal,
    addnewentry,
    edithaneld
  };
};
