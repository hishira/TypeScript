import FormElement from "../../../../../FormElement";
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
      <FormElement
        label={"groups.groupsmodal.newgroupname"}
        inputplaceholder="groups.groupsmodal.newgroupname"
        inputChange={(e) => setNewName(e.target.value)}
        inputtype="txt"
        value={newName}
      />
    </AcceptModalContainer>
  );
};
