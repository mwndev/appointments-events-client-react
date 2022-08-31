import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

const Btn = styled.button`
    border: ${props => props.theme.b};
    background-color: ${props => props.severe ? props.theme.wc6 : 'white'};
    color: ${props => props.severe ? 'white' : props.theme.wc6};
    margin: 5%;
    height: 1.4cm;
    width: 3cm;
    font-weight: 500;
    font-size: 1.05em;
    cursor: pointer;
    &:hover{
        background-color: ${props => props.severe ? props.theme.wc7 : props.theme.c3};
    }
`
export const LogOut = () => {

    const {user, setUser} = useContext(UserContext)

    const clearLocalDataLogOut = () => {
        setUser({id: '', firstName: '', lastName: '', email: ''})
        localStorage.clear()
    }

    const deleteUser = async() => {
        
    }
    //maybe just remove the delete user button
    return(
        <>
            <Btn severe={false} onClick={() => clearLocalDataLogOut()}>log out</Btn>
            <Btn severe={true} onClick={() => deleteUser()}>delete account</Btn>
        </>
    )
}