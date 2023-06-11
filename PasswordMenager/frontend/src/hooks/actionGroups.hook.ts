import { useState } from "react";
export type ActionSet<T> = React.Dispatch<React.SetStateAction<T>>;
export type ActionGroup = {
  createModal: boolean;
  setCreateModal: ActionSet<boolean>;
  editModal: boolean;
  setEditModal: ActionSet<boolean>;
  deleteModal: boolean;
  setDeleteModal: ActionSet<boolean>;
  actionGroupId: string;
  setActionGroupid: ActionSet<string>;
};
export const ActionGroupHooks = (): ActionGroup => {
  const [modal, setModal] = useState<boolean>(false);
  const [editGroupModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteGroupModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [actionGroupId, setActionGroupid] = useState<string>("");

  return {
    createModal: modal,
    setCreateModal: setModal,
    editModal: editGroupModalOpen,
    setEditModal: setEditModalOpen,
    deleteModal: deleteGroupModalOpen,
    setDeleteModal: setDeleteModalOpen,
    actionGroupId,
    setActionGroupid,
  };
};
