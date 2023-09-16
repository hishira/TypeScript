import styled from "styled-components";

export const UserEditModalView = styled.div`
  padding: 1.5rem 0.75rem;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  width: 55rem;
`;
export const PasswordText = styled.div`
  margin-top: 18px;
  font-weight: 450;
`;
export const FormElements = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const UserEditTitle = styled.div`
  font-size: 18px;
  font-weight: 550;
  display: flex;
  position: relative;
 
  gap: 18px;
 
`;

export const IconHoover = styled.div`
 position: relative;
 width: 200px;
  & > span[test-tooltip="test"] {
    font-weight: normal;
    background-color: #4d4d4d;
    color: white;
    border-radius: 10px;
    position: absolute;
    font-size: 12px;
    padding: 5px;
    top: 0  ;
    right: 45%;
    visibility: hidden;
  }
  & > svg:hover {
    cursor: pointer;
    & ~ span[test-tooltip="test"] {
      font-weight: normal;
      visibility: visible;
    }
  }
`
export const UserEditModalContainer = styled.div`
  & input {
    background-color: transparent;
  }
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
  /*display: flex;
  flex-direction: column;
  align-items: center;*/
  & > svg:hover {
    cursor: pointer;
  }
`;
export const UserTitleText = styled.div`
  font-size: 18px;
  font-weight: 550;
`;
export const UserInfo = styled.div`
  display: flex;
  gap: 4rem;
  margin-top: 0.7rem;
`;

export const Buttons = styled.div`
  display: flex;
`;
export const UserEditModalButtons = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-top: 1.2rem;
`;
