import styled from "styled-components";

const SizeChecker = ( size?: "small" | "medium" | "large"): string => {
    if(size === null || size === undefined) return '64px';
    if(size === 'small') return '24px';
    if(size === 'medium') return '32px'
    if(size === 'large') return '48px';
    return '64px';
}
export const Loader = styled.div<{
  size?: "small" | "medium" | "large";
}>`
  /*position: fixed;
  left: 50%;
  top: 50%;*/
  width: ${({size})=> SizeChecker(size)};
  height: ${({size})=> SizeChecker(size)};
  border: 5px solid #fff;
  border-bottom-color: slategray;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
