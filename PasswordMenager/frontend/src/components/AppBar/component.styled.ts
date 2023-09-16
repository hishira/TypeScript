import styled from "styled-components";

export const Bar = styled.header`
  display: flex;
  justify-content: space-between;
  height: 3rem;
  padding: .3rem;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 5px;
`;
export const LeftSide = styled.nav`
  width: 20%;
`;
export const RigthSide = styled.nav`
  min-height: 2rem;
  padding: 0.5rem;
  display: flex;
  align-items: flex-start;
  gap: .5rem;
  height: 3rem;
  min-height: 3rem;
  max-height : 3rem;
`;

