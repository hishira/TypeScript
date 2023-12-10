import { Dispatch, SetStateAction, useEffect } from "react";
import { Entry } from "../utils/entry.utils";

const editFetch = (
  edit: boolean | undefined,
  editentryid: string | undefined,
  setEditedEntry: Dispatch<SetStateAction<CreateEntryDto>>,
  setLoadingComponent: Dispatch<SetStateAction<boolean>>
) => {
  if (edit && editentryid) {
    setLoadingComponent(true);
    Entry.getInstance()
      .getEntryById(editentryid)
      .then((response) => {
        if (!!response) {
          const { _id, ...rest } = response;
          setEditedEntry({ ...rest });
          setLoadingComponent(false);
        }
      })
      .catch((_) => setLoadingComponent(false));
  }
};
export const GetEntryForEdit = (
  edit: boolean | undefined,
  editentryid: string | undefined,
  setEditedEntry: Dispatch<SetStateAction<CreateEntryDto>>,
  setLoadingComponent: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    editFetch(edit, editentryid, setEditedEntry, setLoadingComponent);
  }, [edit, editentryid, setEditedEntry, setLoadingComponent]);
};
