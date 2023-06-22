import { SVGProps } from "react";
import { IconProps } from "../type";
export const UpIcon = ({ click }: IconProps) => {
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
      viewBox="0 0 512 512"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="396.6,352 416,331.3 256,160 96,331.3 115.3,352 256,201.5 " />
    </svg>
  );
};
