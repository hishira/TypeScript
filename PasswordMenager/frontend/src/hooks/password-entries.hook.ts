import { useEffect, useState } from "react";
import { GetUserEntriesByGroupID } from "../utils/entry.utils";

export const PasswordEntries = (selectedGroup: string, refreshAll: boolean) => {
  const [passwordEntries, setPasswordEntries] = useState<IEntry[]>([]);
  const fetchEntries = async (): Promise<void> => {
    if (selectedGroup === "") return;
    const groupid: GroupId = {
      id: selectedGroup,
    };
    const response: GetEntriesResponse = await GetUserEntriesByGroupID(groupid);
    if (response.status) {
      console.log(response.response);
      setPasswordEntries(response.response);
    } else {
      setPasswordEntries([]);
    }
  };
  useEffect(() => {
    fetchEntries();
  }, [selectedGroup, refreshAll]);

  return passwordEntries;
};
