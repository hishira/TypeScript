import React from "react";
import { EscapeModalHandle } from "../../hooks/modalEscape.hook";
import { Modal } from "./component.styled";
import { clickOnModal } from "../../utils/modal.utils";
export type ModalProps = {
  visible?: boolean;
  component?: JSX.Element;
  onClose: () => void;
};
const ModalComponent = ({
  visible,
  component,
  onClose,
}: ModalProps): JSX.Element => {
  EscapeModalHandle(onClose);
  return (
    <Modal onClick={(e)=>clickOnModal(e, onClose)} visible={visible}>
      <div className="hook">{component}</div>
    </Modal>
  );
};

export default ModalComponent;
