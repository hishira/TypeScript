import { useEffect, useState } from "react";
import { Entry } from "../utils/entry.utils";

type ReturnEntiresType = {
  entries: IEntry[];
  paginator?: {
    hasMore: boolean;
    items: number;
    page: number;
  } | null;
};
export const PasswordEntries = (
  selectedGroup: string,
  refreshAll: boolean
): ReturnEntiresType => {
  const [passwordEntries, setPasswordEntries] = useState<IEntry[]>([]);
  const [pageInfo, setPageInfo] = useState<{
    hasMore: boolean;
    items: number;
    page: number;
  } | null>(null);
  useEffect(() => {
    const fetchEntries = async (): Promise<void> => {
      if (selectedGroup === "") {
        const { data, pageInfo } =
          await Entry.getInstance().EntriesWithoutGroup();
        setPasswordEntries(data);
        setPageInfo(pageInfo);
      } else {
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
      }
    };
    fetchEntries();
  }, [selectedGroup, refreshAll]);

  return { entries: passwordEntries, paginator: pageInfo };
};
