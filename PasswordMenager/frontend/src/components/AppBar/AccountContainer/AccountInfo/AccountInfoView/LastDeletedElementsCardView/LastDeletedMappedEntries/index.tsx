import { inject, observer } from "mobx-react";
import { Dispatch, SetStateAction } from "react";
import { IGeneral } from "../../../../../../../models/General";
import Button from "../../../../../../Button";
import { Translation } from "../../../../../../Translation";
import {
  LastDeletedElement,
  LastDeletedEntryInfo,
  LastDeletedInfoElement,
} from "../component.styled";
import { LastDeletedMappedHook } from "./lastDeletedMapped.hook";

export type MappedEntriesType = {
  entries: IEntry[];
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

const LastDeleteEntryElement = ({
  setRefetch,
  store,
  entry,
}: Pick<MappedEntriesType, "setRefetch"> & {
  store?: IGeneral;
  entry: IEntry;
}) => {
  const { RestoreEntry } = LastDeletedMappedHook(setRefetch, store);
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
        onClick={() => RestoreEntry(entry._id)}
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
