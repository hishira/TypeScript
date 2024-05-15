import FormElement from "../../../../../FormElement";
import { TranslationFunction } from "../../../../../Translation";
import { ValidatorForm } from "../../../../../ValidatorForm";
import { Validators } from "../../../../../ValidatorForm/validators";
import { TitleContainer } from "../../../../../shared/styled-components";
import { AcceptModalContainer } from "../../../component.styled";

type AceptEditModalProps = {
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
};
export const AcceptEditModal = ({
  newName,
  setNewName,
}: AceptEditModalProps) => {
  return (
    <AcceptModalContainer>
      <TitleContainer>
        {TranslationFunction("group.editgroup.modal.title")}
      </TitleContainer>
      <ValidatorForm
        validators={[Validators.Required]}
        label={"groups.groupsmodal.newgroupname"}
        inputplaceholder="groups.groupsmodal.newgroupname"
        inputChange={(e) => setNewName(e.target.value)}
        inputtype="txt"
        value={newName}
      />
    </AcceptModalContainer>
  );
};
