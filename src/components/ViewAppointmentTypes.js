import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { StyledBoxBody, StyledBoxSmall } from "../styledComponents/styledComponents1";

export const ViewSessionTypes = () => {

    const [sessionTypesFromServer, setSessionTypesFromServer] = useState([])

    useEffect(async() => {
        try {
            const res = await fetch(`http://localhost:5040/sessiontypes`)
            const data = await res.json()

            setSessionTypesFromServer(data)
            
        } catch (error) {
            window.alert(error)    
        }
        
    }, [])

    return(
        <>
        
        </>
    )

}

