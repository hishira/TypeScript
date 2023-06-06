import React, { useEffect } from "react";

type ActionStateAction<T> = React.SetStateAction<T>;
type ActionFunction<T> = (value: ActionStateAction<T>) => void;
export const ImportModalOpenHandle = (
  setImportModalOpen: ActionFunction<boolean>,
  setuuid: ActionFunction<string>,
  modalOpen: boolean
) => {
  useEffect(() => {
    setImportModalOpen(modalOpen);
    setuuid((Math.random() + 1).toString(36).substring(7));
  }, [modalOpen]);
};
