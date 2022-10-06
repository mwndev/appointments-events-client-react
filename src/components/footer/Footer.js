import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

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
    const {user} = useContext(UserContext)

    return(
        <OuterWrapper>
        <h2>I have no clue what to put here but the green color is nice :)</h2>

        </OuterWrapper>
    )
}