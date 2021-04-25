import styled from "styled-components";

const MainPageComponent = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 2px solid red;
`;
const MainTextComponent = styled.p`
  padding: 5rem 5rem 2rem 5rem;
  border: 2px solid purple;
  text-align: center;
  margin: 5rem 5rem 1rem 5rem;
  font-size: 2rem;
  font-family: "Courier New", Courier, monospace;
  font-weight: 600;
  text-decoration: double;
`;
const MainInputContainer = styled.div`
  border: 2px solid green;
  padding: 3rem 3rem 2rem 3rem;
  margin: 1rem 5rem 1rem 5rem;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

`;
const MainInput = styled.input`
  padding: 0.8rem 2rem .8rem 3rem;
  width: 25rem;
  border-radius: 10px;
  border: 0.2rem solid slateblue;
  font-size: 1.3rem;
  &:focus {
    outline: none;
  }
`;
const TaskButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: lightblue;
  border: 0.1rem solid slateblue;
  border-radius: 5px;
  font-size: 1.3rem;
  cursor: pointer;
  margin-left: 2rem;
  &:active {
    transform: scale(0.9);
  }
`;

const ResetClick = styled.span`
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid red;
    left: 30%;
    &::after{
        content: " ";
        position: absolute;
        width: 20px;
        height: 3px;
        background: black;
        transform: rotate(45deg);
    }
    &::before{
        content: " ";
        position: absolute;
        width: 20px;
        height: 3px;
        background: black;
        transform: translateY(90%) rotate(-45deg);
    }
`;
export {
  MainPageComponent,
  MainTextComponent,
  MainInputContainer,
  MainInput,
  TaskButton,
  ResetClick,
};
