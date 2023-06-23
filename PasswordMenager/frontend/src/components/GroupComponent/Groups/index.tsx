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
  const groupsWithEmpty = [
    ...groups,
    {
      _id: '',
      name: "Entries without group",
      userid: "",
    },
  ];
  return (
    <Groups>
      {groupsWithEmpty.map((group: IGroup) => (
        <GroupContainer
          key={group._id}
          isSelected={selectedgroup === group._id}
        >
          <GroupName
            onClick={() => ongroupclick(group)}
            isSelected={selectedgroup === group._id}
          >
            {group.name}
          </GroupName>
          <GroupOption>
            <MoreOption />
            <GroupsIcon>
              <EditIcon click={() => editHandle(group._id)} />
              <DeleteIcon click={() => deleteHandle(group._id)} />
            </GroupsIcon>
          </GroupOption>
        </GroupContainer>
      ))}
    </Groups>
  );
};
