import { inject, observer } from "mobx-react";
import { View } from "../../../models/General";
import FieldsCardView from "../../FieldsCardView";
import FieldsComponent from "../../FieldsComponent";
import { Paginator } from "../../Paginator";
import { EmptyEntriesComponent } from "../EmptyEntries";
import { FieldSearchInput } from "../FieldSearchInput";
import { Entries } from "../component.styled";

const FieldsComponentMapper: {
  [key in View]: (
    refreshentities: any,
    selectedgroupid: any,
    entitiesrefresh: any,
    entries: any
  ) => JSX.Element;
} = {
  [View.Table]: (
    refreshentities,
    selectedgroupid,
    entitiesrefresh,
    entries
  ) => (
    <FieldsComponent
      refreshgroupentities={refreshentities}
      selectedgroup={selectedgroupid}
      refreshall={entitiesrefresh}
      passwords={entries}
    />
  ),
  [View.Card]: (refreshentities, selectedgroupid, entitiesrefresh, entries) => (
    <FieldsCardView
      selectedgroup={selectedgroupid}
      refreshall={entitiesrefresh}
      refreshgroupentities={refreshentities}
      passwords={entries}
    />
  ),
};
type PasswordMainComponentPropr = {
  viewType: View;
  entries: any;
  refreshentities: any;
  selectedgroupid: any;
  entitiesrefresh: any;
  paginator: any;
  paginatorChange: any;
  filterValuesChange: any;
  titleSearchEntry: any;
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
  titleSearchEntry,
}: PasswordMainComponentPropr) => {
  const searchChangeValue = (val: string) => {
    filterValuesChange(val);
  };
  return entries.length > 0 || titleSearchEntry !== "" ? (
    <Entries>
      <FieldSearchInput
        onSearchFieldChange={searchChangeValue}
      ></FieldSearchInput>
      {FieldsComponentMapper[viewType](
        refreshentities,
        selectedgroupid,
        entitiesrefresh,
        entries
      )}
      <Paginator pageInfo={paginator} paginationChange={paginatorChange} />
    </Entries>
  ) : (
    <EmptyEntriesComponent />
  );
};
export default inject("store")(observer(PasswordsMainComponent));
