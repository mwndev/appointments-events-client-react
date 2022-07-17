import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import arrowup from '../svgs/arrowup.svg'

const StyledPeriodContainer = styled.div`
    width: 14cm;
    height: 6cm;
    border: 0.02cm solid black;
    
    
`
const StyledPeriodHeader = styled.div`
    width: 14cm;
    height: 18%;
    flex-shrink: 0;
    border-bottom: 0.02cm solid black;
    span{
        font-size: 1.4rem;
        font-weight: 400;
    }
`
const StyledPeriodBody = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column;
        width: 1rem;
        height: 2cm;
        
    }
    span{
        width: 90%;
        height: 60%;
    }
    
`
const StyledArrow = styled.img`
    aspect-ratio: 1 / 1;
    width: 90%;
    &:hover{
        cursor: pointer;
    }
    .down{
        transform: rotate(180deg);
    }
`
const Arrow = () => <StyledArrow src={arrowup} />

const Period = ({children, period, setPeriod}) => {


        
    const setStartingHour = (amount) => {
        console.log(period.start.add({hours: 1}))
        setPeriod(prev => prev.start.add({hours: amount}))
    }
    const setStartingMinutes = (amount) => {
        setPeriod(prev => prev.start.add({minutes: amount}))
    }
    const setFinishingHour = (amount) => {
        setPeriod(prev => prev.end.add({hours: amount}))
    }
    const setFinishingMinutes = (amount) => {
        setPeriod(prev => prev.end.add({minutes: amount}))
    }



    return(
        <StyledPeriodContainer>
        <StyledPeriodHeader>
            <span>{period.start.hour}</span>
        </StyledPeriodHeader>
        <StyledPeriodBody>


        <div>
            <Arrow onClick={() => setStartingHour(10)}/>
            {Math.floor(period.start.hour / 10 )}
            <Arrow className={'down'} onClick={() => setStartingHour(-10)}/>
        </div>
        <div>
            <Arrow onClick={() => setStartingHour(1)}/>
            {}
        </div>
        </StyledPeriodBody>
        </StyledPeriodContainer>
    )
}
export default Period