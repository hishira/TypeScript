import { DeleteIcon } from "../../icons/DeleteIcon";
import { EditIcon } from "../../icons/EditIcon";
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
};
export const GroupsComponent = ({
  groups,
  ongroupclick,
  selectedgroup,
}: GroupsComponentProps) => {
  return (
    <Groups>
      {groups.map((group: IGroup) => (
        <GroupContainer
          key={group._id}
          isSelected={selectedgroup === group._id}
          onClick={() => ongroupclick(group)}
        >
          <GroupName isSelected={selectedgroup === group._id}>
            {group.name}
          </GroupName>
          <GroupOption>
            ...
            <GroupsIcon>
              <EditIcon />
              <DeleteIcon />
            </GroupsIcon>
          </GroupOption>
        </GroupContainer>
      ))}
    </Groups>
  );
};
