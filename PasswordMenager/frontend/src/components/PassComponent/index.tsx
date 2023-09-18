import { inject, observer } from "mobx-react";
import { useState, Fragment } from "react";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import { IGeneral, View } from "../../models/General";
import FieldsCardView from "../FieldsCardView";
import FieldsComponent from "../FieldsComponent/";
import GroupComponent from "../GroupComponent/";
import { Loading } from "../Loading";
import { EntryPaginator, Paginator } from "../Paginator";
import { Translation } from "../Translation";
import { Container, EmptyEntries, Entries, Text } from "./component.styled";
import FormElement from "../FormElement";

type PassComponentProps = {
  store?: IGeneral;
};
const EmptyEntriesComponent = () => {
  return (
    <EmptyEntries>
      <Text>{Translation("entries.noEntriesAvailable")}</Text>
    </EmptyEntries>
  );
};

export const FieldSearchInput = () => {
  const [serachFieldValue, setSearchFieldValue] = useState<string>("");
  return (
    <Fragment>
      <FormElement
        label={""}
        withBorder={true}
        inputplaceholder="newentry.field.title"
        inputChange={(e) => {
          setSearchFieldValue(e.target.value);
        }}
        inputtype="txt"
        value={serachFieldValue}
      />
    </Fragment>
  );
};
const PasswordsMainComponent = ({
  viewType,
  entries,
  refreshentities,
  selectedgroupid,
  entitiesrefresh,
  paginator,
  paginatorChange,
}: any) => {
  return entries.length > 0 ? (
    <Entries>
      <FieldSearchInput></FieldSearchInput>
      {viewType === View.Table ? (
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
      <Paginator pageInfo={paginator} paginationChange={paginatorChange} />
    </Entries>
  ) : (
    <EmptyEntriesComponent />
  );
};
inject("store")(observer(PasswordsMainComponent));
const PassComponent = ({ store }: PassComponentProps) => {
  const [selectedgroupid, setgroupid] = useState<string>("");
  const [entitiesrefresh, setentitesrefresh] = useState<boolean>(false);
  const [sendPaginator, setPaginator] = useState<EntryPaginator>({ page: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const { entries, paginator } = PasswordEntries(
    selectedgroupid,
    entitiesrefresh,
    sendPaginator,
    setLoading
  );
  const selectgrouphandle = (groupid: string) => {
    setgroupid(groupid);
  };
  const refreshentities = (): void => {
    setgroupid(selectedgroupid);
    setentitesrefresh(!entitiesrefresh);
  };

  const paginatorChange = (paginator: EntryPaginator): void => {
    setPaginator(paginator);
  };
  return (
    <Container className="dupa">
      <GroupComponent selectgrouphandle={selectgrouphandle} />
      <Loading
        loading={loading}
        ComponentToLoad={
          <PasswordsMainComponent
            entries={entries}
            viewType={store?.ViewType}
            refreshentities={refreshentities}
            selectedgroupid={selectedgroupid}
            entitiesrefresh={entitiesrefresh}
            paginator={paginator}
            paginatorChange={paginatorChange}
          />
        }
      ></Loading>
    </Container>
  );
};

export default inject("store")(observer(PassComponent));
