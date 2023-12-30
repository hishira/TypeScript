import { SVGProps } from "react";
import { IconProps } from "../type";

export const ImportIcon = ({ click }: IconProps): JSX.Element => {
  const props: SVGProps<SVGSVGElement> = {};
  if (click) {
    props["onClick"] = click;
  }
  return (
    <svg
      {...props}
      id="Design_Convert"
      viewBox="0 0 64 64"
      width='34px'
      height='34px'
    >
      <path d="M50,52H14a7,7,0,0,1-7-7V41a1,1,0,0,1,2,0v4a5,5,0,0,0,5,5H50a5,5,0,0,0,5-5V41a1,1,0,0,1,2,0v4A7,7,0,0,1,50,52Z" />
      <path d="M32,41a1,1,0,0,1-1-1V13a1,1,0,0,1,2,0V40A1,1,0,0,1,32,41Z" />
      <path d="M32,42a1,1,0,0,1-.71-.29l-10-10a1,1,0,0,1,1.42-1.42L32,39.59l9.29-9.3a1,1,0,0,1,1.42,1.42l-10,10A1,1,0,0,1,32,42Z" />
    </svg>
  );
};
