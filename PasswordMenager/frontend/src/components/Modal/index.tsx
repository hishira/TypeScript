import React from "react";
import { EscapeModalHandle } from "../../hooks/modalEscape.hook";
import { Modal } from "./component.styled";

type Props = {
  visible?: boolean;
  component?: JSX.Element;
  onClose: () => void;
};

const ModalComponent = ({
  visible,
  component,
  onClose,
}: Props): JSX.Element => {
  const clickOnModal = (event: React.MouseEvent): void => {
    const targetelement: Element = event.target as Element;
    for (let i of targetelement.childNodes) {
      if (
        (i as Element).classList !== undefined &&
        (i as Element).classList[0] === "hook"
      )
        onClose();
    }
  };
  EscapeModalHandle(onClose);
  return (
    <Modal onClick={clickOnModal} visible={visible}>
      <div className="hook">{component}</div>
    </Modal>
  );
};

export default ModalComponent;
