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
  min-height: 10rem;
  max-height: 35rem;
  padding: 2rem;
`;

export const AccountInfoHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  gap: 4rem;
`;

export const HeaderButton = styled.div<{ active?: boolean }>`
  cursor: pointer;
  box-sizing: border-box;
  //border-right: 0.02rem solid slategrey;
  text-shadow: ${({ active }) => (active ? "1px 0 0 #000" : "none")};
  padding: 0.4rem;
  &:hover {
    text-shadow: 1px 0 0 #000;
  }
`;

export const AccountInfoContent = styled.div`
  min-height: 10rem;
  max-height: 35rem;
`;

export const Last = styled.div``;

export const UserEditModalView = styled.div`
  padding: 2rem;
  background-color: whitesmoke;
`;
