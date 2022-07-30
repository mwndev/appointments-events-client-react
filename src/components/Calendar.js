import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'; 
import arrow from '../svgs/arrowup.svg'
import calendarCheck from '../svgs/calendarcheck.svg'
import {AppointmentContext} from '../contexts/AppointmentContext'
import { faRugbyBall } from '@fortawesome/pro-duotone-svg-icons';


//styles and at line 130

const StyledFlexContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 67%;
`

const StyledCalendarBox = styled.div`
    aspect-ratio: 10 / 10;
    height: ${props => props.theme.boxHeight};
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;

`
const StyledCalendarBoxHeader = styled.div`
    height: ${props => props.theme.boxHeaderHeight};
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    width: calc(100% + 1px);
    
`
const StyledMonthName = styled.div`
    font-size: 1.8rem;
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
        background-color: grey; 
    }
    .down{
        transform: rotate(180deg)
    }
`
const StyledDay = styled.div`
    width: 100%;
    aspect-ratio: 1 / 1 ;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    cursor: pointer;
    background-color: ${props => props.state === props.day ?  'rgba(0, 62, 201, 0.5)' : `rgba(160, 235, 199, ${Math.sqrt(props.appointmentsOnDate * 0.3)})`};

    &:hover{
        background-color: ${props => props.state === props.day ? 'rgba(0, 62, 201, 0.5)' : 'rgba(0, 62, 201, 0.3)'};
    }
    span{
        font-size: 1rem;
        margin: 0;
        font-weight: 500;
    }
`
const StyledDayName = styled.div`
    width: 100%;
    aspect-ratio: 1 / 1 ;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    cursor: pointer;
    border-bottom: 0.06cm solid ${props => props.theme.tc};
    span{
        font-size: 1.2em;
        font-weight: 500;
        margin: 0;
        color: darkgreen;
    }
`
const StyledBlankBox = styled.div`
    height: 100%;
    width: 100%;

`
const StyledCalendarBoxBody = styled.div`
    height: ${p => p.theme.boxBodyHeight};
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-auto-rows: 1fr;
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

const Calendar = ({ parentISODate, setDateForParent, appointments}) => {
    const now = Temporal.Now.plainDateISO()

    const [selectedDate, setSelectedDate] = useState(parentISODate)
    const [daysArray, setDaysArray] = useState([])
    const [blankBoxes, setBlankBoxes] = useState([])

    useEffect(() => {
        let arr = []
        for(let i = 1 ; i <= selectedDate.daysInMonth ; i +=1 ){
            arr.push(selectedDate.with({day: i}))
        }
        setDaysArray(arr)

    }, [selectedDate.month])
    useEffect(() => {
        setDateForParent(prev => selectedDate)
    }, [selectedDate])

    const decrementMonth = () => {
        if(now.month < selectedDate.month || now.year < selectedDate.year){setSelectedDate(prev => prev.subtract({months: 1}))} 
    }
    const incrementMonth = () => {
        
        if(now.month != selectedDate.month ||  now.year === selectedDate.year){setSelectedDate(prev=> prev.add({months : 1}))}
    }
    
    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    console.log(daysArray)
    return(
        <>
        <StyledCalendarBox>
        <StyledCalendarBoxHeader>
            <StyledMonthName>{monthNames[parentISODate.month]} {parentISODate.year}</StyledMonthName>
            <StyledArrowWrapper>
            <img className='down' src={arrow} alt='down' onClick={decrementMonth} />
            <img src={arrow} alt='up' onClick={incrementMonth} />
            </StyledArrowWrapper>
        </StyledCalendarBoxHeader>
        <StyledCalendarBoxBody>
        {
            dayNames.filter(e => e !== null).map(
                dayName => (
                    <StyledDayName 
                    key={dayName}>
                        <span>
                            {dayName.substring(0, 3)}
                        </span>
                    </StyledDayName>
                )
            )
        }
        {daysArray.map(calendarDay => 
            (<StyledDay 
                appointmentsOnDate={appointments.filter(e => e.appointment.date.dateAsString === calendarDay.toString()).length} 
                state={parentISODate} 
                day={calendarDay}  
                key={calendarDay.day} 
                onClick={() => setSelectedDate(calendarDay)} >
                <span>{calendarDay.day}</span>
            </StyledDay>))
        }
             
        </StyledCalendarBoxBody>
        </StyledCalendarBox>

        </>
    )
}
export default Calendar
