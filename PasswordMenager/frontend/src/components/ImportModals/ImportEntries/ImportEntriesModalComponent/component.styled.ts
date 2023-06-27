import styled from "styled-components";

export const ImportEntries = styled.div`
  padding: 2rem;
  border-radius: 10px;
  min-width: 30rem;
  min-height: 5rem;
  max-height: 15rem;
  max-width: 30rem;
`;

export const OwnFieldsOrder = styled.div`
    display: flex;
    gap: 1.4rem;
    margin-top: 1rem;
    align-content: center;
    box-sizing: border-box;
    & > input{
        margin-top: .2rem;
    }
`
export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  border: 0.05rem solid slategrey;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  width: 1.1rem;
  height: 1.1rem;
  display: grid;
  place-content: center;
  &::before {
    content: "";
    width: .9rem;
    height: .9rem;
    border-radius: 4px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em lightsteelblue;
  }
  &:checked::before{
    transform: scale(1);
  }
`;
