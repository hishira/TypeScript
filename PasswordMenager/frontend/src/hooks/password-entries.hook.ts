import { useEffect, useState } from "react";
import { GetUserEntriesByGroupID } from "../utils/entry.utils";

export const PasswordEntries = (selectedGroup: string, refreshAll: boolean) => {
  const [passwordEntries, setPasswordEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async (): Promise<void> => {
      if (selectedGroup === "") setPasswordEntries([]);
      const groupid: GroupId = {
        id: selectedGroup,
      };
      const response: GetEntriesResponse = await GetUserEntriesByGroupID(
        groupid
      );
      if (response.status) {
        setPasswordEntries(response.response);
      } else {
        setPasswordEntries([]);
      }
    };
    fetchEntries();
  }, [selectedGroup, refreshAll]);

  return passwordEntries;
};
