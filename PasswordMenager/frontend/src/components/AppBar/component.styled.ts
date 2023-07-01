import styled from "styled-components";

export const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 4px 10px;
`;
export const LeftSide = styled.div``;
export const RigthSide = styled.div`
  min-height: 2rem;
  padding: 0.5rem;
`;

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
