import { SVGProps } from "react";
import { IconProps } from "../type";

export const HideIcon = ({ click }: IconProps) => {
  const props: SVGProps<SVGSVGElement> = {};
  if (click) {
    props["onClick"] = click;
  }

  return (
    <svg
      {...props}
      id="Editable-line"
      version="1.1"
      viewBox="0 0 32 32"
      width={32}
      height={32}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="  M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z"
        fill="none"
        id="XMLID_13_"
        stroke="#A8B3BD"
      />
      <circle
        cx="16"
        cy="16"
        fill="none"
        id="XMLID_14_"
        r="5"
        stroke="#A8B3BD"
      />
      <line
        fill="none"
        id="XMLID_15_"
        stroke="#A8B3BD"
        x1="3"
        x2="29"
        y1="3"
        y2="29"
      />
    </svg>
  );
};
