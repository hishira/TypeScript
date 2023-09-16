import Button from "../Button";
import { Translation } from "../Translation";
import { CloseIcon } from "../icons/CloseIcon";
import { EditEntryActionDispatcher } from "./EditEntryActionDispatcher";
import {
  Checkboxes,
  Checkboxwithlabel,
  GeneratorInsideModal,
  GeneratorModal,
  GeneratorSecionContainer,
  LengthDiv,
  NormalContainer,
  OptionContainer,
  PasswordCheckbox,
  RangeContainer,
  SelectContainer,
  SelectLabel,
} from "./component.styled";

type GroupSelectionProps = {
  edit: boolean | undefined;
  editEntry: EditEntryActionDispatcher;
  groups: IGroup[];
};
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

type PasswordGeneratorOptionProps = {
  editEntry: EditEntryActionDispatcher;
  open: boolean;
  passwordLength: number;
  passwordLengthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
};
export const PasswordGeneratorOption = ({
  editEntry,
  open,
  passwordLength,
  passwordLengthChange,
  onClose,
}: PasswordGeneratorOptionProps) => {
  return open ? (
    <GeneratorModal>
      <GeneratorInsideModal>
        <CloseIcon click={onClose} />
        <GeneratorSecionContainer>
          <Checkboxes>
            <Checkboxwithlabel>
              <PasswordCheckbox
                type="checkbox"
                onChange={editEntry.letterscheckbox.bind(editEntry)}
                checked={editEntry.passwordcharacters.letters}
              />
              <div>{Translation("newentry.helpers.letters")}</div>
            </Checkboxwithlabel>
            <Checkboxwithlabel>
              <PasswordCheckbox
                type="checkbox"
                onChange={editEntry.numberscheckbox.bind(editEntry)}
                checked={editEntry.passwordcharacters.numbers}
              />
              <div>{Translation("newentry.helpers.numbers")}</div>
            </Checkboxwithlabel>
            <Checkboxwithlabel>
              <PasswordCheckbox
                type="checkbox"
                onChange={editEntry.specialcharacters.bind(editEntry)}
                checked={editEntry.passwordcharacters.specialChar}
              />
              <div>{Translation("newentry.helpers.specialCharacters")}</div>
            </Checkboxwithlabel>
          </Checkboxes>
          <div>
            <LengthDiv>Length</LengthDiv>
            <RangeContainer>
              <input
                type="range"
                min="6"
                max="50"
                list="markers"
                value={passwordLength}
                onChange={passwordLengthChange}
              />
              <span>{passwordLength}</span>
            </RangeContainer>
          </div>
          <Button
            size="small"
            color="lightblue"
            onClick={editEntry.generateHandle.bind(editEntry)}
          >
            {Translation("newentry.action.generate")}
          </Button>
        </GeneratorSecionContainer>
      </GeneratorInsideModal>
    </GeneratorModal>
  ) : null;
};
