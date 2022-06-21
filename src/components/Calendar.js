import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'; 
import arrow from '../svgs/arrowup.svg'
import calendarCheck from '../svgs/calendarcheck.svg'
import {AppointmentContext} from '../contexts/AppointmentContext'


//styles and at line 130

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
        background-color: grey; 
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

const Calendar = ({ parentISODate, setDateForParent }) => {
    const now = Temporal.Now.plainDateISO()

    const [selectedDate, setSelectedDate] = useState(parentISODate)
    const [daysArray, setDaysArray] = useState([])

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
    


    return(
        <>
        <StyledCalendarBox>
        <StyledCalendarBoxHeader>
            <StyledMonthName>{parentISODate.toString()}</StyledMonthName>
            <StyledArrowWrapper>
            <img src={arrow} alt='up' onClick={incrementMonth} />
            <img className='down' src={arrow} alt='down' onClick={decrementMonth} />
            </StyledArrowWrapper>
        </StyledCalendarBoxHeader>
        <StyledCalendarBoxBody>
       
        {daysArray.map(calendarDay => <StyledDay  key={calendarDay.day} onClick={() => setSelectedDate(calendarDay)} ><span>{calendarDay.day.toString()}</span></StyledDay>)}
             
        </StyledCalendarBoxBody>
        </StyledCalendarBox>

        </>
    )
}
export default Calendar
