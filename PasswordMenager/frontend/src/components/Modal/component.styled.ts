import styled from "styled-components";

type ModalProps = {
  visible?: boolean;
};

export const Modal = styled.div<ModalProps>`
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
