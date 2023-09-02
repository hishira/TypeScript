import { SVGProps } from "react";
import { IconProps } from "../type";

export const ImportIcon = ({ click }: IconProps): JSX.Element => {
  const props: SVGProps<SVGSVGElement> = {};
  if (click) {
    props["onClick"] = click;
  }
  return (
    <svg {...props} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect fill="none" height="256" width="256" />
      <polyline
        fill="none"
        points="86 68 128 128 170 68"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="8"
      />
      <line
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="8"
        x1="128"
        x2="128"
        y1="128"
        y2="16"
      />
      <path
        d="M176,96h24a8,8,0,0,1,8,8V208a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V104a8,8,0,0,1,8-8H80"
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="8"
      />
    </svg>
  );
};
