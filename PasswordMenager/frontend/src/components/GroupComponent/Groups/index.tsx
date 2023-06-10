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
  editHandle: () => void;
  deleteHandle: () => void;
};
export const GroupsComponent = ({
  groups,
  ongroupclick,
  selectedgroup,
  editHandle,
  deleteHandle,
}: GroupsComponentProps) => {
  return (
    <Groups>
      {groups.map((group: IGroup) => (
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
              <EditIcon click={editHandle} />
              <DeleteIcon click={deleteHandle} />
            </GroupsIcon>
          </GroupOption>
        </GroupContainer>
      ))}
    </Groups>
  );
};
