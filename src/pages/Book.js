import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'; 
import arrow from '../svgs/arrowup.svg'
import calendarCheck from '../svgs/calendarcheck.svg'
import {AppointmentContext} from '../contexts/AppointmentContext'
import Calendar from '../components/Calendar';




const monthNameEN = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
}

const StyledFlexContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 67%;
`

const StyledCalendarBox = styled.div`
    width: 8cm;
    height: 9cm;
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;

`
const StyledCalendarBoxHeader = styled.div`
    height: 1cm;
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`
const StyledMonthName = styled.div`
    font-size: 150%;
    font-weight: 500;
    justify-self: left;
    margin-left: 2rem;
`
const StyledArrowWrapper = styled.div`
    width: 3cm;
    height: 0.9cm;
    display: flex;
    justify-content: center;
    align-items: center;


    img{
        height: 80%;
        aspect-ratio: 1 / 1;
        cursor: pointer;
        border-radius: 50%;
        margin: 0.03cm;
        padding: 0.03cm;
    }
    img:hover{
        background-color: rgba(0, 0, 0, 0.3);
    }
    .down{
        transform: rotate(180deg)
    }
`
const StyledDay = styled.div`
    height: 14%;
    aspect-ratio: 1 / 1 ;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    border-radius: 50%;
    cursor: pointer;
    &:hover{
        background-color: ${props => props.activeColor};
    }
    span{
        font-size: 1rem;
        margin: 0;
    }
`
const StyledCalendarBoxBody = styled.div`
    width: 8cm;
    height: 8cm;
    display: flex;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
    padding: 0.2cm;
`


const StyledAppointment = styled.div`
    height: 1cm;
    width: 80%;
    border: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    align-items: center;
    justify-content: right;
    span{
        width: 5cm;
        height: 1cm;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
    }
    span > span{
        display: inline;
        font-size: 1.4rem;
    }
    div{
        width: 1cm;
        aspect-ratio: 1 / 1;
        border-left: 0.07cm solid ${props => props.theme.tc};
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img{
        height: 60%;
        aspect-ratio: 1 / 1;
    }
`




const SingleAppointmentBox = ({dateISO, end, start}) => {
    
        return(
  
            
            <StyledAppointment>
            <span>
                {start} - {end}
            </span>
            <div>
            <img src={calendarCheck} alt=''/>
            </div>
            </StyledAppointment>
        )
    
}

const AppointmentsBox = ({dateISO, appointments}) => {
    
    let filtered = appointments.sort((a, b) => {
        return a.appointment.period.start - b.appointment.period.start
    })

    return(
        <>
            <StyledCalendarBox>
                <StyledCalendarBoxHeader>
                    Available Appointments
                </StyledCalendarBoxHeader>
                <StyledCalendarBoxBody>
                {appointments.map(item => <SingleAppointmentBox end={item.appointment.period.end} start={item.appointment.period.start} dateISO={dateISO} />)}
                </StyledCalendarBoxBody>
            </StyledCalendarBox>
        </>
    )
}
   

export const Book = () => {


    const now = Temporal.Now.plainDateISO()
    const [date, setDate] = useState(now)
    const [appointments, setAppointments] = useState([])


    const serverGetAppointments = async() => {
        const res = await fetch('http://localhost:5040/appointment')
        const data = await res.json()

        setAppointments(data)
    }
    useEffect(() => {
        serverGetAppointments()
    } ,[])
       
    return(
        <>
        <StyledFlexContainer>

        <Calendar parentISODate={date} setDateForParent={setDate} appointments={appointments}/>
     
        <AppointmentsBox dateISO={date} appointments={appointments.filter(e => e.appointment.date.dateAsString === date.toString())}/>


        <StyledCalendarBox>
            <StyledCalendarBoxHeader>
                Book Appointment
            </StyledCalendarBoxHeader>
            <StyledCalendarBoxBody>
            
            </StyledCalendarBoxBody>
        </StyledCalendarBox>

        </StyledFlexContainer>
        </>
    )
}
