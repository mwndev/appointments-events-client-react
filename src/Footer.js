import React from "react";
import styled from "styled-components";

const OuterWrapper = styled.div`
    width: 100%;
    height: calc(4cm + 9vh);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: ${props => props.theme.ic2};
    border-top: ${props => props.theme.bthk};
`

export const Footer = () => {

    const eml = process.env.REACT_APP_BUGREPORT_EMAIL
    return(
        <OuterWrapper>
        <div>Please report any bugs to {eml}</div>

        </OuterWrapper>
    )
}