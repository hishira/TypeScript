import { useState } from "react";
import { ActionSet } from "./actionGroups.hook";
import { EMPTYENTRYRESPONSE } from "../utils/constans.utils";

export type ActionFields = {
  editModalOpen: boolean;
  setEditModalOpen: ActionSet<boolean>;
  deleteModalOpen: boolean;
  setDeleteModalOpen: ActionSet<boolean>;
  entryToEdit: string;
  setEntryToEdit: ActionSet<string>;
  entryToDelete: string;
  setEntryToDelete: ActionSet<string>;
  smallModalOpen: boolean;
  setSmallModalOpen: ActionSet<boolean>;
  refreshEntry: boolean;
  setRefreshEntry: ActionSet<boolean>;
  entrywithsmallbutton: IEntry;
  setentrywithsmallbutton: ActionSet<IEntry>;
};

export const FieldsActionHook = (): ActionFields => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [smallModalOpen, setSmallModalOpen] = useState<boolean>(false);
  const [entryToEdit, setEntryToEdit] = useState<string>("");
  const [entryToDelete, setEntryToDelete] = useState<string>("");
  const [refreshEntry, setRefreshEntry] = useState<boolean>(false);
  const [entrywithsmallbutton, setentrywithsmallbutton] =
    useState<IEntry>(EMPTYENTRYRESPONSE);

  return {
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    smallModalOpen,
    setSmallModalOpen,
    entryToEdit,
    setEntryToEdit,
    entryToDelete,
    setEntryToDelete,
    refreshEntry,
    setRefreshEntry,
    entrywithsmallbutton,
    setentrywithsmallbutton,
  };
};
