import React, { useState, useEffect, useContext } from 'react'
import check from '../svgs/calendarcheck.svg'
import warning from '../svgs/calendarwarning.svg'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'
import Calendar from './Calendar'
import Weekdays from './Weekdays'
import SingleDate from './SingleDate'
import Period from './Period'
import { SectionWrapper, ImportantButton, PageWrapper, ButtonWrapper, CommandsWrapper, FlexWrapper } from '../styledComponents/styledComponents1'
import { UserContext } from '../contexts/UserContext'
import { IndividualAppointments } from './adminComponents/IndividualAppointments'
import { timeAsNumber } from '../functions'


//!TODO daysofweek isn't working, make it simpler (without converting 5 times)

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
    const [appointmentIDsToDelete, selectAppointmentsRaw] = useState([])
    const [period, setPeriod] = useState({start: time, end: time.with({hour: 20})})
    const [startPeriod, setStartPeriodRaw] = useState(time)
    const [endPeriod, setEndPeriodRaw] = useState(time.add({hours: 2}))
    const [rawAppointments, setRawAppointments] = useState([])
    const [filters, setFilters] = useState()

    const {user, setUser} = useContext(UserContext)

    
    useEffect(() => {

        const adminGetAppointments = async() => {

            const res = await fetch(`http://localhost:5040/appointment/admin/${user.email}/${user.password}`)


            const { verified, appointments } = await res.json()

            if ( !verified ) return window.alert('admin verification failed')
            
            setAppointmentsFromServer(appointments)
        }
        adminGetAppointments()
    },[])

    const selectAppointments = (id) => {
        if( ! appointmentIDsToDelete.includes(id) ) return selectAppointmentsRaw(prev => [...prev, id])
        selectAppointmentsRaw(prev => prev.filter(i => i !== id))
    }

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
            if(!window.confirm('Are you sure you want to DELETE ALL appointments within the specified timeframe?')) return

            const bodyObj = {
                userData: user,
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




    const onClickFunction = (identifier) => {
        if(appointmentIDsToDelete.includes(identifier)){
            selectAppointmentsRaw(prev => prev.filter(e => e != identifier))
        }else{
            selectAppointmentsRaw(prev => [...prev, identifier])
        }
    }
                
    const deleteAppointmentsById = async (objectIDArray, object ) => {
        
        const bodyAsJSON = JSON.stringify({
            objectIDArray: objectIDArray, 
            userData: user
        })

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
                userData: user,
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
   

    

    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    //TODO add info button on single dates to show reservation details
    return(
        <PageWrapper>
            
            <FlexWrapper>

            <SectionWrapper>
            <h2><span>Beginning</span> of Timeframe</h2>
            <Calendar parentISODate={startingDate} setDateForParent={setStartingDate} appointments={appointmentsFromServer} />
            </SectionWrapper>
            <SectionWrapper>
            <h2><span>Ending</span> of Timeframe</h2>
            <Calendar parentISODate={finishingDate} setDateForParent={setFinishingDate} appointments={appointmentsFromServer} />
            </SectionWrapper>

            <SectionWrapper>
            <h2><span>Filter</span> by Weekdays</h2>

            <Weekdays parentWeekdays={daysOfWeek} setParentWeekdays={setDaysOfWeek} />

            </SectionWrapper>

            <SectionWrapper>
            <h2>Current <span>individual</span> appointments</h2>
            <IndividualAppointments 
            selectAppointments={selectAppointments} 
            appointments={appointmentsFromServer} 
            filters={{ 
                startDate: startingDate, 
                endDate : finishingDate, 
                startPeriod: startPeriod, 
                endPeriod: endPeriod, 
                daysOfWeek: daysOfWeek 
            }}
            selectedAppointments={appointmentIDsToDelete}
             />
            </SectionWrapper>


            <SectionWrapper>
                <h2><span>Set</span> time period</h2>
                <Period 
                period={period} setPeriod={setPeriod}
                startPeriod={startPeriod} setStartPeriod={setStartPeriod}
                endPeriod={endPeriod} setEndPeriod={setEndPeriod}
                />
            </SectionWrapper>

            <CommandsWrapper>
            <SectionWrapper>
            <h2><span>Server commands</span> </h2>
            <ButtonWrapper>

            <ImportantButton onClick={() => serverPostAppointments()}>
            <span>send to server</span>
            </ImportantButton>
            <ImportantButton onClick={() => serverDeleteAppointments()} >
            <span>delete from server</span>
            </ImportantButton>
            <ImportantButton onClick={() => deleteAppointmentsById(appointmentIDsToDelete)}>
            <span>delete selected</span>
            </ImportantButton>
            </ButtonWrapper>
            </SectionWrapper>

            </CommandsWrapper>
 
           </FlexWrapper>
            <FlexWrapper>
            

           
            </FlexWrapper>


            

        </PageWrapper>
        )
}

