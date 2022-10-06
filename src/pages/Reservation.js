import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export const Reservation = () => {

    const [content, setContent] = useState(<Waiting />)

    const {tokenid} = useParams()
    console.log(tokenid)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:5040/reserve/${tokenid}`)

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
        <div>Reserving your Appointment ...</div>
    )
}
const Success = () => {
    return(
        <div>Successfully booked.</div>
    )
}
const Failure = () => {
    return(
        <div>Failed to book.</div>
    )
}