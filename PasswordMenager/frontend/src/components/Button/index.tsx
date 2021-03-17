import  styled from 'styled-components';
type Props={
    color?:string,
}
const Button = styled.button<Props>`
    padding: 10px 15px;
    cursor: pointer;
    border: none;
    background-color: ${({color})=>color || "white"};
    border-radius: 5px;
    color: rgba(1,1,1,.8);
    font-size: .9rem;
    &:focus{
        outline: none;
    }
`

export default Button;