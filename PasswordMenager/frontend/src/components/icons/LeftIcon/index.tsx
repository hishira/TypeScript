import { SVGProps } from "react";
import { IconProps } from "../type";

export const LeftIcon = ({ click }: IconProps) => {
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
      <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " />
    </svg>
  );
};
