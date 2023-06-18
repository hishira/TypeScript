import React from "react";
import { Modal, ModalContainer } from "../component.styled";
import { EscapeModalHandle } from "../../../hooks/modalEscape.hook";
import { clickOnModal } from "../../../utils/modal.utils";
import { ButtonGroup } from "./component.styled";
import { ModalProps } from "..";
import Button from "../../Button";
type AcceptanceModalPrope = ModalProps & {
  acceptHandle: (...args: any[]) => any;
  disableButton?: boolean;
};
export const AcceptModalComponent = ({
  visible,
  component,
  onClose,
  acceptHandle,
  disableButton,
}: AcceptanceModalPrope): JSX.Element => {
  EscapeModalHandle(onClose);
  return (
    <Modal onClick={(e) => clickOnModal(e, onClose)} visible={visible}>
      <div className="hook">
        <ModalContainer>
          {component}
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              disabled={disableButton}
              color="lightblue"
              onClick={acceptHandle}
            >
              Accept
            </Button>
          </ButtonGroup>
        </ModalContainer>
      </div>
    </Modal>
  );
};
