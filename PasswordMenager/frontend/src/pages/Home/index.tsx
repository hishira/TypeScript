import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 90vh;
`;
const Typograph = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;
const HomePage = () => {
  return (
    <Container>
      <Typograph>Hello</Typograph>
    </Container>
  );
};

export default HomePage;
