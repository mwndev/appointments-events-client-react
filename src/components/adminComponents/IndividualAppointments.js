import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { temporalDateToNum, timeAsNumber } from "../../functions";
import { BoxHeaderText } from "../../styledComponents/styledComponents1";
import SingleDate from "../SingleDate";

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
`


export const IndividualAppointments = ({ appointments, filters, selectAppointments, selectedAppointments }) => {

    const { startDate, endDate, startPeriod, endPeriod, daysOfWeek } = filters

    const sD = temporalDateToNum(startDate)
    const eD = temporalDateToNum(endDate)
    const sP = timeAsNumber(startPeriod)
    const eP = timeAsNumber(endPeriod)


    const filteredAppointments = appointments.filter(item => (
        item.date.dateAsNum >=  sD &&
        item.date.dateAsNum <= eD &&
        item.period.start >= sP &&
        item.period.end <= eP &&
        daysOfWeek[ item.date.dayOfWeek - 1 ] === true &&
        item.reservation.numOfGuests === 0
    ))




    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    return(
        <OuterBox>
            <BoxHeader>
                <BoxHeaderText>
                    Appointments
                </BoxHeaderText>
            </BoxHeader>
            <BoxBody>
                {filteredAppointments.map(obj =>  (
                
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
    )
}