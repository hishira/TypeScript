import styled from "styled-components";

export const EntryModalComponent = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 5px;
  width: 35rem;
`;
export const NormalContainer = styled.div``;
export const PassLen = styled.div`
  font-size: ".9rem";
`;
export const SectionContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;
export const ButtonsRangeContainer = styled.section`
  display: flex;
  justify-content: left;
  align-items: center;
  align-content: center;
  & > :not(:first-child) {
    margin-left: 1rem;
  }
`
export const CheckBox = styled.input`
  transform: translate(0%, 175%);
`;
export const Checkboxes = styled.div`
  display: flex;
  flex-direction: column;
`;
export const PasswordCheckbox = styled.input``;
export const Checkboxwithlabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;
export const SelectLabel = styled.div`
  padding: 0.6rem 0.6rem 0.6rem 0.3rem;
  font-size: 1.05rem;
  text-align: start;
`;
export const SelectContainer = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1.05rem;
  width: 90%;
`;
export const OptionContainer = styled.option`
  padding: 1.4rem;
  font-size: 1.05rem;
  &:hover {
    background-color: lightsalmon;
  }
`;