import { inject, observer } from "mobx-react";
import { useState } from "react";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import GroupComponent from "../GroupComponent/";
import { Loading } from "../Loading";
import PasswordsMainComponent from "./PasswordsMainComponent";
import { Container } from "./component.styled";

const PassComponent = ({ store }: PassComponentProps) => {
  const [selectedgroupid, setSelectedgroupid] = useState<string>("");
  const [tiltEntry, setTiltEntry] = useState<string>("");
  const [entitiesrefresh, setEntitiesrefresh] = useState<boolean>(false);
  const [sendPaginator, setSendPaginator] = useState<EntryPaginator>({
    page: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { entries, paginator } = PasswordEntries(
    selectedgroupid,
    tiltEntry,
    entitiesrefresh,
    sendPaginator,
    setLoading
  );
  const selectgrouphandle = (groupid: string) => {
    setSelectedgroupid(groupid);
    setSendPaginator({ page: 0 });
  };
  const refreshentities = (): void => {
    setSelectedgroupid(selectedgroupid);
    setSendPaginator({ page: 0 });
    setTiltEntry("");
    setEntitiesrefresh((a) => !a);
  };

  const paginatorChange = (paginator: EntryPaginator): void => {
    setSendPaginator(paginator);
  };

  const filterValuesChange = (val: string): void => {
    setTiltEntry(val);
  };
  return (
    <Container className="dupa">
      <GroupComponent selectgrouphandle={selectgrouphandle} />
      <Loading
        loading={loading}
        ComponentToLoad={
          <PasswordsMainComponent
            titleSearchEntry={tiltEntry}
            entries={entries}
            viewType={store?.ViewType}
            refreshentities={refreshentities}
            selectedgroupid={selectedgroupid}
            entitiesrefresh={entitiesrefresh}
            paginator={paginator}
            paginatorChange={paginatorChange}
            filterValuesChange={filterValuesChange}
          />
        }
      ></Loading>
    </Container>
  );
};

export default inject("store")(observer(PassComponent));
