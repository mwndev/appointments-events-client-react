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
    aspect-ratio: 5 / 8;
    height: ${props => props.theme.boxHeight};
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(8, 1fr);
`
const StyledSmallBoxHeader = styled.div`
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    background-color: ${props => props.theme.ic4};
    span{
        font-weight: 500;
        font-size: 1.3em;
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
const StyledAppointmentContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 0.3cm 0.3cm 0 0.3cm;
    grid-column: 1 / -1;
    grid-row: ${props => props.index + 2} / ${props => props.index + 3};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.selectedAppointment === props.appointment ? 'rgba(0, 62, 201, 0.5)' : 'white'};
`

const StyledAppointment = styled.div`
    height: 100%;
    width: 100%;
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
        height: 1cm;
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




const SingleAppointmentBox = ({ end, start, index, appointment, selectedAppointment, setSelectedAppointment}) => {

    const numToTimeString = (fourDigitNumber) => {
        const s = fourDigitNumber.toString()
        let k = ''
        k = k.concat(s.slice(0, 2), ':', s.slice(2))
        return k
    }
    
        return(
  
            <StyledAppointmentContainer 
            selectedAppointment={ selectedAppointment } 
            appointment={appointment} 
            onClick={() => setSelectedAppointment(appointment)} 
            index={index}>

            <StyledAppointment>
            <span>
                {numToTimeString(start)} - {numToTimeString(end)}
            </span>
            <div>
            <img src={calendarCheck} alt=''/>
            </div>
            </StyledAppointment>
            </StyledAppointmentContainer>
        )
    
}

const AppointmentsBox = ({dateISO, appointments, selectedAppointment, setSelectedAppointment}) => {
    
    let filtered = appointments.sort((a, b) => {
        return a.appointment.period.start - b.appointment.period.start
    })
    

    return(
        <>
            <StyledBoxSmall>
                <StyledSmallBoxHeader>
                <span>
                    Avaliable Appointments
                </span>
                </StyledSmallBoxHeader>
                {appointments.map((item, index) => (
                    <SingleAppointmentBox 
                    selectedAppointment={selectedAppointment}
                    setSelectedAppointment={setSelectedAppointment}
                    index={index}
                    end={item.appointment.period.end} 
                    start={item.appointment.period.start} 
                    appointment={item}
                    dateISO={dateISO} 
                    
                    />))}
            </StyledBoxSmall>
        </>
    )
}

const StyledDescriptor= styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    grid-column: 1 / 3;
    grid-row: ${props => `${props.index + 2} / ${props.index + 3}`};
`
const StyledValue = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    grid-column: 3 / -1;
    grid-row: ${props => `${props.index + 2} / ${props.index + 3}`};
`

const SendBookingBox = ({ selectedAppointment }) => {

    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [info, setInfo] = useState([])

    useEffect(() => {
        try {
            console.log(selectedAppointment)
            if(selectedAppointment !== []){
                const relevantInfo = [
                    ['Weekday: ', `${dayNames[selectedAppointment.appointment.date.dayOfWeek]}`],
                    ['Date: ', `${selectedAppointment.appointment.date.day}. ${monthNames[selectedAppointment.appointment.date.month]} ${selectedAppointment.appointment.date.year}`],
                    ['Time: ', `${selectedAppointment.appointment.period.start} - ${selectedAppointment.appointment.period.end}`],
                    ['Duration: ', `2 hours`],
                    ['Type: ', `individual consultation`],
                    ['Price: ', '300PLN'],
                ]
                console.log('relevant info: ')
                console.log(relevantInfo)
                setInfo(relevantInfo)
                console.log('info: ')
                console.log(info)
            }

        } catch (error) {
            console.log(error)            
        }


    }
        
        , [selectedAppointment])


    return(
        <>
            <StyledBoxSmall>
                <StyledSmallBoxHeader>
                    <span>
                        Confirm Appointment
                    </span>
                </StyledSmallBoxHeader>
                {
                    info.map((item, index) => (
                        <>
                            <StyledDescriptor index={index}>
                                <span>
                                    {item[0]}
                                </span>
                            </StyledDescriptor>
                            <StyledValue index={index}>
                                <span>{item[1]}</span>
                            </StyledValue>
                        </>
                    ) )
                }
                
                
            </StyledBoxSmall>
        </>
    )
}
   

export const Book = () => {


    const now = Temporal.Now.plainDateISO()
    const [date, setDate] = useState(now)
    const [appointments, setAppointments] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState([])

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
