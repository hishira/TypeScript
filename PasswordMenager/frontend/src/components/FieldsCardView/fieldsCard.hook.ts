import { useEffect, useState } from "react";
import { CardEntry } from "./view";

export const FieldsCardHook = (entry: CardEntry) => {
  const [entryCard, setEntryCard] = useState<CardEntry>(entry);
  const [isEmptyTitle, setIsEmptyTitle] = useState<boolean>(false);
  useEffect(() => {
    if (entryCard.title === undefined || entryCard.title === "")
      setIsEmptyTitle(true);
  }, [entryCard]);

  const closeIconHandle = () => {
    setEntryCard((ec) => ({ ...ec, open: false }));
  };

  const openIconHandle = () => {
    setEntryCard((ec) => ({ ...ec, open: true }));
  };

  return {
    isEmptyTitle,
    entryCard,
    closeIconHandle,
    openIconHandle,
  };
};
