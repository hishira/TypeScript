import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Container = styled.div`
    display: flex;
    padding: 5px;
    & > *:not(:first-child){
        margin-left: 15px;
    }

`

const PassBar = ():JSX.Element=>{
    return <Container>
        <Button color="lightgray">New entry</Button>
        <Button color="lightgray">Generate</Button>
    </Container>
}

export default PassBar;