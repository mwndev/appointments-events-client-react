import React, { useState } from "react";
import styled from 'styled-components'
import plus from '../svgs/calendarplus.svg'
import minus from '../svgs/calendarminus.svg'
import check from '../svgs/calendarcheck.svg'
import { v4 as uuidv4 } from 'uuid';
//import { StyledBoxSmall, StyledSmallBoxHeader, StyledAppointment, StyledAppointmentContainer } from "../styledComponents/styledComponents1";
import { StyledItem } from "../styledComponents/styledComponents1";
import { useEffect } from "react";



const StyledBox = styled.div`
    width: 8cm;
    height: 9cm;
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;

`

const StyledBoxBody = styled.div`
    width: 8cm;
    height: 8cm;
    display: flex;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
    padding: 0.2cm;
`

const StyledBoxItem = styled.div`
    width: 80%;
    height: 12%;
    display: flex;
    align-items: center;
    justify-content: right;
    border: 0.07cm solid ${props => props.theme.tc};
    cursor: pointer;
    div{
        height: 100%;
        aspect-ratio: 1 / 1;
        border-left: 0.07cm solid ${props => props.theme.tc};
        display: flex;
        align-items: center;
        justify-content: center;
        
    }
    div > img{
        height: 60%;
        aspect-ratio: 1 / 1;
    }
    span{
        width: 70%;
        height: 70%;

    }
`
const StyledWeekdayContainer = styled.div`
    height: 100%;
    width: 100%;
    padding:  ${props => props.index === 0 ? '0.3cm' : '0.15cm'} 0.3cm ;
    grid-column: 1 / -1;
    grid-row: ${props => props.index + 2} / ${props => props.index + 3};
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledBoxSmall = styled.div`
    aspect-ratio: 5 / 8;
    height: ${props => props.theme.boxHeight};
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(7, 1fr);
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

const Weekdays = ({parentWeekdays, setParentWeekdays}) => {
    //parentWeekDays === [Boolean 7 times]
    const englishDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']    


    return(
        <StyledBoxSmall key={uuidv4()}>
            <StyledSmallBoxHeader>
            Weekdays
            </StyledSmallBoxHeader>
            {
                englishDays.map((day, index, arr)=> (<SingleWeekday arrLength={arr.length} key={uuidv4()} index={index} parentWeekdays={parentWeekdays} setParentWeekdays={setParentWeekdays} day={day} />))
            }
        </StyledBoxSmall>

    )
}
//<SingleWeekday parentWeekDay={parentWeekDays[index]} setParentWeekdays={setParentWeekdays} key={day.toString()} weekday={day}></SingleWeekday>)
export default Weekdays

const SingleWeekday = ({parentWeekdays, setParentWeekdays, index, day, arrLength}) => {

    useEffect(() => console.log(parentWeekdays))
    
    const updateParentWeekdays = (a, i) => {
        let newArr = a
        newArr.splice(i, 1, !a[i])
        setParentWeekdays(prev => newArr)
        
    }
    const [isActive, setActive] = useState(parentWeekdays[index])

    const theOnclick = () => {
            updateParentWeekdays(parentWeekdays, index) 
            setActive(prev => !prev)
    }
    return(
        <StyledWeekdayContainer length={arrLength} index={index} >

        <StyledItem 
        key={uuidv4()} 
        onClick={() => theOnclick()}
        isActive={isActive}
          >
                <span>{day}</span>
                <div>
                <img src={isActive ? check : plus}  alt='checked' />
                </div>
        </StyledItem>
        </StyledWeekdayContainer>
    )

}