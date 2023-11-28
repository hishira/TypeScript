import { inject, observer } from "mobx-react";
import { ChangeEvent, useState } from "react";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import { IGeneral, View } from "../../models/General";
import FieldsCardView from "../FieldsCardView";
import FieldsComponent from "../FieldsComponent/";
import FormElement from "../FormElement";
import GroupComponent from "../GroupComponent/";
import { Loading } from "../Loading";
import { EntryPaginator, Paginator } from "../Paginator";
import { Translation } from "../Translation";
import {
  Container,
  EmptyEntries,
  Entries,
  SearchContainer,
  Text,
} from "./component.styled";

type PassComponentProps = {
  store?: IGeneral;
};

type SearchFiledInputProps = {
  onSearchFieldChange: (value: string) => void;
};

const EmptyEntriesComponent = () => {
  return (
    <EmptyEntries>
      <Text>{Translation("entries.noEntriesAvailable")}</Text>
    </EmptyEntries>
  );
};

export const FieldSearchInput = ({
  onSearchFieldChange,
}: SearchFiledInputProps) => {
  const [serachFieldValue, setSerachFieldValue] = useState<string>("");
  const searchChangeFunction = (e: ChangeEvent<HTMLInputElement>) => {
    setSerachFieldValue(e.target.value);
    onSearchFieldChange(e.target.value);
  };
  return (
    <SearchContainer>
      <FormElement
        label={""}
        inputplaceholder="searchinput.searchByTitle"
        inputChange={searchChangeFunction}
        inputtype="txt"
        value={serachFieldValue}
      />
    </SearchContainer>
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
  filterValuesChange,
  titleSearchEntry
}: any) => {
  const searchChangeValue = (val: string) => {
    filterValuesChange(val);
  };
  return entries.length > 0 || titleSearchEntry !== '' ? (
    <Entries>
      <FieldSearchInput
        onSearchFieldChange={searchChangeValue}
      ></FieldSearchInput>
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
  const [tiltEntry, setTitleEntry] = useState<string>("");
  const [entitiesrefresh, setentitesrefresh] = useState<boolean>(false);
  const [sendPaginator, setPaginator] = useState<EntryPaginator>({ page: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const { entries, paginator } = PasswordEntries(
    selectedgroupid,
    tiltEntry,
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

  const filterValuesChange = (val: string): void => {
    setTitleEntry(val);
    console.log(val);
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
