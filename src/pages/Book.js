import React, {useState} from 'react'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'; 
import arrow from '../svgs/arrowup.svg'



const daysObject = {
    '01': 31,
    '02': 28,
    '03': 31,
    '04': 30,
    '05': 31,
    '06': 30,
    '07': 31,
    '08': 31,
    '09': 30,
    '10': 31,
    '11': 30,
    '12': 31
}


const StyledCalendarBox = styled.div`
    width: 8cm;
    height: 9cm;
    border: 0.07cm solid ${props => props.theme.tc};


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
const StyledCalendarBoxBody = styled.div`
    width: 8cm;
    height: 8cm;
    display: flex;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
    padding: 0.2cm;
`



































//TODO apply gradient to header
const Book = () => {

    const now = Temporal.Now.plainDateISO()

    let e = now.with({day: 2})
    console.log(e)

    const [date, setDate] = useState(now)

    const incrementMonth = () => {
        setDate(previous => previous.add({months: 1}))
    }
    const decrementMonth = () => {
        let testDate = date.subtract({months: 1}).since(now).toString();
        if( testDate.substring(0, 1) === 'P')
        setDate(previous => previous.subtract({months: 1}))
    }
    console.log(date)
    

    //const daysInMonthArray = () => {
    //
    //    let arr = []
    //    for(let day = 1 ; day <= date.daysInMonth ; day +=1){
    //        arr.push(<Day d={1}/>)
    //    }
    //    return arr
    //}
        
   

    return(
        <StyledCalendarBox>
        <StyledCalendarBoxHeader>
            <StyledMonthName>{date.toString()}</StyledMonthName>
            <StyledArrowWrapper>
            <img src={arrow} alt='up' onClick={decrementMonth} />
            <img className='down' src={arrow} alt='down' onClick={incrementMonth} />
            </StyledArrowWrapper>
        </StyledCalendarBoxHeader>
        <StyledCalendarBoxBody>
        {daysInMonthArray().map(day => day)}
            
        </StyledCalendarBoxBody>
        </StyledCalendarBox>
    )
}

export default Book