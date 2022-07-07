import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'
import Calendar from '../components/Calendar'
import Weekdays from '../components/Weekdays'

const StyledFlexContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 90%;
`

const now = Temporal.Now.plainDateISO()


const Admin = () => {


    return(
        <>

        <h1>Admin</h1>
        <ViewAsTimeframe />
        </>
    )
}


//here starts the viewing appointmentes as timeframe component



const ViewAsTimeframe = () => {


    const [startingDate, setStartingDate] = useState(now)
    const [finishingDate, setFinishingDate] = useState(now.add({days: 7}))
    const [daysOfWeek, setDaysOfWeek] = useState([true, true, true, true, true, true, true])
    const [appointmentsFromServer, setAppointmentsFromServer] = useState()


    console.log(daysOfWeek)
    /*
    body would be structured as: 
    {
        startDate: {
            day: Number,
            month: Number, 
            year: Number,
        },
        endDate: {
            day: Number,
            month: Number, 
            year: Number,
        },
        period: {
            startTime: Number,
            endTime: Number,
        }
    } 
    */
   //returns [1, 3, 5]
   

    const serverDeleteAppointments = async() => {
        try {
            const bodyObj = {
                startDate: {
                    day: startingDate.day,
                    month: startingDate.month,
                    year: startingDate.year,
                    dayOfWeek: startingDate.dayOfWeek,
                    dateISOString: startingDate.toString(),
                },
                endDate: {
                    day: finishingDate.day,
                    month: finishingDate.month,
                    year: finishingDate.year,
                    dayOfWeek: finishingDate.dayOfWeek,
                    dateISOString: finishingDate.toString(),
                },
                period: {
                    startTime: 1800,
                    endTime: 2000,
                },
                onDaysOfWeek: daysOfWeek,
            }
        


            const bodyAsJSON = JSON.stringify(bodyObj)


            
            const res = await fetch('http://localhost:5040/appointment/admin', {
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: bodyAsJSON
            })
            const data = await res.json()


        } catch (error) {
            console.log(error)
            window.alert('appointments could not be set')
        }
    }


    const serverGetAppointments = async() => {
        try {
            const bodyObj = {
                startDate: {
                    day: startingDate.day,
                    month: startingDate.month,
                    year: startingDate.year,
                    dayOfWeek: startingDate.dayOfWeek,
                    dateISOString: startingDate.toString(),
                },
                endDate: {
                    day: finishingDate.day,
                    month: finishingDate.month,
                    year: finishingDate.year,
                    dayOfWeek: finishingDate.dayOfWeek,
                    dateISOString: finishingDate.toString(),
                },
                period: {
                    startTime: 1800,
                    endTime: 2000,
                },
                onDaysOfWeek: daysOfWeek,
            }
            
            const bodyAsJSON = JSON.stringify(bodyObj)

            const res = await fetch('http://localhost:5040/appointment/admin/get', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: bodyAsJSON
            })

            //const obj = JSON.stringify(res)
            const obj = await res.json()



            setAppointmentsFromServer(JSON.stringify(obj))

        } catch (error) {
            console.log(error)
        }
    }

    const serverPostAppointments = async() => {
        try {

            const bodyObj = {
                startDate: {
                    day: startingDate.day,
                    month: startingDate.month,
                    year: startingDate.year,
                    dayOfWeek: startingDate.dayOfWeek,
                    dateISOString: startingDate.toString(),
                },
                endDate: {
                    day: finishingDate.day,
                    month: finishingDate.month,
                    year: finishingDate.year,
                    dayOfWeek: finishingDate.dayOfWeek,
                    dateISOString: finishingDate.toString(),
                },
                period: {
                    startTime: 1800,
                    endTime: 2000,
                },
                onDaysOfWeek: daysOfWeek,
            }

            console.log(bodyObj)
            const bodyAsJSON = JSON.stringify(bodyObj)


            console.log(bodyAsJSON)
            
            const res = await fetch('http://localhost:5040/appointment/admin', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: bodyAsJSON
            })
            const data = await res.json()


        } catch (error) {
            console.log(error)
            window.alert('appointments could not be set')
        }
    }

    
    
    return(
        <>
            <div>

            <input type="radio" value="GET" name="gender"/> get<br></br>
            <input type="radio" value="SET" name="gender" />default set
            <input type="radio" value="DELETE" name="gender" /> delete

            </div>
            <h1>ViewAsTimeframe</h1>
            <StyledFlexContainer>
            <Calendar parentISODate={startingDate} setDateForParent={setStartingDate}  />
            
            <Calendar parentISODate={finishingDate} setDateForParent={setFinishingDate}  />
            <Weekdays parentWeekdays={daysOfWeek} setParentWeekdays={setDaysOfWeek} />

            <button onClick={() => serverPostAppointments()}>send to server</button>
            <button onClick={() => serverDeleteAppointments()} >delete from server</button>
            <button onClick={() => serverGetAppointments()} >get from server</button>
            </StyledFlexContainer>
            <div>
                {appointmentsFromServer}
            </div>
        </>
        )
}


export default Admin



