import styled, { css, keyframes } from "styled-components";

const Animation = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;
export const PopupElement = styled.div<PopUpElementProps>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  opacity: ${(props) => (props.visible ? "1" : "0")};
  transition: opacity .5 ease-in-out;
  animation: ${Animation} .5s ease-in-out;
  flex-direction: column;
  padding: 1.5rem;
  position: fixed;

  z-index: 9999;
  color: black;
  bottom: 2rem;
  right: 2rem;
  border-radius: 10px;
  min-width: 14rem;
  ${(props) => {
    switch (props.type) {
      case "success":
        return css`
          background-color: lightgreen;
        `;
      case "error":
        return css`
          background-color: lightcoral;
        `;
      case "info":
        return css`
          background-color: lightgoldenrodyellow;
        `;
    }
  }}
`;

export const PopupHeader = styled.div`
  display: flex;
  flex-direction: row;
`;
export const PopupContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;
