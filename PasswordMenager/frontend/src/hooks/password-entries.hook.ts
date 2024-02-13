import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Entry } from "../utils/entry.utils";

const GetEntryInput = (
  paginator: EntryPaginator,
  title: string | null,
  groupId: string | null
): EntryInput => ({
  paginator,
  title: title ?? "",
  groupId: groupId === "" ? null : groupId,
});

const entriesFetch = async (
  paginator: EntryPaginator,
  entriesTitle: string,
  selectedGroup: string
): Promise<EntriesFetchResponse> => {
  const { data, pageInfo } = await Entry.getInstance().GetEntriesBy(
    GetEntryInput(paginator, entriesTitle, selectedGroup)
  );
  return { data, pageInfo };
};

export const PasswordEntries = (
  selectedGroup: string,
  entriesTitle: string,
  refreshAll: boolean,
  paginator: EntryPaginator,
  setLoading: Dispatch<SetStateAction<boolean>>,
  createEntryRefresh: boolean
): ReturnEntiresType => {
  const [passwordEntries, setPasswordEntries] = useState<IEntry[]>([]);
  const [pageInfo, setPageInfo] = useState<PaginatorType | null>(null);
  useEffect(() => {
    const fetchEntries = async (): Promise<void> => {
      const { data, pageInfo } = await entriesFetch(
        paginator,
        entriesTitle,
        selectedGroup
      );
      setPasswordEntries(data);
      setPageInfo(pageInfo);
      setLoading(false);
    };
    fetchEntries();
  }, [
    selectedGroup,
    refreshAll,
    paginator,
    entriesTitle,
    setLoading,
    createEntryRefresh,
  ]);

  return { entries: passwordEntries, paginator: pageInfo };
};
