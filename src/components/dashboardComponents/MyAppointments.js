import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import baseURL from "../../contexts/serverURL";
import { v4 as uuidv4} from "uuid";

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


    return(
        <>
            <button onClick={() => console.log(appointments)}>log appointments</button>
            {
                appointments.map((item, index) => (
                    <div key={uuidv4()}>
                        <span>{item.reservation.sessionTypeName}</span><span>{item.period.start}:{item.period.end}</span>
                    </div>
                ))
            }
        </>
    )
}