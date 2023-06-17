import { SVGProps } from "react";
import { IconProps } from "../type";
export const DownIcon = ({ click }: IconProps) => {
  const props: SVGProps<SVGSVGElement> = {};
  if (click) {
    props["onClick"] = click;
  }
  return (
    <svg
      height="24px"
      {...props}
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 " />
    </svg>
  );
};
