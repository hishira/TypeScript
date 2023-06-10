import { useState } from "react";
type GroupActionSet = React.Dispatch<React.SetStateAction<boolean>>;
export type ActionGroup = {
  createModal: boolean;
  setCreateModal: GroupActionSet;
  editModal: boolean;
  setEditModal: GroupActionSet;
  deleteModal: boolean;
  setDeleteModal: GroupActionSet;
};
export const ActionGroupHooks = (): ActionGroup => {
  const [modal, setModal] = useState<boolean>(false);
  const [editGroupModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteGroupModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  return {
    createModal: modal,
    setCreateModal: setModal,
    editModal: editGroupModalOpen,
    setEditModal: setEditModalOpen,
    deleteModal: deleteGroupModalOpen,
    setDeleteModal: setDeleteModalOpen,
  };
};
