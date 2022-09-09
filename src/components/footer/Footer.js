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
        <button onClick={() => console.log(user)}>user</button>

        </OuterWrapper>
    )
}