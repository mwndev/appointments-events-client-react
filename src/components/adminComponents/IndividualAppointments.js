import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { dateSplice, temporalDateToNum, timeAsNumber } from "../../functions";
import { BoxHeaderText } from "../../styledComponents/styledComponents1";
import icon from '../../svgs/calendarcheck.svg'
import activeIcon from '../../svgs/calendarwarning.svg'

const OuterBox = styled.div`
    height: ${props => props.theme.boxHeight};
    aspect-ratio: 1 / 1;
    display: grid;
    grid-template-rows: 1fr 7fr;
    border: ${props => props.theme.bthk};
`
const BoxHeader = styled.div`
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    grid-row: 1 / 2;
`
const BoxBody = styled.div`
    overflow-y: scroll;
    grid-row: 2 / 3;
    padding: 0.15cm;
`


export const IndividualAppointments = ({ appointments, filters, selectAppointments, selectedAppointments }) => {

    const { startDate, endDate, startPeriod, endPeriod, daysOfWeek } = filters


    const sD = temporalDateToNum(startDate)
    const eD = temporalDateToNum(endDate)
    const sP = timeAsNumber(startPeriod)
    const eP = timeAsNumber(endPeriod)

    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        console.log('filtered rerendered')
        console.log(filters)
        const filteredAppointments = appointments.filter(item => (
            item.date.dateAsNum >=  sD &&
            item.date.dateAsNum <= eD &&
            item.period.start >= sP &&
            item.period.end <= eP &&
            daysOfWeek[ item.date.dayOfWeek - 1 ] === true &&
            item.reservation.numOfGuests === 0
    ))
    filteredAppointments.sort(((a, b) => (a.date.dateAsNum - b.date.dateAsNum) * 10000 - (b.period.start - a.period.start) ))

    setFiltered(filteredAppointments)


    }, [filters, appointments, daysOfWeek])




    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    return(
        <>

        <OuterBox>
            <BoxHeader>
                <BoxHeaderText>
                    Appointments
                </BoxHeaderText>
            </BoxHeader>
            <BoxBody>
                {filtered.map(obj =>  (
                
                    <SingleDate
                    object={obj} 
                    id={obj._id} 
                    selectedAppointments={selectedAppointments}
                    selectAppointments={selectAppointments} 
                    key={uuidv4()}  
                    daysOfWeek={daysOfWeek}
                    dayNameShort={dayNames[obj.date.dayOfWeek].substring(0, 3)}
                    monthName={monthNames[obj.date.month]}
                    />
                ))}
            </BoxBody>
        </OuterBox>
        <button onClick={() => console.log(daysOfWeek)}>{JSON.stringify(daysOfWeek)}</button>
        </>
    )
}



const StyledBoxItem = styled.div`
    margin: 0.15cm auto;
    flex-shrink: 0;
    flex-grow: 0;
    width: 100%;
    height: 1.35cm;
    display: flex;
    align-items: center;
    justify-content: right;
    border: 0.07cm solid #000;
    background-color: ${props => props.isActive ? props.theme.hc1 : 'inherit' };
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
    
`
const Desc = styled.span`
    width: 85%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    *{
        font-size: 1.3em;
    }
`
const Day = styled.span`
    width: 60%;
`
const Time = styled.span`
    width: 40%;
`







const SingleDate = ({dayNameShort, object, id, monthName, selectAppointments, selectedAppointments }) => {


        let active = selectedAppointments.includes(id)

    return(
        <StyledBoxItem
        isActive={active}
        onClick={() => selectAppointments(id)} >
        
            <Desc>
                 <Day>{ dayNameShort }, {object.date.day}. {monthName}</Day>
                 <Time>{dateSplice(String(object.period.start), ':')} - {dateSplice(String(object.period.end), ':')}</Time>
               
            </Desc>
            <div>
                <img src={active ? activeIcon : icon}  />
            </div>
        </StyledBoxItem>
    )

}