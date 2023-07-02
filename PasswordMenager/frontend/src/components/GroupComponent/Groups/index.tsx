import { DeleteIcon } from "../../icons/DeleteIcon";
import { EditIcon } from "../../icons/EditIcon";
import { MoreOption } from "../../icons/MoreOptions";
import {
  GroupContainer,
  GroupName,
  GroupOption,
  Groups,
  GroupsIcon,
} from "./component.styled";

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


const getMappedGroup = (
  groups: IGroup[],
  selectedgroup: string,
  ongroupclick: Function,
  editHandle: (groupId: string) => void,
  deleteHandle: (groupId: string) => void
): JSX.Element[] =>
  groups.map((group: IGroup) => (
    <GroupContainer key={group._id} isSelected={selectedgroup === group._id}>
      <GroupName
        onClick={() => ongroupclick(group)}
        isSelected={selectedgroup === group._id}
      >
        {group.name}
      </GroupName>
      {group._id !== "" ? (
        <GroupOption>
          <MoreOption />
          <GroupsIcon>
            <EditIcon click={() => editHandle(group._id)} />
            <DeleteIcon click={() => deleteHandle(group._id)} />
          </GroupsIcon>
        </GroupOption>
      ) : null}
    </GroupContainer>
  ));
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
