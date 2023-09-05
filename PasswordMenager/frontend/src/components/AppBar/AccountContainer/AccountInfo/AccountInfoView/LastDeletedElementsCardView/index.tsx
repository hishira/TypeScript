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
      <LastDeletedTitle>Last 10 deleted entries</LastDeletedTitle>
      <br />
      <Elements>
        <LastDeletedElement>
          <LastDeletedEntryInfo>
            <div>Title</div>
            <div>Username</div>
            <div>URL</div>
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
              Restore
            </Button>
          </LastDeletedElement>
        ))}
      </Elements>
    </LastDeletedElements>
  );
};
