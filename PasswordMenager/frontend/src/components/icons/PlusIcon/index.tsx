import { SVGProps } from "react";
import { IconProps } from "../type";

export const PlusComponent = ({ click }: IconProps) => {
  const props: SVGProps<SVGSVGElement> = {};
  if (click) {
    props["onClick"] = click;
  }
  return (
    <svg
      {...props}
      height="24px"
      id="Layer_1"
      version="1.1"
      role='plus'
      viewBox="0 0 50 50"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="none" height="30" width="30" />
      <line
        fill="none"
        stroke="#3b3b3b"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="9"
        x2="41"
        y1="25"
        y2="25"
      />
      <line
        fill="none"
        stroke="#3b3b3b"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="25"
        x2="25"
        y1="9"
        y2="41"
      />
    </svg>
  );
};
