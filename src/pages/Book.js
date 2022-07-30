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
    width: 90%;
`

const StyledSectionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    h2{
        font-family: inherit;

        span{
            background-color: ${props => props.theme.ic4};
        }
    }
`

const StyledBoxSmall = styled.div`
    aspect-ratio: 10 / 14;
    height: ${props => props.theme.boxHeight};
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;
`
const StyledBoxSmaller = styled.div`

`
const StyledBoxHeader = styled.div`
    height: 1cm;
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% + 2px);
    
`
const StyledCalendarBoxBody = styled.div`
    height: ${p => p.theme.boxBodyHeight};
    display: grid;
    grid-template-columns: repeat(1fr, 7);
    grid-template-rows: repeat(1fr, 6);
    grid-auto-rows: 1fr;
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
const StyledBoxBody= styled.div`
    width: calc(100% + 2px);
    height: 85%;
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
    cursor: pointer;
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

    const numToTimeString = (fourDigitNumber) => {
        const s = fourDigitNumber.toString()
        let k = ''
        k = k.concat(s.slice(0, 2), ':', s.slice(2))
        return k
    }
    
        return(
  
            
            <StyledAppointment>
            <span>
                {numToTimeString(start)} - {numToTimeString(end)}
            </span>
            <div>
            <img src={calendarCheck} alt=''/>
            </div>
            </StyledAppointment>
        )
    
}

const AppointmentsBox = ({dateISO, appointments, setSelectedAppointment}) => {
    
    let filtered = appointments.sort((a, b) => {
        return a.appointment.period.start - b.appointment.period.start
    })
    

    return(
        <>
            <StyledBoxSmall>
                <StyledBoxHeader>
                    Available Appointments
                </StyledBoxHeader>
                <StyledBoxBody>
                {appointments.map(item => (
                    <SingleAppointmentBox 
                    end={item.appointment.period.end} 
                    start={item.appointment.period.start} 
                    dateISO={dateISO} 
                    onClick={
                        () => console.log('hi')
                    }
                    />))}
                </StyledBoxBody>
            </StyledBoxSmall>
        </>
    )
}

const SendBookingBox = ({ selectedAppointment }) => {
    console.log(selectedAppointment)


    return(
        <>
            <StyledBoxSmall>
                <StyledBoxHeader>
                    Confirm Booking
                </StyledBoxHeader>
                <StyledBoxBody>
                    {selectedAppointment}
                </StyledBoxBody>
            </StyledBoxSmall>
        </>
    )
}
   

export const Book = () => {


    const now = Temporal.Now.plainDateISO()
    const [date, setDate] = useState(now)
    const [appointments, setAppointments] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState()


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
        <StyledSectionWrapper>


        <h2>Select a <span>date</span>.</h2>

        <Calendar parentISODate={date} setDateForParent={setDate} appointments={appointments}/>
        
        </StyledSectionWrapper>
        <StyledSectionWrapper>

        <h2>Select your <span>appointment</span>.</h2>

        <AppointmentsBox 
            selectedAppointment={selectedAppointment} 
            setSelectedAppointment={setSelectedAppointment} 
            dateISO={date} 
            appointments={appointments.filter(e => e.appointment.date.dateAsString === date.toString())}
        />

        </StyledSectionWrapper>
        <StyledSectionWrapper>
            
        <h2><span>Confirm</span> your appointment!</h2>
        
        <SendBookingBox selectedAppointment={selectedAppointment}/>

        </StyledSectionWrapper>

        </StyledFlexContainer>
        </>
    )
}
