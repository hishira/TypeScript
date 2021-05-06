import styled from "styled-components";

const MainPageComponent = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MainTextComponent = styled.p`
  padding: 5rem 0rem 2rem 0rem;
  text-align: center;
  margin: 5rem 5rem 1rem 5rem;
  font-size: 2rem;
  font-family: "Courier New", Courier, monospace;
  font-weight: 600;
  text-decoration: double;
  @media (max-width: 650px) {
    font-size: 1.7rem;
  }
`;
const MainInputContainer = styled.div`
  padding: 3rem 3rem 2rem 3rem;
  margin: 1rem 5rem 1rem 5rem;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;
const MainInput = styled.textarea`
  overflow-y: hidden;
  resize: none;
  padding: 0.8rem 2rem 0.8rem 1rem;
  width: 25rem;
  border-radius: 10px;
  font-size: 1.3rem;
  background-color: transparent;
  border: .1rem solid lightgray;
  &:focus {
    outline: none;
  }
  @media (max-width: 650px) {
    width: 14rem;
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
  @media (max-width: 650px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const ResetClick = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 30%;
  &::after {
    content: " ";
    position: absolute;
    width: 20px;
    height: 3px;
    background: black;
    transform: rotate(45deg);
  }
  &::before {
    content: " ";
    position: absolute;
    width: 20px;
    height: 3px;
    background: black;
    transform: translateY(90%) rotate(-45deg);
  }
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;
const Task = styled.article`
  background-color: whitesmoke;
  width: 90%;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  position: relative;
  border-radius: 10px;
  box-shadow: .2rem .2rem 0.2rem slategrey;
`;
const TaskDateContainer = styled.p`
  padding: 0rem 0.3rem 0.3rem 0.3rem;
  color: lightslategray;
`;
const TaskContextContainer = styled.p`
  padding: .5rem;
  text-align: start;
`;
const TaskUpContainer = styled.p`
  display: flex;
  border-bottom: 0.01rem solid slategray;
  justify-content: space-between;
  align-items: center;
`
const DeleteAllTaskButton = styled.button`
  padding: .7rem;
  margin-top: .1rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1.05rem;
  cursor: pointer;
  background-color: lightgray;
  &:active{
    background-color: grey;
  }
`
const TaskDeleteButton = styled.button`
  padding: .7rem;
  position: relative;
  right: 0;
  top: 0;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1.05rem;
  transform: translateY(-2rem);
  cursor: pointer;
  background-color: transparent;
  &:active{
    background-color: grey;
  }
  &::before{
    content: " ";
    width: 100%;
    height: 3px;
    background-color: grey;
    position:absolute;
    left: 0;
    top: 45%;
    transform: rotate(45deg);
  }
  &::after{
    content: " ";
    width: 100%;
    height: 3px;
    background-color: grey;
    position: absolute;
    left: 0;
    top:45%;
    transform: rotate(-45deg);
  }
`
const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: .5rem;
`
const SelectLabel = styled.label`
  font-size: 1.15rem;
`
const Select = styled.select`
  padding: 0.7rem 1.2rem;
  width: 30%;
  border-radius: 10px;
  @media (max-width:  870px){
    width: 60%; 
  }
  @media (max-width:  450px){
    width: 100%; 
  }
  &:focus{
    border: .1rem solid slategray;
    border-radius: 10px;
    outline: none;
  }
  &:active{
    border: none;
    outline: none;
    border: .1rem solid slategray;
    border-radius: 10px;
  }
`
const SelectOption = styled.option`
  padding: .4rem;
`
export {
  MainPageComponent,
  MainTextComponent,
  MainInputContainer,
  MainInput,
  TaskButton,
  ResetClick,
  TasksContainer,
  Task,
  TaskDateContainer,
  TaskContextContainer,
  TaskUpContainer,
  TaskDeleteButton,
  SelectContainer, 
  SelectLabel,
  Select,
  SelectOption,
  DeleteAllTaskButton,
};
