import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import baseURL from "../../contexts/serverURL";
import { v4 as uuidv4} from "uuid";
import styled from "styled-components";
import { AppointmentContainer, SectionWrapper } from "../../styledComponents/styledComponents1";
import { MyIndividualAppointments } from "./MyIndividualAppointments";

const Appointment = styled.div`
    border: ${props => props.theme.bthk};
    display: inline-block;
    justify-content: center;
    align-items: center;
    height: 1.4cm;
    span{
        font-size: 1.3em;
        max-height: 1cm;
        margin: 0.2cm;
    }
`



export const MyAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [sTs, setSTs] = useState([])
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        const serverGetAppointments = async() => {
            const res = await fetch(`${baseURL}/appointment/user/${user.id}`)
            const data = await res.json()
    
            setAppointments(data)
        }
        serverGetAppointments()


        const serverGetSessionTypes = async () => {
            const res = await fetch(`${baseURL}/sessiontypes`)
            const data = await res.json()

            setSTs(data)
        }
        serverGetSessionTypes()
    } ,[])

    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return(
        <SectionWrapper>
            <h2>My Appointments</h2>
            <MyIndividualAppointments appointments={appointments}  />
        </SectionWrapper>
    )
}