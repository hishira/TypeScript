import styled from "styled-components";

export const FormElementComponent = styled.p<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || "90%"};
`;
export const InputLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  & > span {
    margin-top: 5px;
    position: relative;
    & > span[test-tooltip="tooltip-text"] {
      font-weight: normal;
      background-color: #4d4d4d;
      color: white;
      border-radius: 10px;
      position: absolute;
      font-size: 12px;
      padding: 5px;
      width: 300px;
      min-width: 200px;
      max-width: 400px;
      top: 0;

      visibility: hidden;
    }
  }
  & > span > svg:hover {
    cursor: pointer;
    & ~ span[test-tooltip="tooltip-text"] {
      font-weight: normal;
      visibility: visible;
    }
  }
`;
export const InputLabel = styled.label<{ fontSize?: string, isError?: boolean }>`
  font-size: ${({ fontSize }) => fontSize ?? " 1.2rem"};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 5px 5px 5px 0px;
  padding-left: 0.3rem;
  color: ${({isError})=> isError ? 'lightsalmon' : 'grey'};
`;
