import { AcceptModalComponent } from "../../../../Modal/AcceptModal";
import { DeleteModalType } from "../../types";
import { AcceptDeleteModal } from "../acceptModals/acceptDelete";

export const DeleteModal = ({ actionGroup, deleteHandle }: DeleteModalType) =>
  actionGroup.deleteModal ? (
    <AcceptModalComponent
      visible={actionGroup.deleteModal}
      onClose={() => actionGroup.setDeleteModal(false)}
      acceptHandle={deleteHandle}
      component={<AcceptDeleteModal />}
    />
  ) : null;
