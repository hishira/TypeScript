import { DOMAttributes } from "react";
import { branch } from "../../../utils/helpers.utils";
import { PasswordFieldsHelper } from "../../PasswordTable/PasswordField";
import { CardFieldValue, CardFieldValueURL } from "../component.styled";

type PasswordUrlField = "password" | "url" | "other";

const ComponentMapper: {
  [key in PasswordUrlField]: (props: object, value: unknown) => JSX.Element;
} = {
  password: (props, value) => (
    <CardFieldValue {...props}>
      <span>******</span>
    </CardFieldValue>
  ),
  url: (props, value) => (
    <CardFieldValueURL {...props}>{value}</CardFieldValueURL>
  ),
  other: (props, value) => <CardFieldValue {...props}>{value}</CardFieldValue>,
};

const urlOpenFunction = (value: unknown) =>
  value && typeof value === "string" && window.open(value, "_blank");
const preparePropsForValueField = ({
  isPassword,
  value,
  isUrl,
}: ValueFieldPropd): DOMAttributes<HTMLDivElement> => {
  return {
    ...(isPassword && {
      onClick: () => PasswordFieldsHelper.passwordClick(value),
    }),
    ...(isUrl && { onClick: () => urlOpenFunction(value) }),
  };
};
export const ValueField = ({ isPassword, value, isUrl }: ValueFieldPropd) => {
  const props: DOMAttributes<HTMLDivElement> = preparePropsForValueField({
    isPassword,
    value,
    isUrl,
  });
  const passowrUrl = branch(
    isPassword === true,
    "password",
    branch(
      isUrl === true,
      "url",
     'other'
    )
  );

  
  return ComponentMapper[passowrUrl](props, value);
};