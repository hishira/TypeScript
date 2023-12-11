import { TranslationFunction } from "../../../../../Translation";
import { AcceptModalContainer } from "../../../component.styled";

export const AcceptDeleteModal = () => (
    <AcceptModalContainer>
      {TranslationFunction("group.action.delete")}
    </AcceptModalContainer>
  );