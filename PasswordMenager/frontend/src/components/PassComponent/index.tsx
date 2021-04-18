import React, { useState } from "react";
import styled from "styled-components";
import GroupComponent from "../GroupComponent/";
import FieldsComponent from "../FieldsComponent/";
const Container = styled.div`
  display: flex;
  width: 100%;
  outline: 0.1rem solid slategray;
  height: 89.5vh;
`;
const PassComponent = () => {
  const [selectedgroupid, setgroupid] = useState<string>("");
  const selectgrouphandle = (groupid: string) => {
    setgroupid(groupid);
  };
  return (
    <Container className="dupa">
      <GroupComponent selectgrouphandle={selectgrouphandle} />
      <FieldsComponent selectedgroup={selectedgroupid} />
    </Container>
  );
};

export default PassComponent;
