import { useState } from "react";
type GroupActionSet<T> = React.Dispatch<React.SetStateAction<T>>;
export type ActionGroup = {
  createModal: boolean;
  setCreateModal: GroupActionSet<boolean>;
  editModal: boolean;
  setEditModal: GroupActionSet<boolean>;
  deleteModal: boolean;
  setDeleteModal: GroupActionSet<boolean>;
  actionGroupId: string;
  setActionGroupid: GroupActionSet<string>;
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
