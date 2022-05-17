import React, {useState} from 'react'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'; 
import arrow from '../svgs/arrowup.svg'



const daysObject = {
    '1': 31,
    '2': 28,
    '3': 31,
    '4': 30,
    '5': 31,
    '6': 30,
    '7': 31,
    '8': 31,
    '9': 30,
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
        margin: 0.06cm;
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
    aspect-ratio: 1 / 1;
    margin: 1%;
    justify-self: right;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    flex-grow: 1;
    pre{
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
`



//TODO apply gradient to header
const Book = () => {

    
    let nowString = Temporal.Now.plainDateISO().toString()
    console.log(nowString)

    const getMonthFromISODateAsNum = (ISODate) => {
        return Number(ISODate.substring(5, 7))
    }
    const currentMonth = getMonthFromISODateAsNum(nowString)

    
    const [month, setMonth] = useState(getMonthFromISODateAsNum(nowString))

    const [date, setDate] = useState(nowString)

    const decrementMonth = () => {
        if(month === currentMonth){
            return
        }
        if(month === 1){
            setMonth(12)//and decrement the year
        }
        setMonth(previousMonth => previousMonth - 1)
    }
    const incrementMonth = () => {
        if(month === 12){
            setMonth(1)
        }else{
            setMonth(previousMonth => previousMonth + 1)
        }
    }

    //why do i need to use .map() to render the days
    const buildDaysArray = () => {
        let daysArray = []

        for(let i = 0 ; i < daysObject[parseInt(month)] ; i += 1){

            daysArray.push(parseInt(i+1))
        }
        return daysArray       
    }

    return(
        <StyledCalendarBox>
        <StyledCalendarBoxHeader>
            <StyledMonthName>{month}</StyledMonthName>
            <StyledArrowWrapper>
            <img src={arrow} alt='up' onClick={decrementMonth} />
            <img className='down' src={arrow} alt='down' onClick={incrementMonth} />
            </StyledArrowWrapper>
        </StyledCalendarBoxHeader>
        <StyledCalendarBoxBody>
            {buildDaysArray().map(day => <StyledDay><pre>{day}</pre></StyledDay>)}
        </StyledCalendarBoxBody>
        </StyledCalendarBox>
    )
}

export default Book