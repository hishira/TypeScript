import { Dispatch, SetStateAction, useEffect } from "react";
import { Entry } from "../utils/entry.utils";

export const GetEntryForEdit = (
  edit: boolean | undefined,
  editentryid: string | undefined,
  setEditedEntry: Dispatch<SetStateAction<CreateEntryDto>>,
  setLoadingComponent: Dispatch<SetStateAction<boolean>>
) => {
  const editFetch = (edit: boolean | undefined, editentryid: string | undefined) => {
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
  useEffect(() => {
    editFetch(edit, editentryid)
  });
};
