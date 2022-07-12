import React, { useState, useEffect, useContext, createContext } from 'react'
import check from '../svgs/calendarcheck.svg'
import warning from '../svgs/calendarwarning.svg'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'
import Calendar from '../components/Calendar'
import Weekdays from '../components/Weekdays'

const StyledFlexContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 90%;
    flex-shrink: 0;
    flex-wrap: wrap;

`
const StyledDateContainer = styled.div`
    width: 10cm;
    height: 2.5cm;
    border: 0.02cm black;
    display: flex;
    align-items: center;
`
const StyledBoxItem = styled.div`
    margin: 0.1cm 0.2cm;
    flex-shrink: 0;
    flex-grow: 0;
    width: 6cm;
    height: 1.3cm;
    display: flex;
    align-items: center;
    justify-content: right;
    border: 0.07cm solid ${props => props.isActive ? '#fbf' : '#000'};
    cursor: pointer;
    div{
        height: 100%;
        aspect-ratio: 1 / 1;
        border-left: 0.07cm solid ${props => props.theme.tc};
        display: flex;
        align-items: center;
        justify-content: center;
        
    }
    div > img{
        height: 60%;
        aspect-ratio: 1 / 1;
    }
    span{
        width: 70%;
        height: 70%;

    }
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
    const [appointmentIDsToDelete, setAppointmentsToDelete] = useState([])


    
   

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
            const arr = await res.json()
            setAppointmentsFromServer(prev => arr)

            const datesOnClickFunction = (i) => {
                console.log(i)
                if(i in appointmentIDsToDelete){
                    console.log('i in appointmentidstodelete is true')
                    setAppointmentsToDelete(prev => prev.filter(e => e !== i))
                }else{
                    console.log('i in appointmentidstodelete is false')
                    setAppointmentsToDelete(prev => [...prev, i])
                }

            }

            setAppointmentsFromServer(prev => prev.map(obj => (
                <StyledBoxItem onClick={() => datesOnClickFunction(obj.appointment._id)} key={obj.appointment._id} objID={obj.appointment._id}>
                    <span>
                        {obj.appointment.date.dateAsString}
                    </span>
                    <div>
                        <img src={appointmentIDsToDelete.includes(obj.appointment._id) ? warning : check} />
                    </div>
                </StyledBoxItem> 
            )))
        }


    const deleteAppointmentsById = async (objectID, object ) => {
        
        console.log(objectID)
        const bodyAsJSON = JSON.stringify(object)
        const res = await fetch('http://localhost:5040/appointment/admin/byid', {
            method: 'DELETE', 
            headers: {
                "Content-Type" : "application/json",
            },
            body: bodyAsJSON,
        })
        const js = await res.json()


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


    const c = createContext()
    


            
            


    return(
        <>
            <c.Provider value={[]}>


            <div>

            <input type="radio" value="GET" name="gender"/> get<br></br>
            <input type="radio" value="SET" name="gender" />default set
            <input type="radio" value="DELETE" name="gender" /> delete

            </div>
            <h1 onClick={() => console.log(appointmentIDsToDelete)}>ViewAsTimeframe</h1>
            <StyledFlexContainer>
            <Calendar parentISODate={startingDate} setDateForParent={setStartingDate}  />
            
            <Calendar parentISODate={finishingDate} setDateForParent={setFinishingDate}  />
            <Weekdays parentWeekdays={daysOfWeek} setParentWeekdays={setDaysOfWeek} />

            <button onClick={() => serverPostAppointments()}>send to server</button>
            <button onClick={() => serverDeleteAppointments()} >delete from server</button>
            <button onClick={() => serverGetAppointments()} >get from server</button>
            </StyledFlexContainer>
            {appointmentIDsToDelete}
            <StyledFlexContainer>
            {appointmentsFromServer}
            </StyledFlexContainer>
            </c.Provider>


        </>
        )
}


export default Admin



