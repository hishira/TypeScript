import React from "react";
import styled from "styled-components";
import Button from "../Button";
const Container = styled.div`
  display: flex;
  flex-direction: column;
    justify-content: space-between;
  width: 30%;
  
  border-right: 0.1rem solid slategray;
`;
const Groups = styled.div`
    height: 100%;
    max-height: 100%;
    overflow: auto;
  border: 2px solid red;
  scroll-behavior: smooth;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    border: 2px solid purple;
    padding: 1rem;
    box-sizing: border-box; 
`;
const GroupComponent = () => {
  return (
    <Container>
      <Groups>
                 
      </Groups>
      <ButtonContainer>
        <Button color="lightblue">Add new group</Button>
      </ButtonContainer>
    </Container>
  );
};

export default GroupComponent;
