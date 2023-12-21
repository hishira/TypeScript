import Button from "../../Button";
import FormElement from "../../FormElement";
import { TitleContainer } from "../../NewEntryComponent/component.styled";
import { Translation, TranslationFunction } from "../../Translation";
import { NewGroup } from "./component.styled";

type ModalComponentProps = {
  func: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonhandle: () => void;
  isButtonDisabled: boolean;
};
const NewGroupComponent = ({
  func,
  buttonhandle,
  isButtonDisabled = false,
}: ModalComponentProps): JSX.Element => {
  return (
    <NewGroup>
      <TitleContainer>
        {TranslationFunction("group.newgroup.modal.title")}
      </TitleContainer>
      <FormElement
        label="groups.newgroup.groupname"
        inputtype="text"
        inputplaceholder="groups.newgroup.name"
        inputChange={func}
      />
      <Button
        disabled={isButtonDisabled}
        onClick={buttonhandle}
        color="lightblue"
      >
        {Translation("groups.newgroup.addgroup")}
      </Button>
    </NewGroup>
  );
};

export default NewGroupComponent;
