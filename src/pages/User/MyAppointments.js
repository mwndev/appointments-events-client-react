import React, { useContext, useEffect, useState } from "react";
import { backendURL } from "../../App";
import { UserContext } from "../../contexts/UserContext";
import { SectionWrapper } from "../../general_components/styledComponents1";
import { MyIndividualAppointments } from "./MyIndividualAppointments";



export const MyAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [setSTs] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        const serverGetAppointments = async() => {
            const res = await fetch(`${backendURL}/appointment/user/${user.id}`)
            const data = await res.json()
    
            setAppointments(data)
        }
        serverGetAppointments()


        const serverGetSessionTypes = async () => {
            const res = await fetch(`${backendURL}/sessiontypes`)
            const data = await res.json()

            setSTs(data)
        }
        serverGetSessionTypes()
    } ,[])


    return(
        <SectionWrapper>
            <MyIndividualAppointments appointments={appointments}  />
        </SectionWrapper>
    )
}