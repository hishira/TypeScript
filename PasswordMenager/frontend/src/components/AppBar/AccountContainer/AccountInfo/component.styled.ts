import styled from "styled-components";

export const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  width: 50%;
  min-width: 50%;
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
export const UserInforContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.2rem;
  padding-top: 0;
`;
export const UserIcons = styled.div`
  margin-top: 1.2rem;
  display: flex;
  position: absolute;
  top: 0;
  right: 10px;
  justify-content: center;
`;
export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
`;
export const AccountInfoHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  gap: 4rem;
`;

export const HeaderButton = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 5px;
  outline: 0.02rem solid slategrey;
  padding: 0.4rem;
  &:hover {
    text-shadow: 1px 0 0 #000;
  }
`;

export const AccountInfoContent = styled.div``;

export const Notification = styled.div``;

export const ImportRequest = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Last = styled.div``;
