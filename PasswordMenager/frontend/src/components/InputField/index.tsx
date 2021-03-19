import React from "react"
import styled from "styled-components";
const Input = styled.input`
  width: 90%;
  padding: 10px 15px;
  border: none;
  font-size: 1.15rem;
  border: 1px solid grey;
  border-radius: 10px;
  margin-top: 0.5rem;
  &:focus {
    outline: none;
    border: 1px solid slategray;
    border-radius: 10px;
  }
`;

type Props = {
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=>void
    placeholder: string
    type: string
}
const InputField = ({onChange,placeholder,type}: Props):JSX.Element=>{
    return <Input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
    />
}

export default InputField;