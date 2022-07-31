import React, { useState, useEffect, useContext, createContext } from 'react'
import check from '../svgs/calendarcheck.svg'
import warning from '../svgs/calendarwarning.svg'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'
import Calendar from './Calendar'
import Weekdays from './Weekdays'
import SingleDate from '../components/SingleDate'
import Period from '../components/Period'
import { StyledSectionWrapper } from '../styledComponents/styledComponents1'


const StyledFlexWrapper = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
flex-shrink: 0;
flex-wrap: wrap;
`
const now = Temporal.Now.plainDateISO()
const time = Temporal.PlainTime.from({
    hour: 18,
    minute: 0,
})


export const ViewAsTimeframe = () => {


    const [startingDate, setStartingDate] = useState(now)
    const [finishingDate, setFinishingDate] = useState(now.add({days: 7}))
    const [daysOfWeek, setDaysOfWeek] = useState([true, true, true, true, true, true, true])
    const [appointmentsFromServer, setAppointmentsFromServer] = useState([])
    const [appointmentsOnPage, setAppointmentsOnPage] = useState([])
    const [appointmentIDsToDelete, setAppointmentsToDelete] = useState([])
    const [period, setPeriod] = useState({start: time, end: time.with({hour: 20})})
    const [startPeriod, setStartPeriodRaw] = useState(time)
    const [endPeriod, setEndPeriodRaw] = useState(time.add({hours: 2}))
    const [rawAppointments, setRawAppointments] = useState([])
    const [sortedAppointments, setSortedAppointments] = useState([])



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
  
    const timeAsNumber = (plainTime) => {
        return plainTime.hour * 100 + plainTime.minute
    }
    const dateAsNumber = (plainDate) => {
        return (
            (plainDate.year * 10000) + (plainDate.month * 100) + plainDate.day
        )
    }


    
   

    const serverDeleteAppointments = async() => {
        try {
            if(!window.confirm('Are you sure you want to DELETE ALL appointments within the specified timeframe?')) return

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
                    startTime: timeAsNumber(startPeriod),
                    endTime: timeAsNumber(endPeriod),
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

            window.alert(`Number of appointments deleted: ${data.mongoRes.deletedCount}`)

        } catch (error) {
            console.log(error)
            window.alert('server error')
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
                    startTime: timeAsNumber(startPeriod),
                    endTime: timeAsNumber(endPeriod),
 
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
            
            setAppointmentsFromServer(arr)

            let sortedArr = [null, null, null, null, null, null, null, null]
            for(let l = 1 ; l <= 7 ; l += 1){
                sortedArr[l] = (arr.filter(e => e.appointment.date.dayOfWeek === l))
            }
            //this seems to work
            //console.log(sortedArr)
           setSortedAppointments(sortedArr)

            
           
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
                    startTime: timeAsNumber(startPeriod),
                    endTime: timeAsNumber(endPeriod),
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
    const serverGetAppointmentsRaw = async() => {
        const res = await fetch('http://localhost:5040/appointment')
        const data = await res.json()

        setRawAppointments(data)
    }
    useEffect(() => {
        serverGetAppointmentsRaw()
    } ,[])
    

    

    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return(
        <>
            
            <StyledFlexWrapper>

            <StyledSectionWrapper>
            <h2><span>Beginning</span> of Timeframe</h2>
            <Calendar parentISODate={startingDate} setDateForParent={setStartingDate} appointments={rawAppointments} />
            </StyledSectionWrapper>
            <StyledSectionWrapper>
            <h2><span>Ending</span> of Timeframe</h2>
            <Calendar parentISODate={finishingDate} setDateForParent={setFinishingDate} appointments={rawAppointments} />
            </StyledSectionWrapper>

            <StyledSectionWrapper>
            <h2><span>Filter</span> by Weekdays</h2>
            <Weekdays parentWeekdays={daysOfWeek} setParentWeekdays={setDaysOfWeek} />
            </StyledSectionWrapper>

            <Period 
            period={period} setPeriod={setPeriod}
            startPeriod={startPeriod} setStartPeriod={setStartPeriod}
            endPeriod={endPeriod} setEndPeriod={setEndPeriod}
            />

           </StyledFlexWrapper>

            <button onClick={() => serverPostAppointments()}>send to server</button>
            <button onClick={() => serverDeleteAppointments()} >delete from server</button>
            <button onClick={() => serverGetAppointments()} >get from server</button>
            <button onClick={() => deleteAppointmentsById(appointmentIDsToDelete)}>delete by id</button>
 
            <StyledFlexWrapper>
            {appointmentsFromServer.map(obj =>  (
                
                <SingleDate  
                parentFunction={ onClickFunction}
                object={obj} 
                id={obj._id} 
                setAppointmentsToDeleteForParent={setAppointmentsToDelete} 
                appointmentIDsFromParent={appointmentIDsToDelete}
                key={obj._id}  
                daysOfWeek={daysOfWeek}
                dayNameShort={dayNames[obj.appointment.date.dayOfWeek].substring(0, 3)}
                monthName={monthNames[obj.appointment.date.month]}
                
                />
            ))}

           
            </StyledFlexWrapper>


            

        </>
        )
}

