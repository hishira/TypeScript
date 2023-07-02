import { useEffect, useState } from "react";
import { Entry } from "../utils/entry.utils";

export const PasswordEntries = (selectedGroup: string, refreshAll: boolean) => {
  const [passwordEntries, setPasswordEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async (): Promise<void> => {
      if (selectedGroup === "") {
        const response = await Entry.getInstance().EntriesWithoutGroup();
        if (typeof response !== "number") setPasswordEntries(response);
      }
      const groupid: GroupId = {
        id: selectedGroup,
      };
      const response: GetEntriesResponse =
        await Entry.getInstance().GetUserEntriesByGroupID(groupid);
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
