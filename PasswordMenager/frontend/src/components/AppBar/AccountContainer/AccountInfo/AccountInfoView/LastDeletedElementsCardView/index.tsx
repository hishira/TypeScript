import { useEffect, useState } from "react";
import {
  Elements,
  LastDeletedElement,
  LastDeletedElements,
  LastDeletedEntryInfo,
  LastDeletedTitle,
} from "./component.styled";
import { Entry } from "../../../../../../utils/entry.utils";
import Button from "../../../../../Button";
import { Translation } from "../../../../../Translation";

export const LastDeletedElementsCardView = () => {
  const [lastDeletedEntries, setLastDeletedEntries] = useState<IEntry[]>([]);
  useEffect(() => {
    Entry.getInstance()
      .getLastDeletedEntries()
      .then((entries: IEntry[]) => {
        setLastDeletedEntries(entries);
      });
  }, []);
  return (
    <LastDeletedElements>
      <LastDeletedTitle>{Translation('account.view.lastDeletedEntries.title')}</LastDeletedTitle>
      <br />
      <Elements>
        <LastDeletedElement>
          <LastDeletedEntryInfo>
            <div>{Translation('account.view.lastDeletedEntries.table.column.title')}</div>
            <div>{Translation('account.view.lastDeletedEntries.table.column.username')}</div>
            <div>{Translation('account.view.lastDeletedEntries.table.column.url')}</div>
          </LastDeletedEntryInfo>
        </LastDeletedElement>
        {lastDeletedEntries.map((entry) => (
          <LastDeletedElement key={entry._id}>
            <LastDeletedEntryInfo>
              <div>{entry.title}</div>
              <div>{entry.username}</div>
              <div>{entry.url}</div>
            </LastDeletedEntryInfo>
            <Button outline="without" size="small">
            {Translation('account.view.lastDeletedEntries.table.actionButton')}
            </Button>
          </LastDeletedElement>
        ))}
      </Elements>
    </LastDeletedElements>
  );
};
