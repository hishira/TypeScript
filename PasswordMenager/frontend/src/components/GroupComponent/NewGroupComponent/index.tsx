import Button from "../../Button";
import FormElement from "../../FormElement";
import { NewGroup } from "./component.styled";

type ModalComponentProps = {
    func: (e: React.ChangeEvent<HTMLInputElement>) => void;
    buttonhandle: () => void;
  };
const NewGroupComponent = ({
    func,
    buttonhandle,
  }: ModalComponentProps): JSX.Element => {
    return (
      <NewGroup>
        <FormElement
          label="Group name"
          inputtype="text"
          inputplaceholder="name"
          inputChange={func}
        />
        <Button onClick={buttonhandle} color="lightblue">
          Add group
        </Button>
      </NewGroup>
    );
  };

export default NewGroupComponent