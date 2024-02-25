import { inject, observer } from "mobx-react";
import { Dispatch, SetStateAction } from "react";
import { IGeneral } from "../../../../../../../models/General";
import { Entry } from "../../../../../../../utils/entry.utils";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../../../utils/popup.utils";
import Button from "../../../../../../Button";
import {
  Translation,
  TranslationFunction,
} from "../../../../../../Translation";
import {
  LastDeletedElement,
  LastDeletedEntryInfo,
  LastDeletedInfoElement,
} from "../component.styled";

type MappedEntriesType = {
  entries: IEntry[];
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

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
const RestoreEntryHandle = (
  entryId: string,
  setRefetch: Dispatch<SetStateAction<boolean>>,
  store?: IGeneral
) => {
  const { restoreSuccessMessage, restoreErrorMessage } =
    LastDeletedRestoreMessages();

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

const LastDeleteEntryElement = ({
  setRefetch,
  store,
  entry,
}: Pick<MappedEntriesType, "setRefetch"> & {
  store?: IGeneral;
  entry: IEntry;
}) => {
  const restoreEntry = (entryId: string) => {
    RestoreEntryHandle(entryId, setRefetch, store);
  };
  return (
    <LastDeletedElement>
      <LastDeletedEntryInfo>
        <LastDeletedInfoElement>{entry.title}</LastDeletedInfoElement>
        <LastDeletedInfoElement>{entry.username}</LastDeletedInfoElement>
        <LastDeletedInfoElement>{entry.url}</LastDeletedInfoElement>
      </LastDeletedEntryInfo>
      <Button
        outline="without"
        size="small"
        onClick={() => restoreEntry(entry._id)}
      >
        {Translation("account.view.lastDeletedEntries.table.actionButton")}
      </Button>
    </LastDeletedElement>
  );
};
const LastDeletedMappedEntries = ({
  entries,
  setRefetch,
  store,
}: MappedEntriesType & { store?: IGeneral }) => {
  return (
    <>
      {entries.map((entry) => (
        <LastDeleteEntryElement
          entry={entry}
          key={entry._id}
          setRefetch={setRefetch}
          store={store}
        />
      ))}
    </>
  );
};
export default inject("store")(observer(LastDeletedMappedEntries));
