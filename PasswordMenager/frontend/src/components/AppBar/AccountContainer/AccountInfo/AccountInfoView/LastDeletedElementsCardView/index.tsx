import { useEffect, useState } from "react";
import { Entry } from "../../../../../../utils/entry.utils";
import { Translation } from "../../../../../Translation";
import LastDeletedMappedEntries from "./LastDeletedMappedEntries";
import {
  Elements,
  LastDeletedElement,
  LastDeletedElements,
  LastDeletedEntryInfo,
  LastDeletedTitle,
} from "./component.styled";

export const LastDeletedElementsCardView = () => {
  const [lastDeletedEntries, setLastDeletedEntries] = useState<IEntry[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  useEffect(() => {
    Entry.getInstance()
      .getLastDeletedEntries()
      .then((entries: EntryData) => {
        setLastDeletedEntries(entries?.data ?? []);
      });
  }, [refetch]);

  return (
    <LastDeletedElements>
      <LastDeletedTitle>
        {Translation("account.view.lastDeletedEntries.title")}
      </LastDeletedTitle>
      <br />
      <Elements>
        <LastDeletedElement>
          <LastDeletedEntryInfo>
            <div>
              {Translation(
                "account.view.lastDeletedEntries.table.column.title"
              )}
            </div>
            <div>
              {Translation(
                "account.view.lastDeletedEntries.table.column.username"
              )}
            </div>
            <div>
              {Translation("account.view.lastDeletedEntries.table.column.url")}
            </div>
          </LastDeletedEntryInfo>
        </LastDeletedElement>
        <LastDeletedMappedEntries
          setRefetch={setRefetch}
          entries={lastDeletedEntries}
        />
      </Elements>
    </LastDeletedElements>
  );
};
