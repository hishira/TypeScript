import styled from "styled-components";

export const ValidatorElement = styled.div`
    display: inline-block;
    width: 100%;   
`

export const ValidatorSpanElement = styled.span`
    display: contents;
    position: relative;
    & > span {
        position: absolute;
        right: 0;
    }
`