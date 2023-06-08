import { GroupContainer, Groups } from "./component.styled";

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
          {group.name}
        </GroupContainer>
      ))}
    </Groups>
  );
};
