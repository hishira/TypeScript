import styled from "styled-components";

export const UserEditModalView = styled.div`
  padding: 2rem;
  background-color: whitesmoke;
`;

export const UserInfoFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;
export const UserInforContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 1.2rem;
  padding-top: 0;
`;
export const UserIcons = styled.div`
  & > svg:hover {
    cursor: pointer;
  }
`;
export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
`;