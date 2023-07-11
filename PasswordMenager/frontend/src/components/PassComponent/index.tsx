import React, { useState } from "react";
import GroupComponent from "../GroupComponent/";
import FieldsComponent from "../FieldsComponent/";
import { Container, Entries } from "./component.styled";
import { inject, observer } from "mobx-react";
import { IGeneral, View } from "../../models/General";
import FieldsCardView from "../FieldsCardView";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import { Paginator } from "../Paginator";

type PassComponentProps = {
  store?: IGeneral;
};
const PassComponent = ({ store }: PassComponentProps) => {
  const [selectedgroupid, setgroupid] = useState<string>("");
  const [entitiesrefresh, setentitesrefresh] = useState<boolean>(false);
  const {entries, paginator} = PasswordEntries(selectedgroupid, entitiesrefresh);
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
      <Entries>
        {store?.ViewType === View.Table ? (
          <FieldsComponent
            refreshgroupentities={refreshentities}
            selectedgroup={selectedgroupid}
            refreshall={entitiesrefresh}
            passwords={entries}
          />
        ) : (
          <FieldsCardView
            selectedgroup={selectedgroupid}
            refreshall={entitiesrefresh}
            refreshgroupentities={refreshentities}
            passwords={entries}
          />
        )}
        <Paginator pageInfo={paginator} />
      </Entries>
    </Container>
  );
};

export default inject("store")(observer(PassComponent));
