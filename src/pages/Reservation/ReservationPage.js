import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { backendURL } from "../../App";

const Msg = styled.div`
    font-size: 1.7em;
    margin-top: 5cm;
    text-align: center;
`

export const Reservation = () => {

    const [content, setContent] = useState(<Waiting />)

    const {tokenid} = useParams()
    console.log(tokenid)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${backendURL}/reserve/${tokenid}`)

            const data = await res.json()

            data.reserved ? setContent(<Success />) : setContent(<Failure />)
            // data.reserved ? setTimeout(window.location.href('http://localhost:3000/user') ,1000)
        }
        fetchData()

    }, [])
    //maybe make the dots move?
    return(
        <>
        {content}
        </>
    )
}

const Waiting = () => {

    return(
        <Msg>Reserving your Appointment ...</Msg>
    )
}
const Success = () => {
    return(
        <Msg>Successfully booked.</Msg>
    )
}
const Failure = () => {
    return(
        <Msg>Failed to book. The reservation might have been taken by someone else.</Msg>
    )
}