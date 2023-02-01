import React, { useState } from "react";
import GroupComponent from "../GroupComponent/";
import FieldsComponent from "../FieldsComponent/";
import { Container } from "../PassBarr/component.styled";

const PassComponent = () => {
  const [selectedgroupid, setgroupid] = useState<string>("");
  const [entitiesrefresh, setentitesrefresh] = useState<boolean>(false);
  const selectgrouphandle = (groupid: string) => {
    setgroupid(groupid);
  };
  const refreshentities = (): void => {
    setgroupid(selectedgroupid);
    setentitesrefresh(!entitiesrefresh);
  };
  return (
    <Container className="dupa">
      <GroupComponent selectgrouphandle={selectgrouphandle} />
      <FieldsComponent
        refreshgroupentities={refreshentities}
        selectedgroup={selectedgroupid}
        refreshall={entitiesrefresh}
      />
    </Container>
  );
};

export default PassComponent;
