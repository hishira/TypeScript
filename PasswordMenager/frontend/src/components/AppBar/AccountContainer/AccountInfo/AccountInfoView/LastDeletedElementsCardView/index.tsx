import { useEffect, useState } from "react";
import {
  Elements,
  LastDeletedElement,
  LastDeletedElements,
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
        {lastDeletedEntries.map((entry) => (
          <LastDeletedElement>
            {entry.title}
            <Button outline="without" size="small">
              Restore
            </Button>
          </LastDeletedElement>
        ))}
      </Elements>
    </LastDeletedElements>
  );
};
