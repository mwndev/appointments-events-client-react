import React, { useState } from "react";
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { BoxHeaderText } from "../../general_components/styledComponents1";
import check from '../../svgs/calendarcheck.svg';
import plus from '../../svgs/calendarplus.svg';


const StyledItem = styled.div`
    flex-shrink: 1;
    min-height: 0;
    height: 17%;
    flex-grow: 1;
    width: 100%;
    border: ${props => props.theme.bgrid};
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: right;
    cursor: pointer;
    background-color: ${props => props.isActive  ? props.theme.hc1 : 'inherit'};
    span{
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1.3rem;
        padding-left: 0.13cm;
    }
    div{
        height: 100%;
        aspect-ratio: 1 / 1;
        border-left: ${props => props.theme.bgrid};
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
    border: ${props => props.theme.bgrid};
    margin: 1cm;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 7fr;
`
const Header = styled.div`
    border-bottom: ${props => props.theme.bgrid};
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    background-color: ${props => props.theme.ic4};
`
const Main = styled.div`
    grid-row: 2 / 3;
    //scrollbar is 0.5vw
    padding: 0.3cm 0.1cm 0cm calc(0.1cm + 0.5vw);
    gap: 0.3cm;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: scroll;
`

const Weekdays = ({parentWeekdays, setParentWeekdays, dow, sDOW}) => {
    //parentWeekDays === [Boolean 7 times]
    const englishDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']    


    return(
        <Box key={uuidv4()}>
            <Header>
            <BoxHeaderText>
                Weekdays
            </BoxHeaderText>
            </Header>
            <Main>
            {
                englishDays.map((day, index, arr)=> (
                    <SingleWeekday 
                        arrLength={arr.length} 
                        key={uuidv4()} 
                        index={index} 
                        parentWeekdays={parentWeekdays} 
                        setParentWeekdays={setParentWeekdays} 
                        day={day} 
                        dow={dow}
                        sDOW={sDOW}
                    />))
            }
            </Main>
        </Box>

    )
}
//<SingleWeekday parentWeekDay={parentWeekDays[index]} setParentWeekdays={setParentWeekdays} key={day.toString()} weekday={day}></SingleWeekday>)
export default Weekdays

const SingleWeekday = ({parentWeekdays, setParentWeekdays, index, day, dow, sDOW}) => {

    
    const updateParentWeekdays = (a, i) => {
        let newArr = a
        newArr.splice(i, 1, !a[i])
        setParentWeekdays( newArr)
        
    }
    const [isActive, setActive] = useState(parentWeekdays[index])

    const theOnclick = () => {
            updateParentWeekdays(parentWeekdays, index) 
            setActive(prev => !prev)
            sDOW(prev => !prev)

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
       