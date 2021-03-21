import React from "react";
import styled from "styled-components";

type ModalProps = {
  visible?: boolean;
};

const Modal = styled.div<ModalProps>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 1, 1, 0.2);
  z-index: 2;
`;

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
    const element: HTMLElement = Array.from(
      document.getElementsByClassName("hook") as HTMLCollectionOf<HTMLElement>
    )[0];
    const targetelement: Element = event.target as Element;
    for (let i of targetelement.childNodes) {
      if (
        (i as Element).classList !== undefined &&
        (i as Element).classList[0] === "hook"
      )
        onClose();
    }
    /*
    if(!element.contains(event.target as Node)){
      console.log("tak");
      onClose();
    }
    */
  };
  return (
    <Modal onClick={clickOnModal} visible={visible}>
      <div className="hook">{component}</div>
    </Modal>
  );
};

export default ModalComponent;
