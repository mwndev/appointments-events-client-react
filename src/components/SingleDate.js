import styled from 'styled-components'
import icon from '../svgs/calendarcheck.svg'
import activeIcon from '../svgs/calendarwarning.svg'
import React, {useState, useEffect, } from 'react'
import { Temporal } from '@js-temporal/polyfill'


const StyledBoxItem = styled.div`
    margin: 0.1cm 0.2cm;
    flex-shrink: 0;
    flex-grow: 0;
    width: 11cm;
    height: 1.3cm;
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
    span{
        width: 70%;
        height: 70%;

    }
`







const SingleDate = ({dayNameShort, object, id, monthName, selectAppointments, selectedAppointments }) => {


        let active = selectedAppointments.includes(id)

    return(
        <StyledBoxItem
        isActive={active} 
        onClick={() => selectAppointments(id)} >
        
            <span>
                 { dayNameShort }, {object.date.day}. {monthName} &nbsp; {object.period.start} - {object.period.end}
               
            </span>
            <div>
                <img src={active ? activeIcon : icon}  />
            </div>
        </StyledBoxItem>
    )

}
export default SingleDate