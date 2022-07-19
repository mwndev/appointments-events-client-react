import React, { useState, useEffect, useContext, createContext } from 'react'
import check from '../svgs/calendarcheck.svg'
import warning from '../svgs/calendarwarning.svg'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'
import Calendar from '../components/Calendar'
import Weekdays from '../components/Weekdays'
import SingleDate from '../components/SingleDate'
import Period from '../components/Period'


const StyledFlexContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 90%;
    flex-shrink: 0;
    flex-wrap: wrap;
`
const weekDayFlexContainer = styled.div`
    height: 4cm;
    width: 1.5cm;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
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
const time = Temporal.PlainTime.from({
    hour: 18,
    minute: 0,
})

console.log(time.with({hour: 20}).toString())


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
    const [appointmentsFromServer, setAppointmentsFromServer] = useState([])
    const [appointmentIDsToDelete, setAppointmentsToDelete] = useState([])
    const [period, setPeriod] = useState({start: time, end: time.with({hour: 20})})
    const [startPeriod, setStartPeriodRaw] = useState(time)
    const [endPeriod, setEndPeriodRaw] = useState(time.add({hours: 2}))
    const [sortedAppointments, setSortedAppointments] = useState([null, null, null, null, null, null, null, null])
    




   const setStartPeriod = (amount) => {
    const placeHolder = startPeriod.add(amount)
    if( (placeHolder.hour * 100) + placeHolder.minute < (endPeriod.hour*100) + endPeriod.minute){
        setStartPeriodRaw(prev => prev.add(amount))
    }
   }
   const setEndPeriod = (amount) => {
    const placeHolder = endPeriod.add(amount)
    if((startPeriod.hour * 100)+ startPeriod.minute < (placeHolder.hour * 100 + placeHolder.minute)){
        setEndPeriodRaw(prev => prev.add(amount))
    }
   }
  

   


    
   

    const serverDeleteAppointments = async() => {
        try {
            const bodyObj = {
                startDate: {
                    day: startingDate.day,
                    month: startingDate.month,
                    year: startingDate.year,
                    dayOfWeek: startingDate.dayOfWeek,
                    dateISOString: startingDate.toString(),
                    dateAsNum: startingDate.year * 10000 + startingDate.month * 100 + startingDate.day,
                },
                endDate: {
                    day: finishingDate.day,
                    month: finishingDate.month,
                    year: finishingDate.year,
                    dayOfWeek: finishingDate.dayOfWeek,
                    dateISOString: finishingDate.toString(),
                    dateAsNum: finishingDate.year * 10000 + finishingDate.month * 100 + finishingDate.day,
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
                    asNum: startingDate.year * 10000 + startingDate.month * 100 + startingDate.day,
                },
                endDate: {
                    day: finishingDate.day,
                    month: finishingDate.month,
                    year: finishingDate.year,
                    dayOfWeek: finishingDate.dayOfWeek,
                    dateISOString: finishingDate.toString(),
                    asNum: finishingDate.year * 10000 + finishingDate.month * 100 + finishingDate.day,
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

            //put state changes outside the async
            
            await setAppointmentsFromServer(arr)

            let sortedArr = [null, null, null, null, null, null, null, null]
            for(let l = 1 ; l <= 7 ; l += 1){
                sortedArr[l] = (arr.filter(e => e.appointment.date.dayOfWeek === l))
            }
            //this seems to work
            //console.log(sortedArr)
           await setSortedAppointments(sortedArr)

            
           
        }


        const onClickFunction = (identifier) => {
            if(appointmentIDsToDelete.includes(identifier)){
                setAppointmentsToDelete(prev => prev.filter(e => e != identifier))
            }else{
                setAppointmentsToDelete(prev => [...prev, identifier])
            }
        }
                
const deleteAppointmentsById = async (objectIDArray, object ) => {
        
        
        const bodyAsJSON = JSON.stringify({objectIDArray: objectIDArray})
        const res = await fetch('http://localhost:5040/appointment/admin/byid', {
            method: 'DELETE', 
            headers: {
                "Content-Type" : "application/json",
            },
            body: bodyAsJSON,
        })
        const data = await res.json()

        console.log(data)

        window.alert(`${data.mongoRes.deletedCount} appointments were deleted`)


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

    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return(
        <>


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

            <Period 
            period={period} setPeriod={setPeriod}
            startPeriod={startPeriod} setStartPeriod={setStartPeriod}
            endPeriod={endPeriod} setEndPeriod={setEndPeriod}
            />

           </StyledFlexContainer>

            <button onClick={() => serverPostAppointments()}>send to server</button>
            <button onClick={() => serverDeleteAppointments()} >delete from server</button>
            <button onClick={() => serverGetAppointments()} >get from server</button>
            <button onClick={() => deleteAppointmentsById(appointmentIDsToDelete)}>delete by id</button>
 
            <StyledFlexContainer>
            {appointmentsFromServer.map(obj => (
                <SingleDate  
                parentFunction={ onClickFunction}
                object={obj} 
                id={obj._id} 
                setAppointmentsToDeleteForParent={setAppointmentsToDelete} 
                appointmentIDsFromParent={appointmentIDsToDelete}
                key={obj._id}  

                />
            ))}

           
            </StyledFlexContainer>
            <button onClick={() => console.log(sortedAppointments)}>asdf</button>

        </>
        )
}

export default Admin



