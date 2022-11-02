import React from "react";
import styled from 'styled-components';
import { BoxHeaderText } from "../../general_components/styledComponents1";
import arrowdown from '../../svgs/arrowdown.svg';
import arrowup from '../../svgs/arrowup.svg';

const OuterWrapper = styled.div`
    max-width: 95vw;
    aspect-ratio: 10 / 10;
    height: ${props => props.theme.boxHeight};
    display: flex;
    justify-content: center;
    align-items: center;

`

const StyledPeriodContainer = styled.div`
    width: ${props => props.theme.boxHeight};
    border: ${props => props.theme.bgrid};
    aspect-ratio: 12 / 5.5;
    margin-bottom: 3cm;
    box-shadow: 0 0 0.3cm grey;
    
`
const StyledPeriodHeader = styled.div`
    width: 100%;
    height: 25%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: ${props => props.theme.bgrid};
    background-color: ${props => props.theme.ic4};
`
const StyledPeriodBody = styled.div`
    width: 100%;
    height: 75%;
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
    font-weight: 400;
    font-size: 1.5em;
`
const VeryStrong = styled.strong`
    font-size: 2em;
    font-weight: 400;
`



const Period = ({ startPeriod, setStartPeriod, endPeriod, setEndPeriod}) => {





    return(
        <OuterWrapper>

        <StyledPeriodContainer>
        <StyledPeriodHeader>
            <BoxHeaderText>Period</BoxHeaderText>
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
        </OuterWrapper>
    )
}
export default Period