import { SVGProps } from "react";
import { IconProps } from "../type";

export const MoreOptionIcon = ({ click }: IconProps) => {
  const props: SVGProps<SVGSVGElement> = {};
  if (click) {
    props["onClick"] = click;
  }

  return (
    <svg
      {...props}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
    >
      <title />
      <g data-name="28-Option" id="_28-Option">
        <path d="M25,0H7A7,7,0,0,0,0,7V25a7,7,0,0,0,7,7H25a7,7,0,0,0,7-7V7A7,7,0,0,0,25,0Zm5,25a5,5,0,0,1-5,5H7a5,5,0,0,1-5-5V7A5,5,0,0,1,7,2H25a5,5,0,0,1,5,5Z" />
        <path d="M9,9.18V6H7V9.18a3,3,0,0,0,0,5.63V26H9V14.82A3,3,0,0,0,9,9.18Z" />
        <path d="M17,17.18V6H15V17.18a3,3,0,0,0,0,5.63V26h2V22.82a3,3,0,0,0,0-5.63Z" />
        <path d="M25,11.18V6H23v5.18a3,3,0,0,0,0,5.63V26h2V16.82a3,3,0,0,0,0-5.63Z" />
      </g>
    </svg>
  );
};
