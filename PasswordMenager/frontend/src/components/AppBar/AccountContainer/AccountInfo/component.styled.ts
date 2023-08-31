import styled from "styled-components";

export const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  width: 55rem;
  border-radius: 5px;
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  top: 20%;
  left: 0;
  right: -0;
  min-height: 35rem;
  max-height: 35rem;
  padding: 2rem;
`;

export const Devider = styled.div`
  width: 100%;
  border-top: .5px solid slategray;
`
export const AccountInfoHeader = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.2rem;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

export const HeaderButton = styled.div<{ active?: boolean }>`
  cursor: pointer;
  box-sizing: border-box;
  font-size: 18px;
  text-shadow: ${({ active }) => (active ? "1px 0 0 #000" : "none")};
  &:hover {
    text-shadow: 1px 0 0 #000;
  }
`;

export const AccountInfoContent = styled.div`
  min-height: 25rem;
  max-height: 25rem;
`;

export const Last = styled.div``;

export const UserEditModalView = styled.div`
  padding: 2rem;
  background-color: whitesmoke;
`;
