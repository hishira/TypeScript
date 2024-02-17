import styled from 'styled-components';

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    & > button{
        width: 50%;
        padding: 1rem 1.2rem;
        border-radius: 0px !important;
        &:hover{
            z-index: 10000;
            border: none;
            outline: none;
            transform: scale(1.04);
        }
    }
`