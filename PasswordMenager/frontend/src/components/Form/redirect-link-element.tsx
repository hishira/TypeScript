import { Translation } from "../Translation";
import { Link } from "./component.styled";

export const RedirectLinkElement = ({
  redirectFunction,
  redirectTranslation,
}: {
  redirectFunction: () => void;
  redirectTranslation: string;
}) => (
  <p>
    {Translation("page.login.or")}
    <Link onClick={() => redirectFunction()}>
      {Translation(redirectTranslation)}
    </Link>
  </p>
);
