import styled, { keyframes } from "styled-components";
type Props = {
  color?: string;
  fullwidth?: boolean;
  margintop?: number;
  size?: string;
  outline?: "with" | "without";
};
const flash = keyframes`
    from{
        transform: scale(1.0);
    }
    to{
        transform: scale(.85);
    }
`;
const Button = styled.button<Props>`
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  width: ${({ fullwidth }) => (fullwidth ? "100%" : "inherit")};
  background-color: ${({ color }) => color || "white"};
  border-radius: 5px;
  color: rgba(1, 1, 1, 0.8);
  font-size: ${({ size }) =>
    size === "large" ? "1.3rem" : size === "medium" ? "1.15rem" : ".9rem"};
  margin-top: ${({ margintop }) => `${margintop}px` || 0};
  clip-path: circle(75%);
  transition: transform 0.5s;
  letter-spacing: 0.275px;
  transition: text-shadow 0.3s;
  &:focus {
    outline: none;
  }
  &:active {
    animation: ${flash} 0.1s ease forwards;
  }
  &:hover {
    outline: ${({ outline }) =>
      outline && outline === "without" ? "none" : "0.5px solid lightslategray"};
    text-shadow: 0 0 0.65px #3a3636, 0 0 0.65px #3a3636;
    text-decoration: none;
    box-sizing: border-box;
  }
  &[disabled] {
    background-color: #ddd !important;
    box-sizing: border-box;
    animation: none;
    &:hover {
      text-shadow: none;
      outline: none;
    }
    cursor: inherit;
  }
`;

export default Button;
