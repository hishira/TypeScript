import { useEffect, useState } from "react";
import { Entry } from "../../../../../../utils/entry.utils";

export const LastDeletedEntriesHook = () => {
  const [lastDeletedEntries, setLastDeletedEntries] = useState<IEntry[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  useEffect(() => {
    Entry.getInstance()
      .getLastDeletedEntries()
      .then((entries: EntryData) => {
        if (Array.isArray(entries)) setLastDeletedEntries(entries);
        else setLastDeletedEntries(entries?.data ?? []);
      });
  }, [refetch]);

  return {
    lastDeletedEntries,
    setRefetch
  }
};
