import { Dispatch, SetStateAction } from "react";
import { IGeneral } from "../../../../../../../models/General";
import { Entry } from "../../../../../../../utils/entry.utils";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../../../utils/popup.utils";
import { TranslationFunction } from "../../../../../../Translation";

const LastDeletedRestoreMessages = () => {
  const restoreSuccessMessage = TranslationFunction(
    "accountview.entry.restore.success"
  );
  const restoreErrorMessage = TranslationFunction(
    "accountview.entry.restore.error"
  );
  return {
    restoreSuccessMessage,
    restoreErrorMessage,
  };
};
export const LastDeletedMappedHook = (
  setRefetch: Dispatch<SetStateAction<boolean>>,
  store?: IGeneral
) => {
  const { restoreSuccessMessage, restoreErrorMessage } =
    LastDeletedRestoreMessages();

  const RestoreEntry = (entryId: string) => {
    Entry.getInstance()
      .restoreEntry({ entryId })
      .then((_) => {
        setRefetch((a) => !a);
        store?.setPopUpinfo(SuccessPopUpObject(restoreSuccessMessage));
      })
      .catch((e) => {
        store?.setPopUpinfo(ErrorPopUpObject(restoreErrorMessage));
      });
  };

  return {
    RestoreEntry,
  };
};
