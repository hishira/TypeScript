import { DOMAttributes, useState } from "react";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import { DownIcon } from "../icons/DownIcon";
import { UpIcon } from "../icons/UpIcon";
import {
  Card,
  CardContent,
  CardExpand,
  CardExpandContent,
  CardExpandContentRow,
  CardFieldName,
  CardFieldValue,
  CardHeader,
  CardIcons,
  Cards,
  CardsContainer,
} from "./component.styled";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { PasswordFieldsHelper } from "../PasswordTable/PasswordField";
import { FieldsModal } from "../FieldsComponent/FieldsModal";
import { FieldsActionHook } from "../../hooks/actionFields.hook";
import { Entry } from "../../utils/entry.utils";
import { DeleteEntryModal } from "../FieldsComponent";

// TODO End component
type FieldsCardViewProps = {
  selectedgroup: string;
  refreshall: boolean;
  refreshgroupentities: Function;
};
type CardEntry = {
  open: boolean;
} & IEntry;

type FieldsIconProps = {
  entry: CardEntry;
  close: (entry: CardEntry) => void;
  open: (entry: CardEntry) => void;
};
const FieldsIcon = ({ entry, open, close }: FieldsIconProps) => {
  return entry.open ? (
    <UpIcon click={() => close(entry)} />
  ) : (
    <DownIcon click={() => open(entry)} />
  );
};

type CardComponentProps = {
  entry: CardEntry;
  deleteHandle: Function;
  editHandle: Function;
};
type CardExpendContentRowProps = {
  fieldName: string;
  value: string;
  isPassword?: boolean;
};
type ValueFieldPropd = {
  isPassword: boolean | undefined;
  value: string | IEntry | null;
};
const ValueField = ({ isPassword, value }: ValueFieldPropd) => {
  const props: DOMAttributes<HTMLDivElement> = {};
  if (isPassword) {
    props["onClick"] = () => PasswordFieldsHelper.passwordClick(value);
  }
  return isPassword ? (
    <CardFieldValue {...props}>
      <span>******</span>
    </CardFieldValue>
  ) : (
    <CardFieldValue {...props}>{value}</CardFieldValue>
  );
};
const CardExpendContentRow = ({
  fieldName,
  value,
  isPassword,
}: CardExpendContentRowProps) => {
  return (
    <CardExpandContentRow>
      <CardFieldName>{fieldName}</CardFieldName>
      <ValueField isPassword={isPassword} value={value}></ValueField>
    </CardExpandContentRow>
  );
};
const CardExpandComponent = ({
  entry,
  editHandle,
  deleteHandle,
}: CardComponentProps) => {
  return entry.open ? (
    <CardExpand>
      <CardExpandContent>
        <CardExpendContentRow fieldName="Username" value={entry.username} />
        <CardExpendContentRow
          fieldName="Password"
          value={entry.password}
          isPassword={true}
        />
        <CardExpendContentRow fieldName="Note" value={entry.note} />
        {entry.url ? (
          <CardExpendContentRow fieldName="Url" value={entry.url} />
        ) : null}
        {entry.passwordExpiredDate ? (
          <CardExpendContentRow
            fieldName="Expired to"
            value={entry.passwordExpiredDate}
          />
        ) : null}
      </CardExpandContent>
      <CardIcons>
        <EditIcon click={() => editHandle(entry)} />{" "}
        <DeleteIcon click={() => deleteHandle(entry)} />
      </CardIcons>
    </CardExpand>
  ) : null;
};
const CartComponent = ({
  entry,
  deleteHandle,
  editHandle,
}: CardComponentProps) => {
  const [entryCard, setEntryCard] = useState<CardEntry>(entry);

  return (
    <Card>
      <CardHeader>
        <CardContent>
          <div>{entryCard.title}</div>
        </CardContent>
        <CardIcons>
          <FieldsIcon
            entry={entryCard}
            close={(entry) => setEntryCard({ ...entryCard, open: false })}
            open={(entry) => setEntryCard({ ...entryCard, open: true })}
          />
        </CardIcons>
      </CardHeader>
      <CardExpandComponent
        entry={entryCard}
        deleteHandle={deleteHandle}
        editHandle={editHandle}
      />
    </Card>
  );
};

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
    <CartComponent
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
}: FieldsCardViewProps): JSX.Element => {
  const FieldsAction = FieldsActionHook();

  const entries: CardEntry[] = EntriesMappes(
    PasswordEntries(selectedgroup, refreshall)
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
