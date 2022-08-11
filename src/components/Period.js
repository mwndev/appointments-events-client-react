import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import arrowup from '../svgs/arrowup.svg'
import arrowdown from '../svgs/arrowdown.svg'

const StyledPeriodContainer = styled.div`
    width: ${props => props.theme.boxHeight};
    border: ${props => props.theme.bthk};
    aspect-ratio: 12 / 5;
    
`
const StyledPeriodHeader = styled.div`
    width: 100%;
    height: 18%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: ${props => props.theme.bthk};
    background-color: ${props => props.theme.ic4};
    span{
        font-size: 1.6rem;
        font-weight: 500;
    }
`
const StyledPeriodBody = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const StyledArrow = styled.img`
    aspect-ratio: 1 / 1;
    width: 0.5cm;
    &:hover{
        cursor: pointer;
    }
    .down{
        transform: rotate(180deg);
    }
`

//for Number and buttons
const StyledWrapper = styled.div`
    height: 4cm;
    width: 1.5cm;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    font-weight: 500;
    font-size: 1.5em;
`
const VeryStrong = styled.strong`
    font-size: 2em;
    font-weight: 500;
`



const Period = ({children, period, setPeriod, startPeriod, setStartPeriod, endPeriod, setEndPeriod}) => {


        
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
            <span>Period</span>
        </StyledPeriodHeader>
        <StyledPeriodBody>
        <StyledWrapper>
            <StyledArrow src={arrowup} onClick={() => setStartPeriod({hours: 10})} />
            {Math.floor(startPeriod.hour / 10)}
            <StyledArrow src={arrowdown} onClick={() => setStartPeriod({hours: -10})} />
        </StyledWrapper>
         <StyledWrapper>
            <StyledArrow src={arrowup} onClick={() => setStartPeriod({hours: 1})} />
            {startPeriod.hour - (Math.floor(startPeriod.hour / 10) * 10)}
            <StyledArrow src={arrowdown} onClick={() => setStartPeriod({hours: -1})} />
        </StyledWrapper>
        <StyledWrapper>
            <StyledArrow src={arrowup} onClick={() => setStartPeriod({minutes: 10})} />
            {Math.floor(startPeriod.minute / 10)}
            <StyledArrow src={arrowdown} onClick={() => setStartPeriod({minutes: -10})} />
        </StyledWrapper>
        <StyledWrapper>
            <StyledArrow src={arrowup} onClick={() => setStartPeriod({minutes: 1})} />
            {startPeriod.minute - (Math.floor(startPeriod.minute / 10) * 10)}
            <StyledArrow src={arrowdown} onClick={() => setStartPeriod({minutes: -1})} />
        </StyledWrapper>
        <VeryStrong>
        -
        </VeryStrong>
        <StyledWrapper>
            <StyledArrow src={arrowup} onClick={() => setEndPeriod({hours: 10})} />
            {Math.floor(endPeriod.hour / 10)}
            <StyledArrow src={arrowdown} onClick={() => setEndPeriod({hours: -10})} />
        </StyledWrapper>
         <StyledWrapper>
            <StyledArrow src={arrowup} onClick={() => setEndPeriod({hours: 1})} />
            {endPeriod.hour - (Math.floor(endPeriod.hour / 10) * 10)}
            <StyledArrow src={arrowdown} onClick={() => setEndPeriod({hours: -1})} />
        </StyledWrapper>
        <StyledWrapper>
            <StyledArrow src={arrowup} onClick={() => setEndPeriod({minutes: 10})} />
            {Math.floor(endPeriod.minute / 10)}
            <StyledArrow src={arrowdown} onClick={() => setEndPeriod({minutes: -10})} />
        </StyledWrapper>
        <StyledWrapper>
            <StyledArrow src={arrowup} onClick={() => setEndPeriod({minutes: 1})} />
            {endPeriod.minute - (Math.floor(endPeriod.minute / 10) * 10)}
            <StyledArrow src={arrowdown} onClick={() => setEndPeriod({minutes: -1})} />
        </StyledWrapper>
        </StyledPeriodBody>
        </StyledPeriodContainer>
    )
}
export default Period