import React, { useState } from "react";
import styled from "styled-components";
import GroupComponent from "../GroupComponent/";
import FieldsComponent from "../FieldsComponent/";
const Container = styled.div`
  display: flex;
  width: 100%;
  outline: 0.1rem solid slategray;
  height: 89.5vh;
  @media (max-width: 500px){
    flex-direction: column;
    height: inherit;
  }
  
`;
const PassComponent = () => {
  const [selectedgroupid, setgroupid] = useState<string>("");
  const selectgrouphandle = (groupid: string) => {
    setgroupid(groupid);
  };
  const refreshentities = ():void=>{
    setgroupid(selectedgroupid);
  }
  return (
    <Container className="dupa">
      <GroupComponent selectgrouphandle={selectgrouphandle} />
      <FieldsComponent refreshgroupentities={refreshentities} selectedgroup={selectedgroupid} />
    </Container>
  );
};

export default PassComponent;
