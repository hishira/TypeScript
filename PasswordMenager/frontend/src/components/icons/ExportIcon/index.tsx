import { SVGProps } from "react";
import { IconProps } from "../type";

export const ExportIcon = ({ click }: IconProps): JSX.Element => {
  const props: SVGProps<SVGSVGElement> = {};
  if (click) {
    props["onClick"] = click;
  }
  return (
    <svg
      {...props}
      data-name="Design Convert"
      id="Design_Convert"
      role="export"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      width='34px'
      height='34px'
    >
      <path d="M50,52H14a7,7,0,0,1-7-7V41a1,1,0,0,1,2,0v4a5,5,0,0,0,5,5H50a5,5,0,0,0,5-5V41a1,1,0,0,1,2,0v4A7,7,0,0,1,50,52Z" />
      <path d="M32,42a1,1,0,0,1-1-1V14a1,1,0,0,1,2,0V41A1,1,0,0,1,32,42Z" />
      <path d="M42,24a1,1,0,0,1-.71-.29L32,14.41l-9.29,9.3a1,1,0,0,1-1.42-1.42l10-10a1,1,0,0,1,1.42,0l10,10a1,1,0,0,1,0,1.42A1,1,0,0,1,42,24Z" />
    </svg>
  );
};
