import styled from 'styled-components';

export const AccountInfoContainer = styled.div`
    display: flex;
    background-color: whitesmoke;
    width: 50%;
    min-width: 50%;
    border-radius: 5px;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    top: 20%;
    left: 0;
    right: -0;
    height: 10rem;
    padding: 2rem;
`

export const AccountInfoHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 4rem;  
` 

export const HeaderButton = styled.div`
    cursor: pointer;
    box-sizing:border-box ;
    &:hover{
        text-shadow: 1px 0 0 #000;
    }
` 