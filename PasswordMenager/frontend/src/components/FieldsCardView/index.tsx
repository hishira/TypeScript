import { FieldsActionHook } from "../../hooks/actionFields.hook";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import { Entry } from "../../utils/entry.utils";
import { DeleteEntryModal } from "../FieldsComponent";
import { FieldsModal } from "../FieldsComponent/FieldsModal";
import { Cards, CardsContainer } from "./component.styled";
import { CardComponent, CardEntry, FieldsCardViewProps } from "./view";


const EntriesMappes = (entries: IEntry[]): CardEntry[] =>
  entries.map((entry) => ({
    ...entry,
    open: false,
  }));

const EntriesComponentMapper = (
  entries: CardEntry[],
  editFunction: Function,
  deleteFunction: Function
) =>
  entries.map((entry) => (
    <CardComponent
      editHandle={editFunction}
      deleteHandle={deleteFunction}
      entry={entry}
      key={entry._id}
    />
  ));

const FieldsCardView = ({
  selectedgroup,
  refreshall,
  refreshgroupentities,
  passwords,
}: FieldsCardViewProps): JSX.Element => {
  const FieldsAction = FieldsActionHook();

  const entries: CardEntry[] = EntriesMappes(
    passwords
  );
  const deleteHandle = (entry: IEntry) => {
    FieldsAction.setEntryToDelete(entry._id);
    FieldsAction.setDeleteModalOpen(true);
  };

  const editHandle = (entry: IEntry) => {
    FieldsAction.setEntryToEdit(entry._id);
    FieldsAction.setEditModalOpen(true);
  };
  const Entries: JSX.Element[] = EntriesComponentMapper(
    entries,
    editHandle,
    deleteHandle
  );
  const refreshentry: Function = (): void => {
    refreshgroupentities();
  };

  const acceptDeleteHandle = () => {
    Entry.getInstance()
      .DeleteUserEntry(FieldsAction.entryToDelete)
      .then((response) => {
        if (response.status) {
          refreshgroupentities();
          FieldsAction.setDeleteModalOpen(false);
        }
      })
      .catch((e) => e && console.error(e));
  };
  return (
    <CardsContainer>
      <FieldsModal
        actionFields={FieldsAction}
        refreshEntry={refreshentry}
        deleteAcceptHandle={acceptDeleteHandle}
        DeleteEntryModal={DeleteEntryModal}
        refreshgroupentities={refreshgroupentities}
      />
      <Cards>{Entries}</Cards>
    </CardsContainer>
  );
};

export default FieldsCardView;
