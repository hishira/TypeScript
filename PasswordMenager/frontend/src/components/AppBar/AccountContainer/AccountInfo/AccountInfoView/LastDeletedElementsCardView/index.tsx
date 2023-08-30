import { useEffect, useState } from "react";
import {
  Elements,
  LastDeletedElement,
  LastDeletedElements,
} from "./component.styled";
import { Entry } from "../../../../../../utils/entry.utils";

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
      Last 10 deleted entries
      <br />
      <Elements>
        {lastDeletedEntries.map((entry) => (
          <LastDeletedElement>{entry.title}</LastDeletedElement>
        ))}
      </Elements>
    </LastDeletedElements>
  );
};
