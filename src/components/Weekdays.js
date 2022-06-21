import React, { useState } from "react";
import styled from 'styled-components'
import plus from '../svgs/calendarplus.svg'
import minus from '../svgs/calendarminus.svg'
import check from '../svgs/calendarcheck.svg'




const StyledBox = styled.div`
    width: 8cm;
    height: 9cm;
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;

`
const StyledBoxHeader = styled.div`
    text-align: center;
    height: 1cm;
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: space-between;
    align-items: center;
    
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





const Weekdays = ({parentWeekdays, setParentWeekdays}) => {
    //parentWeekDays === [Boolean 7 times]
    const englishDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']    



    

    return(
        <>
        <StyledBox>
            <StyledBoxHeader>
            Weekdays
            </StyledBoxHeader>
            <StyledBoxBody>
            {
                englishDays.map((day, index)=> (<SingleWeekday weekday={index} parentWeekdays={parentWeekdays} setParentWeekdays={setParentWeekdays} day={day} />))
            }
            </StyledBoxBody>
        </StyledBox>
        </>

    )
}
//<SingleWeekday parentWeekDay={parentWeekDays[index]} setParentWeekdays={setParentWeekdays} key={day.toString()} weekday={day}></SingleWeekday>)
export default Weekdays

const SingleWeekday = ({parentWeekdays, setParentWeekdays, weekday, day}) => {

    const updateParentWeekdays = (a, i) => {
        let newArr = a
        newArr.splice(i, 1, !a[i])
        setParentWeekdays(prev => newArr)
        console.log(parentWeekdays[i])
        console.log(isActive)
    }
    const [isActive, setActive] = useState(parentWeekdays[weekday])

    const theOnclick = () => {
        if(updateParentWeekdays[weekday] !== isActive){
            updateParentWeekdays(parentWeekdays, weekday) 
            setActive(prev => !prev)
            
        }
    }

    return(
        <StyledBoxItem onClick={() => theOnclick()}  >
                <span>{day}</span>
                <div>
                <img src={isActive ? check : plus}  alt='checked' />
                </div>
        </StyledBoxItem>
    )

}