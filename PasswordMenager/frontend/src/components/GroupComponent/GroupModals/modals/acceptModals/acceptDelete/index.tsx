import { TranslationFunction } from "../../../../../Translation";
import { TitleContainer } from "../../../../../shared/styled-components";
import { AcceptModalContainer, ModalText } from "../../../component.styled";

export const AcceptDeleteModal = () => (
  <AcceptModalContainer>
    <TitleContainer>
      {TranslationFunction("group.deletegroup.modal.title")}
    </TitleContainer>
    <ModalText>{TranslationFunction("group.action.delete")}</ModalText>
  </AcceptModalContainer>
);
