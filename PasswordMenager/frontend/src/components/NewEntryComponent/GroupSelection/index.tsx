import { Translation } from "../../Translation";
import {
    NormalContainer,
    OptionContainer,
    SelectContainer,
    SelectLabel,
} from "../component.styled";
import { GroupSelectionProps } from "../types";

export const GroupSelection = ({
  edit,
  editEntry,
  groups,
}: GroupSelectionProps) =>
  !edit ? (
    <NormalContainer>
      <SelectLabel>{Translation("newentry.helpers.groupSelect")}</SelectLabel>
      <SelectContainer
        onChange={editEntry.groupset.bind(editEntry)}
        defaultValue={""}
      >
        {groups.map((group) => (
          <OptionContainer key={group._id} value={group._id}>
            {group.name}
          </OptionContainer>
        ))}
      </SelectContainer>
    </NormalContainer>
  ) : null;
