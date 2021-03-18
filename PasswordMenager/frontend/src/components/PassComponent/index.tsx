import React from "react"
import styled from "styled-components"
import GroupComponent from "../GroupComponent/"
import FieldsComponent from "../FieldsComponent/";
const Container = styled.div`
    display: flex;
    width: 100%;
    outline: .1rem solid slategray;
    height: 89.5vh;
`
const PassComponent = ()=>{
    return <Container className="dupa">
        <GroupComponent/>
        <FieldsComponent/>
    </Container>
};

export default PassComponent;