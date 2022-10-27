import { Temporal } from '@js-temporal/polyfill';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import arrow from '../svgs/arrowup.svg';


//styles end at line 130

const StyledCalendarBox = styled.div`
    aspect-ratio: 10 / 10;
    height: ${props => props.theme.boxHeight};
    border:  ${props => props.theme.bgrid};
    margin: 1cm;

`
const StyledCalendarBoxHeader = styled.div`
    border-bottom: ${props => props.theme.bgrid};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    grid-column: 1 / -1;
    grid-row: 1 / 2;
`
const StyledMonthName = styled.div`
    font-size: 1.8rem;
    font-weight: 400;
    justify-self: left;
    margin-left: 2rem;
`
const StyledCalendarBoxBody = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(8, 1fr);
`

const StyledArrowsWrapper = styled.div`
    height: 50%;
    aspect-ratio: 5 / 2;
    margin: 0 1cm;
    display: flex;
    justify-content: space-evenly;
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
const StyledDayName = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    border-bottom: ${props => props.theme.bgrid};
    span{
        font-size: 1.2em;
        font-weight: 400;
        margin: 0;
        color: ${props => props.theme.tc2};
    }
`
const StyledDay = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    cursor: pointer;
    background-color: ${props => props.state  ?  props.theme.hc5 : `rgba(160, 235, 199, ${Math.sqrt(props.appointmentsOnDate * 0.3)})`};

    &:hover{
        background-color: ${props => props.state  ? props.theme.hc5 : props.theme.hc3};
    }
    span{
        font-size: 1.1rem;
        margin: 0;
        font-weight: 400;
    }
`
const StyledBlankBox = styled.div`
    height: 100%;
    width: 100%;

`


const Calendar = ({ parentISODate, setDateForParent, appointments}) => {
    const now = Temporal.Now.plainDateISO()

    const [daysArray, setDaysArray] = useState([])
    const [bufferCells, setBufferCells] = useState([])

    useEffect(() => {
        let arr = []
        for(let i = 1 ; i <= parentISODate.daysInMonth ; i +=1 ){
            arr.push(parentISODate.with({day: i}))
        }
        setDaysArray(arr)

    }, [parentISODate.month])
    useEffect(() => {
        setDateForParent(prev => parentISODate)
    }, [parentISODate])

    const decrementMonth = () => {
        if(now.month < parentISODate.month || now.year < parentISODate.year){setDateForParent(prev => prev.subtract({months: 1}))} 
    }
    const incrementMonth = () => {
        
        if(now.month !== parentISODate.month ||  now.year === parentISODate.year){setDateForParent(prev=> prev.add({months : 1}))}
    }
    
    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    
    useEffect(() => {
        if(daysArray.length !== 0){
        }
        try {
            setBufferCells([1, 2, 3, 4 ,5 ,6 ,7].slice(0, daysArray[0].dayOfWeek - 1))
        } catch (error) {
        }



    }, [parentISODate.month, daysArray])


    //TODO set up a calendar upper limit prop
    return(
        <>
        <StyledCalendarBox>
        
        <StyledCalendarBoxBody>
        <StyledCalendarBoxHeader>
            <StyledMonthName>{monthNames[parentISODate.month]} {parentISODate.year}</StyledMonthName>
            <StyledArrowsWrapper>
            <img className='down' src={arrow} alt='down' onClick={decrementMonth} />
            <img src={arrow} alt='up' onClick={incrementMonth} />
            </StyledArrowsWrapper>
        </StyledCalendarBoxHeader>
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
        {
            bufferCells.map(e=> (<StyledBlankBox key={uuidv4()}/>))
        }
        {daysArray.map(calendarDay => 
            
            (<StyledDay 
                appointmentsOnDate={appointments.filter(e => e.date.dateAsString === calendarDay.toString()).length} 
                state={parentISODate.equals(calendarDay)} 
                day={calendarDay}  
                key={calendarDay.day} 
                onClick={() => setDateForParent(calendarDay)} >
                <span>{calendarDay.day}</span>
            </StyledDay>))
        
        }
             
        </StyledCalendarBoxBody>
        </StyledCalendarBox>
        </>
    )
}
export default Calendar
