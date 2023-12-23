import styled from "styled-components";

export const Notification = styled.div``;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`;

export const NotificationElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NotificationSubElement = styled.div`
  text-align: start;
  width: 33%;
  &:not(:first-of-type) {
    text-align: center;
  }
  &:last-of-type {
    width: 20%;
    & > svg{
      cursor: pointer;
    }
    & > svg:last-of-type {
      margin-left: 16px;
    }
  }
`;
