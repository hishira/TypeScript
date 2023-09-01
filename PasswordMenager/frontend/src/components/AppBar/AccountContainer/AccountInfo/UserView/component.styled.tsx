import styled from "styled-components";

export const UserEditModalView = styled.div`
  padding: 2rem 0;
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
  flex-direction: column;
  justify-content: center;
  padding: 1.2rem 0;
  padding-top: 0;
`;
export const UserIcons = styled.div`
  margin-left: 4rem;
  & > svg:hover {
    cursor: pointer;
  }
`;
export const UserTitleText = styled.div`
  font-size: 18px;
  font-weight: 550;
`
export const UserInfo = styled.div`
  display: flex;
  gap: 4rem;
  margin-top: 0.7rem;
`;