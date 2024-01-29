import { DeleteIcon } from "../../../icons/DeleteIcon";
import { EditIcon } from "../../../icons/EditIcon";
import { MoreOption } from "../../../icons/MoreOptions";
import {
  GroupContainer,
  GroupName,
  GroupOption,
  GroupsIcon,
} from "../component.styled";

type GrouContainerElementProps = {
  group: IGroup;
  selectedgroup: string;
  ongroupclick: Function;
  editHandle: (groupId: string) => void;
  deleteHandle: (groupId: string) => void;
};
const GroupContainerElement = ({
  group,
  selectedgroup,
  ongroupclick,
  editHandle,
  deleteHandle,
}: GrouContainerElementProps) => (
  <GroupContainer key={group._id} isSelected={selectedgroup === group._id}>
    <GroupName onClick={() => ongroupclick(group)}>{group.name}</GroupName>
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
);

export const getMappedGroup = (
  groups: IGroup[],
  selectedgroup: string,
  ongroupclick: Function,
  editHandle: (groupId: string) => void,
  deleteHandle: (groupId: string) => void
): JSX.Element[] =>
  groups.map((group: IGroup) => (
    <GroupContainerElement
      key={group._id}
      group={group}
      selectedgroup={selectedgroup}
      ongroupclick={ongroupclick}
      editHandle={editHandle}
      deleteHandle={deleteHandle}
    />
  ));
