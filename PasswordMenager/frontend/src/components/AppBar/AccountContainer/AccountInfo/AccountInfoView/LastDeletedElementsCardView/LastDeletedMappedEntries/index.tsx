import { inject, observer } from "mobx-react";
import { Dispatch, SetStateAction } from "react";
import { IGeneral } from "../../../../../../../models/General";
import { Entry } from "../../../../../../../utils/entry.utils";
import { SuccessPopUpObject, ErrorPopUpObject } from "../../../../../../../utils/popup.utils";
import Button from "../../../../../../Button";
import { Translation, TranslationFunction } from "../../../../../../Translation";
import { LastDeletedElement, LastDeletedEntryInfo } from "../component.styled";

type MappedEntriesType = {
    entries: IEntry[];
    setRefetch: Dispatch<SetStateAction<boolean>>;
  };
const LastDeletedMappedEntries = ({
    entries,
    setRefetch,
    store,
  }: MappedEntriesType & { store?: IGeneral }) => {
    const restoreSuccessMessage = TranslationFunction(
      "accountview.entry.restore.success"
    );
    const restoreErrorMessage = TranslationFunction(
      "accountview.entry.restore.error"
    );
  
    const restoreEntry = (entryId: string) => {
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
    return (
      <>
        {entries.map((entry) => (
          <LastDeletedElement key={entry._id}>
            <LastDeletedEntryInfo>
              <div>{entry.title}</div>
              <div>{entry.username}</div>
              <div>{entry.url}</div>
            </LastDeletedEntryInfo>
            <Button
              outline="without"
              size="small"
              onClick={() => restoreEntry(entry._id)}
            >
              {Translation("account.view.lastDeletedEntries.table.actionButton")}
            </Button>
          </LastDeletedElement>
        ))}
      </>
    );
  };
 export default inject("store")(observer(LastDeletedMappedEntries));