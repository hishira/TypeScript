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
};
export const GroupsComponent = ({
  groups,
  ongroupclick,
  selectedgroup,
}: GroupsComponentProps) => {
  const edit = () => console.log("Edit function");
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
            <MoreOption />
            <GroupsIcon>
              <EditIcon click={edit} />
              <DeleteIcon />
            </GroupsIcon>
          </GroupOption>
        </GroupContainer>
      ))}
    </Groups>
  );
};
