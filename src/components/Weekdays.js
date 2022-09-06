import React, { useState } from "react";
import styled from 'styled-components'
import plus from '../svgs/calendarplus.svg'
import minus from '../svgs/calendarminus.svg'
import check from '../svgs/calendarcheck.svg'
import { v4 as uuidv4 } from 'uuid';
//import { StyledBoxSmall, StyledSmallBoxHeader, StyledAppointment, StyledAppointmentContainer } from "../styledComponents/styledComponents1";




const StyledItem = styled.div`
    height: 100%;
    width: 100%;
    border: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    align-items: center;
    justify-content: right;
    cursor: pointer;
    background-color: ${props => props.isActive  ? props.theme.hc1 : 'inherit'};

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


const Box = styled.div`
    aspect-ratio: 5 / 8;
    height: ${props => props.theme.boxHeight};
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;
    display: grid;
    grid-template-rows: 1fr 7fr;
`
const Header = styled.div`
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    background-color: ${props => props.theme.ic4};
    span{
        font-weight: 500;
        font-size: 1.4em;
    }
`
const Main = styled.div`
    grid-row: 2 / 3;
    padding: 0.3cm 0.3cm;
    gap: 0.3cm;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Weekdays = ({parentWeekdays, setParentWeekdays}) => {
    //parentWeekDays === [Boolean 7 times]
    const englishDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']    


    return(
        <Box key={uuidv4()}>
            <Header>
            <span>
                Weekdays
            </span>
            </Header>
            <Main>
            {
                englishDays.map((day, index, arr)=> (<SingleWeekday arrLength={arr.length} key={uuidv4()} index={index} parentWeekdays={parentWeekdays} setParentWeekdays={setParentWeekdays} day={day} />))
            }
            </Main>
        </Box>

    )
}
//<SingleWeekday parentWeekDay={parentWeekDays[index]} setParentWeekdays={setParentWeekdays} key={day.toString()} weekday={day}></SingleWeekday>)
export default Weekdays

const SingleWeekday = ({parentWeekdays, setParentWeekdays, index, day, arrLength}) => {

    
    const updateParentWeekdays = (a, i) => {
        let newArr = a
        newArr.splice(i, 1, !a[i])
        setParentWeekdays( newArr)
        
    }
    const [isActive, setActive] = useState(parentWeekdays[index])

    const theOnclick = () => {
            updateParentWeekdays(parentWeekdays, index) 
            setActive(prev => !prev)
    }
    return(
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
    )

}