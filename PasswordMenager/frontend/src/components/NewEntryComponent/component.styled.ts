import styled from "styled-components";

export const EntryModalComponent = styled.div<{ disabled?: boolean }>`
  background-color: white;
  padding: 1rem;
  border-radius: 5px;
  width: 45rem;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
`;
export const NormalContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const PassLen = styled.div`
  font-size: ".9rem";
`;
export const GeneratorModal = styled.div`
  position: absolute;
  border-radius: 5px;
  background-color: whitesmoke;
  top: 50%;
  width: 15rem;
  right: 50%;
  margin-right: auto;
  margin-left: auto;
  transform: translate(50%, -50%);
  z-index: 2000;
  pointer-events: all;
`;
export const SectionContainer = styled.section`
  display: flex;
  align-items: baseline;
  align-content: center;
`;

export const PasswordFormContainer = styled.div`
  width: 75%;
  display: flex;
  align-items: center;

  & > svg {
    margin-top: 2.5rem;
    &:hover {
      cursor: pointer;
    }
  }
`;
export const GeneratorInsideModal = styled.div`
  position: relative;
  padding: 2rem;
  & > svg {
    position: absolute;
    top: 5%;
    right: 5%;
    &:hover {
      cursor: pointer;
    }
  }
`;
export const GeneratorSecionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;
export const ButtonsRangeContainer = styled.section`
  display: flex;
  justify-content: left;
  align-items: center;
  & > :not(:first-child) {
    margin-left: 1rem;
  }
`;
export const CheckBox = styled.input`
  margin-top: 5px;
`;
export const Checkboxes = styled.div`
  display: flex;
  justify-content: start;
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
