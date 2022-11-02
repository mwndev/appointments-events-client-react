import { Temporal } from '@js-temporal/polyfill';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { backendURL } from '../../App';
import { UserContext } from '../../contexts/UserContext';
import { WindowAlertContext } from '../../contexts/WindowAlertContext';
import { dateSplice } from '../../general/functions';
import Calendar from '../../general_components/Calendar';
import { PageWrapper } from '../../general_components/styledComponents1';
import TextareaBox from '../../general_components/TextareaBox';
import { ViewExistingSessionTypes } from '../../general_components/ViewExistingSessionTypes';
import calendarCheck from '../../svgs/calendarcheck.svg';


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
        font-weight: 400;
        span{
            background-color: ${props => props.theme.ic4};
        }
    }
`

const SmallBox = styled.div`
    aspect-ratio: 5 / 8;
    height: ${props => props.theme.boxHeight};
    border: ${props => props.theme.bgrid};
    margin: 1cm;
    display: grid;
    grid-template-rows: 1fr 7fr;
`
const SmallBoxHeader = styled.div`
    border-bottom: ${props => props.theme.bgrid};
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

const Main = styled.div`
    grid-row: 2 / 3;
    //scrollbar is 0.5vw
    padding: 0.5cm ${navigator.userAgent.match(/firefox|fxios/i) ? '0.3cm 0.3cm' : '0.1cm 0'} calc(0.1cm + 0.5vw);
    gap: 0.3cm;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    overflow: scroll;
`


const StyledAppointment = styled.div`
    flex-shrink: 0;
    min-height: 0;
    height: 12%;
    flex-grow: 0;
    width: 100%;
    border: ${props => props.theme.bgrid};
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: right;
    cursor: pointer;
    background-color: ${props => props.selectedAppointment === props.appointment ? props.theme.hc1 : 'inherit'};
    span{
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1.3rem;
        padding-left: 0.13cm;
    }
    div{
        height: 100%;
        aspect-ratio: 1 / 1;
        border-left: ${props => props.theme.bgrid};
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img{
        height: 60%;
        aspect-ratio: 1 / 1;
    }
`
const ConfirmationDetail = styled.div`
    width: 100%;
    border-bottom: ${props => props.theme.bgrid};
    padding-bottom: 0.12cm;
    display: flex;
    align-items: center;
    margin: 4.4% 0;
    span{
        height: 100%;
        padding: 0 0.5vw;
        color: ${props => props.theme.ic9};
        font-size: 1.3em;

    }
    div{
        flex-grow: 1;
        height: 100%;
        font-size: 1.3em;
        text-align: right;
    }

`




const SingleAppointmentBox = ({ end, start, index, appointment, selectedAppointment, setSelectedAppointment}) => {

    
    
        return(
  
            <StyledAppointment 
            selectedAppointment={ selectedAppointment } 
            appointment={appointment} 
            onClick={() => setSelectedAppointment(appointment)}>
            <span>
                {dateSplice(String(start))} - {dateSplice(String(end))}
            </span>
            <div>
            <img src={calendarCheck} alt=''/>
            </div>
            </StyledAppointment>
        )
    
}

const AppointmentsBox = ({dateISO, appointments, selectedAppointment, setSelectedAppointment}) => {
    
    appointments.sort((a, b) => {
        return a.period.start - b.period.start
    })
    

    return(
        <>
            <SmallBox>
                <SmallBoxHeader>
                <span>
                    Avaliable Appointments
                </span>
                </SmallBoxHeader>
                <Main>

                {appointments.map((item, index) => (
                    <SingleAppointmentBox 
                    key={uuidv4()}
                    selectedAppointment={selectedAppointment}
                    setSelectedAppointment={setSelectedAppointment}
                    index={index}
                    end={item.period.end} 
                    start={item.period.start} 
                    appointment={item}
                    dateISO={dateISO} 
                    
                    />))}
                </Main>
            </SmallBox>
        </>
    )
}


const StyledConfirmButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    grid-row: -2 / -1;
    cursor: pointer;
    border-top:  ${props => props.theme.bgrid};
    &:hover{
        background-color: ${props => props.theme.hc2};
        border:  ${props => props.theme.bgrid};
    }
    span{
        font-weight: 400;
        font-size: 1.4rem;
    }
`


const GridBox = styled.div`
    aspect-ratio: 5 / 8;
    height: ${props => props.theme.boxHeight};
    border: ${props => props.theme.bgrid};
    margin: 1cm;
    display: grid;
    grid-template-rows: 1fr 6fr 1fr;
`

const SendBookingBox = ({ selectedAppointment, data, serverConfirmReservation }) => {



    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [info, setInfo] = useState([])

    useEffect(() => {
        try {
            if(selectedAppointment !== []){
                const relevantInfo = [
                    ['Type: ', `${data.sessionType.name}`],
                    ['Date: ', `${selectedAppointment.date.day}. ${monthNames[selectedAppointment.date.month]} ${selectedAppointment.date.year}`],
                    ['Weekday: ', `${dayNames[selectedAppointment.date.dayOfWeek]}`],
                    ['Time: ', `${dateSplice(selectedAppointment.period.start)} - ${dateSplice(selectedAppointment.period.end)}`],
                    ['Price: ', `${data.sessionType.price}$`],
                ]
                setInfo(relevantInfo)
            }

        } catch (error) {
        }


    }
        
        , [selectedAppointment, data])


    return(
        <>
            <GridBox>
                <SmallBoxHeader>
                    <span>
                        Confirm Appointment
                    </span>
                </SmallBoxHeader>
                <Main>
                    {
                        //descr: flexgrowbox
                        info.map((item, index) => (
                            <ConfirmationDetail>
                                <span>{item[0]}</span>
                                <div>{item[1]}</div>
                            </ConfirmationDetail>
                        ))
                    }
                </Main>
                
                <StyledConfirmButton onClick={() => serverConfirmReservation()}>
                    <span>
                        Send Booking
                    </span>
                </StyledConfirmButton>
                
                
            </GridBox>
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

    const {user, } = useContext(UserContext)
    const { windowAlert } = useContext(WindowAlertContext)

    
    useEffect(() => {
        const serverGetAppointments = async() => {
            const res = await fetch(`${backendURL}/appointment/available`)
            const data = await res.json()
    
            setAppointments(data)
        }
        serverGetAppointments()


        const serverGetSessionTypes = async () => {
            const res = await fetch(`${backendURL}/sessiontypes`)
            const data = await res.json()

            setSTs(data)
        }
        serverGetSessionTypes()
    } ,[])

    const serverConfirmReservation = async () => {
        try {
            if(user.id === null)return windowAlert('You need to log in before booking anything.')
            const bodyOBJ = {
                appointment: selectedAppointment,
                sessionType: selectedST,
                user: user,
                notes: notes,
            }

            const res = await fetch(`${backendURL}/appointment/user`, {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(bodyOBJ)
            })

            const jres = await res.json()

            if( typeof jres.msg === String ) return windowAlert(jres.msg)

            windowAlert('please check your email to confirm the booking')
 

        } catch (error) {
            
        }
    }
    return(
        <PageWrapper>
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
            appointments={appointments.filter(e => e.date.dateAsString === date.toString())}
        />

        </StyledSectionWrapper>
        
        <StyledSectionWrapper>
            <h2><span>Write</span> notes &#40;optional&#41;</h2>
            <TextareaBox height={'default'} parentSetState={setNotes} title={'Notes'} />
        </StyledSectionWrapper>

        <StyledSectionWrapper>
            
        <h2><span>Confirm</span> your appointment!</h2>
        
        <SendBookingBox selectedAppointment={selectedAppointment} data={{ notes: notes, sessionType: selectedST }} serverConfirmReservation={serverConfirmReservation}/>

        </StyledSectionWrapper>
        

        </StyledFlexContainer>
        </PageWrapper>
    )
}
