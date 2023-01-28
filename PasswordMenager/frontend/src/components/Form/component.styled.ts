import styled, { keyframes } from "styled-components";

export const clippath = keyframes`
  0% { clip-path: circle(0%); }
  100% { clip-path: circle(100%); }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.05rem solid whitesmoke;
  width: 50%;
  padding: 10px;
  @media (max-width: 900px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 85%;
  }
  @media (max-width: 489px) {
    width: 100%;
  }
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 50px -5px;
  border-radius: 10px;
  animation: ${clippath} 0.9s linear forwards;
`;
export const FormTitle = styled.p`
  font-size: 1.2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;
export const Link = styled.span`
  color: blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
