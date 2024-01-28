import styled from "styled-components";

export const FormElements = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
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
    top: 0;
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
`;

export const PasswordText = styled.div`
  margin-top: 18px;
  font-weight: 450;
`;

export const UserEditModalButtons = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-top: 1.2rem;
`;

export const UserEditModalContainer = styled.div`
  & input {
    background-color: transparent;
  }
`;

export const UserEditModalView = styled.div`
  padding: 1.5rem 1rem;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  width: 55rem;
  border-radius: 10px;
`;

export const UserEditTitle = styled.div`
  font-size: 18px;
  font-weight: 550;
  display: flex;
  position: relative;

  gap: 18px;
`;
