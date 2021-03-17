import  styled from 'styled-components';
type Props={
    color?: string,
    fullwidth?: boolean
    margintop?: number
    size?: string
}
const Button = styled.button<Props>`
    padding: 10px 15px;
    cursor: pointer;
    border: none;
    width:${({fullwidth})=> fullwidth? "100%" : "inherit"};
    background-color: ${({color})=>color || "white"};
    border-radius: 5px;
    color: rgba(1,1,1,.8);
    font-size: ${({size})=> size === "large"? "1.3rem" : size === "medium"? "1.15rem": ".9rem"};
    margin-top: ${({margintop})=> `${margintop}px` || 0};
    &:focus{
        outline: none;
    }
`

export default Button;