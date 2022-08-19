import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";

export const LogOut = () => {

    const {user, setUser} = useContext(UserContext)

    const purgeUserData = () => {
        setUser(null)
        localStorage.clear()
    }

    return(
        <>
            <button onClick={() => purgeUserData()}>log out</button>
        </>
    )
}