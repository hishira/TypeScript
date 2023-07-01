import styled from "styled-components";

type Props = {
  visible: boolean;
};
export const AccountButtons = styled.div<Props>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 3rem;
  width: 8rem;
  padding: 1rem;
  z-index: 200;
  gap: 1rem;
  right: -0.5rem;
  background-color: whitesmoke;
  border-radius: 10px;
`;
export const AccountView = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  padding-top: 0.25rem;
  align-content: center;
  position: relative;
  & > svg {
    &:hover {
      cursor: pointer;
    }
  }
`;
