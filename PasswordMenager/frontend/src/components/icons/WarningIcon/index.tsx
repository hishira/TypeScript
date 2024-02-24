import { SVGProps } from "react";
import { IconProps } from "../type";

export const WarningIcon = ({ click }: IconProps) => {
  const props: SVGProps<SVGSVGElement> = {};
  if (click) {
    props["onClick"] = click;
  }
  return (
    <svg
      height="512px"
      viewBox="0 0 512 512"
      width="512x"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />
      <path
        d="M85.57,446.25H426.43a32,32,0,0,0,28.17-47.17L284.18,82.58c-12.09-22.44-44.27-22.44-56.36,0L57.4,399.08A32,32,0,0,0,85.57,446.25Z"
        stroke="#000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        //style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M250.26,195.39l5.74,122,5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,195.39Z"
        stroke="#000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        //style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path d="M256,397.25a20,20,0,1,1,20-20A20,20,0,0,1,256,397.25Z" />
    </svg>
  );
};
