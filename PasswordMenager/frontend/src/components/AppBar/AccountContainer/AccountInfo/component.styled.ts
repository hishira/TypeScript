import styled from "styled-components";

export const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  width: 80%;
  border-radius: 5px;
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  top: 20%;
  left: 0;
  right: -0;
  min-height: 40rem;
  max-height: 40rem;
  padding: 2rem;
  @media (min-width: 1000px){
    width: 55rem;
  }
`;

export const Devider = styled.div`
  width: 100%;
  margin-top: 12px;
  border-top: .5px solid slategray;
`
export const AccountInfoHeader = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
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
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;

export const Last = styled.div``;

export const UserEditModalView = styled.div`
  padding: 2rem;
  background-color: whitesmoke;
`;
