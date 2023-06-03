import Button from "../../Button";
import FormElement from "../../FormElement";
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
      <FormElement
        label="Group name"
        inputtype="text"
        inputplaceholder="name"
        inputChange={func}
      />
      <Button
        disabled={isButtonDisabled}
        onClick={buttonhandle}
        color="lightblue"
      >
        Add group
      </Button>
    </NewGroup>
  );
};

export default NewGroupComponent;
