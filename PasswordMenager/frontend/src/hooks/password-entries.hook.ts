import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Entry } from "../utils/entry.utils";
import { EntryPaginator } from "../components/Paginator";

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
  entriesTitle: string,
  refreshAll: boolean,
  paginator: EntryPaginator,
  setLoading: Dispatch<SetStateAction<boolean>>
): ReturnEntiresType => {
  //TODO: Refactor
  const [passwordEntries, setPasswordEntries] = useState<IEntry[]>([]);
  const [pageInfo, setPageInfo] = useState<{
    hasMore: boolean;
    items: number;
    page: number;
  } | null>(null);
  useEffect(() => {
    const inputEntryFields = { tittle: entriesTitle };
    const emptyGroupFetch = async () => {
      const { data, pageInfo } = await Entry.getInstance()
        .EntriesWithoutGroup({ paginator, title: entriesTitle ?? "" })
        .then((_) => {
          setLoading(false);
          return _;
        });
      setPasswordEntries(data);
      setPageInfo(pageInfo);
    };
    const fetchWithSelectedGroup = async () => {
      const groupid: GroupId = {
        id: selectedGroup,
      };
      const response: GetEntriesResponse = await Entry.getInstance()
        .GetUserEntriesByGroupID(groupid)
        .then((_) => {
          setLoading(false);
          return _;
        });
      if (response.status) {
        setPasswordEntries(response.response);
      } else {
        setPasswordEntries([]);
      }
    };
    const fetchEntries = async (): Promise<void> => {
      if (selectedGroup === "") {
        emptyGroupFetch();
      } else {
        fetchWithSelectedGroup();
      }
    };
    fetchEntries();
  }, [selectedGroup, refreshAll, paginator, entriesTitle]);

  return { entries: passwordEntries, paginator: pageInfo };
};
