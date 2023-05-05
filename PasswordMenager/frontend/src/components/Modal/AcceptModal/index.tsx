import React from "react";
import { Modal, ModalContainer } from "../component.styled";
import { EscapeModalHandle } from "../../../hooks/modalEscape.hook";
import { clickOnModal } from "../../../utils/modal.utils";
import { ButtonGroup } from "./component.styled";
import { ModalProps } from "..";
import Button from "../../Button";

export const AcceptModalComponent = ({
  visible,
  component,
  onClose,
}: ModalProps): JSX.Element => {
  EscapeModalHandle(onClose);
  return (
    <Modal onClick={(e) => clickOnModal(e, onClose)} visible={visible}>
      <div className="hook">
        <ModalContainer>
          {component}
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button color="lightblue"> Accept</Button>
          </ButtonGroup>
        </ModalContainer>
      </div>
    </Modal>
  );
};
