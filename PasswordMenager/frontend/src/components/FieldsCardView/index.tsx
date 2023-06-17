import { PasswordEntries } from "../../hooks/password-entries.hook";
import { DownIcon } from "../icons/DownIcon";
import {
  Card,
  CardContent,
  CardIcons,
  Cards,
  CardsContainer,
} from "./component.styled";

type FieldsCardViewProps = {
  selectedgroup: string;
  refreshall: boolean;
};

const FieldsCardView = ({
  selectedgroup,
  refreshall,
}: FieldsCardViewProps): JSX.Element => {
  const entries = PasswordEntries(selectedgroup, refreshall);
  return (
    <CardsContainer>
      <Cards>
        {entries.map((entry) => (
          <Card>
            <CardContent>{entry.username}</CardContent>
            <CardIcons>
              <DownIcon />
            </CardIcons>
          </Card>
        ))}
      </Cards>
    </CardsContainer>
  );
};

export default FieldsCardView;
