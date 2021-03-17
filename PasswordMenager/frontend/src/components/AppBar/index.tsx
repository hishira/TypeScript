import React from "react";
import  styled from 'styled-components';
import Button from "../Button/index";
import {useHistory} from "react-router-dom";
const Bar = styled.div`
    display: flex;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 4px 10px;

`
const LeftSide = styled.div`

`
const RigthSide = styled.div`
    padding: .5rem;
`
const AppBar = ():JSX.Element=>{
    const hisotry = useHistory();
    const loginclick = ()=>{
        hisotry.push("/login")
    }
    return <Bar>
        <LeftSide/>
        <RigthSide>
            <Button onClick={()=>loginclick()} color="lightblue">Login</Button>
        </RigthSide>
    </Bar>
}
export default AppBar