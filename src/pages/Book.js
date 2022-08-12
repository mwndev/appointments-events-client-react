import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'; 
import arrow from '../svgs/arrowup.svg'
import calendarCheck from '../svgs/calendarcheck.svg'
import {AppointmentContext} from '../contexts/AppointmentContext'
import Calendar from '../components/Calendar';
import { ViewExistingSessionTypes } from '../components/ViewExistingSessionTypes';
import TextareaBox from '../components/TextareaBox';
import { UserContext } from '../contexts/UserContext'




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
    flex-wrap: wrap;
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
`

const StyledAppointment = styled.div`
    height: 100%;
    width: 100%;
    border: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    align-items: center;
    justify-content: right;
    cursor: pointer;
    background-color: ${props => props.selectedAppointment === props.appointment ? props.theme.hc1 : 'inherit'};

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
            key={index}
            index={index}>

            <StyledAppointment 
            selectedAppointment={ selectedAppointment } 
            appointment={appointment} 
            onClick={() => setSelectedAppointment(appointment)}>
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
    span{
        font-weight: 500;
        font-size: 1.2rem;
        color: ${props => props.theme.tc2};
        margin-left: 0.18cm;
    }

`
const StyledValue = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    grid-column: 3 / -1;
    grid-row: ${props => `${props.index + 2} / ${props.index + 3}`};
    span{
        font-weight: 400;
        font-size: 1.2rem;

    }
`
const StyledConfirmButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    grid-column: 1 / -1;
    grid-row: -2 / -1;
    cursor: pointer;
    border-top: 0.07cm solid ${props => props.theme.tc};
    &:hover{
        background-color: ${props => props.theme.hc2};
        border: 0.07cm solid ${props => props.theme.tc};
    }
    span{
        font-weight: 500;
        font-size: 1.3rem;
    }
`

const SendBookingBox = ({ selectedAppointment, data, serverConfirmReservation }) => {


    const {user, setUser} = useContext(UserContext)

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
                    ['Type: ', `${data.sessionType.name}`],
                    ['Price: ', `${data.sessionType.price}zl`],
                ]
                setInfo(relevantInfo)
            }

        } catch (error) {
            console.log(error)            
        }


    }
        
        , [selectedAppointment, data])


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
                <StyledConfirmButton onClick={() => serverConfirmReservation()}>
                    <span>
                        Send Booking
                    </span>
                </StyledConfirmButton>
                
                
            </StyledBoxSmall>
            <button onClick={() => console.log(user)}>log user</button>
        </>
    )
}


const Consultation = () => {


    return(
        <>
            
        </>
    )


}
   

export const Book = () => {

    const now = Temporal.Now.plainDateISO()
    const [date, setDate] = useState(now)
    const [appointments, setAppointments] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState([])

    const [sTs, setSTs] = useState([])
    const [selectedST, setSelectedST] = useState()
    const [activeST, setActiveST] = useState(null)
    const [notes, setNotes] = useState(null)

    const {user, setUser} = useContext(UserContext)

    
    useEffect(() => {
        const serverGetAppointments = async() => {

            const res = await fetch('http://localhost:5040/appointment')
            const data = await res.json()
    
            setAppointments(data)
        }
        serverGetAppointments()


        const serverGetSessionTypes = async () => {
            const res = await fetch(`http://localhost:5040/sessiontypes`)
            const data = await res.json()

            setSTs(data)
        }
        serverGetSessionTypes()
    } ,[])

    const serverConfirmReservation = async () => {
        console.log(user[0]._id)
        const bodyOBJ = {
            appointmentID: selectedAppointment._id,
            sessionTypeID: selectedST._id,
            userID: user[0]._id,
            userNotes: notes,
        }
        console.log(bodyOBJ)

        const res = await fetch('http://localhost:5040/appointment/user', {
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(bodyOBJ)
        })
    }
       
    return(
        <>
        <StyledFlexContainer>

        <StyledSectionWrapper>
            <h2>Select appointment <span>type</span>.</h2>
            <ViewExistingSessionTypes height="calc(200px + 30vh)" parentSTs={sTs}  selectedST={selectedST} setSelectedST={setSelectedST} activeST={activeST} setActiveST={setActiveST}/>
        </StyledSectionWrapper>

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
            <h2><span>Write</span> notes &#40;optional&#41;</h2>
            <TextareaBox parentSetState={setNotes} title={'Notes'} />
        </StyledSectionWrapper>

        <StyledSectionWrapper>
            
        <h2><span>Confirm</span> your appointment!</h2>
        
        <SendBookingBox selectedAppointment={selectedAppointment} data={{ notes: notes, sessionType: selectedST }} serverConfirmReservation={serverConfirmReservation}/>

        </StyledSectionWrapper>
        

        </StyledFlexContainer>
        </>
    )
}
