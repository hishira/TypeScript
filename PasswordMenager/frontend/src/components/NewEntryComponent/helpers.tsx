import { CloseIcon } from "../icons/CloseIcon";
import { EditEntryActionDispatcher } from "./EditEntryActionDispatcher";
import {
  Checkboxes,
  Checkboxwithlabel,
  GeneratorInsideModal,
  GeneratorModal,
  GeneratorSecionContainer,
  NormalContainer,
  OptionContainer,
  PasswordCheckbox,
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
      <SelectLabel>Select group</SelectLabel>
      <SelectContainer
        onChange={editEntry.groupset.bind(editEntry)}
        defaultValue={''}
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
              <div>Letters</div>
            </Checkboxwithlabel>
            <Checkboxwithlabel>
              <PasswordCheckbox
                type="checkbox"
                onChange={editEntry.numberscheckbox.bind(editEntry)}
                checked={editEntry.passwordcharacters.numbers}

              />
              <div>Numbers</div>
            </Checkboxwithlabel>
            <Checkboxwithlabel>
              <PasswordCheckbox
                type="checkbox"
                onChange={editEntry.specialcharacters.bind(editEntry)}
                checked={editEntry.passwordcharacters.specialChar}

              />
              <div>Special characters</div>
            </Checkboxwithlabel>
          </Checkboxes>
          <div>
            <input
              type="range"
              min="6"
              max="50"
              value={passwordLength}
              onChange={passwordLengthChange}
            />
          </div>
        </GeneratorSecionContainer>
      </GeneratorInsideModal>
    </GeneratorModal>
  ) : null;
};
