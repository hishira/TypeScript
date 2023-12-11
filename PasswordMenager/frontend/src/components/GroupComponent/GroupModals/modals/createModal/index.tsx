import Modal from "../../../../Modal/";
import { CreateModalType } from "../../types";

export const CreateModal = ({
  actionGroup,
  newGroupCloseHandle,
  newGroupComponent,
}: CreateModalType) =>
  actionGroup.createModal ? (
    <Modal
      visible={actionGroup.createModal}
      onClose={newGroupCloseHandle}
      component={newGroupComponent}
    />
  ) : null;
