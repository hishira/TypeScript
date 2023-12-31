import { inject, observer } from "mobx-react";
import { View } from "../../../models/General";
import FieldsCardView from "../../FieldsCardView";
import FieldsComponent from "../../FieldsComponent";
import { Paginator } from "../../Paginator";
import { EmptyEntriesComponent } from "../EmptyEntries";
import { FieldSearchInput } from "../FieldSearchInput";
import { Entries } from "../component.styled";

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
}: any) => {
  const searchChangeValue = (val: string) => {
    filterValuesChange(val);
  };
  return entries.length > 0 || titleSearchEntry !== "" ? (
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
export default inject("store")(observer(PasswordsMainComponent));
