import styled from "styled-components";

export const TitleContainer = styled.div`
  font-size: 20px;
  font-weight: 550;
  color: rgba(0, 0, 0, 0.8);
  position: relative;
  & > svg {
    position: absolute;
    right: 0;
  }
`;

export const ContentContainer = styled.div`
  font-size: 16px;
  font-weight: 550;
  color: rgba(0, 0, 0, 0.65);
`;

export const Errors = styled.span<{ width?: string }>`
  display: inline-flex;
  margin-top: .5rem;
  flex-direction: column;
  width: ${({ width }) => (width ? `${width}` : "90%")};
`;
export const ErrorContainer = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: red;
  text-align: left;
//  width: 100% !important;
`;
