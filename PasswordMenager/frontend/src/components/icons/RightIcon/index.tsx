import { SVGProps } from "react";
import { IconProps } from "../type";

export const RightIcon = ({ click }: IconProps) => {
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
      <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
    </svg>
  );
};