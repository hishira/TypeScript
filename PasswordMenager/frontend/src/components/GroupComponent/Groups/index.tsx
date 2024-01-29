import { getMappedGroup } from "./GroupElement";
import { Groups } from "./component.styled";

const EmptyGroup: IGroup = {
  _id: "",
  name: "Entries without group",
  userid: "",
};
type GroupsComponentProps = {
  groups: IGroup[];
  ongroupclick: Function;
  selectedgroup: string;
  editHandle: (groupId: string) => void;
  deleteHandle: (groupId: string) => void;
};

export const GroupsComponent = ({
  groups,
  ongroupclick,
  selectedgroup,
  editHandle,
  deleteHandle,
}: GroupsComponentProps) => {
  const groupsWithEmpty = [...groups, EmptyGroup];
  const MappedGroup = getMappedGroup(
    groupsWithEmpty,
    selectedgroup,
    ongroupclick,
    editHandle,
    deleteHandle
  );
  return <Groups>{MappedGroup}</Groups>;
};
