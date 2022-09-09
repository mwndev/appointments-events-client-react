import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { SessionTypeContext } from "../../contexts/SessionTypeContext";
import { UserContext } from "../../contexts/UserContext";
import { cancelAppointment, dateSplice, temporalDateToNum, timeAsNumber } from "../../functions";
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


export const MyIndividualAppointments = ({ appointments }) => {

    appointments.sort(((a, b) => (a.date.dateAsNum - b.date.dateAsNum) * 10000 - (b.period.start - a.period.start) ))

    const {sTs} = useContext(SessionTypeContext)

    
    const daysOfWeek = [true, true, true, true, true, true, true]
    
    return(
        <>

        <OuterBox>
            <BoxHeader>
                <BoxHeaderText>
                    Appointments
                </BoxHeaderText>
            </BoxHeader>
            <BoxBody>
                {appointments.map(obj =>  (
                
                    <SingleDate
                    obj={obj} 
                    id={obj._id} 
                    key={uuidv4()}  
                    sT={sTs.filter(item => item._id === obj.reservation.sessionTypeID)[0]}
                    />
                ))}
            </BoxBody>
        </OuterBox>
        </>
    )
}



const StyledBoxItem = styled.div`
    margin: 0.15cm auto;
    flex-shrink: 0;
    flex-grow: 0;
    width: 100%;
    height: ${props => props.active ? '2.7cm' : '1.35cm'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 0.07cm solid #000;
    background-color: ${props => props.isActive ? props.theme.hc1 : 'inherit' };
    cursor: pointer;
`
const Default = styled.div`
    flex-shrink: 0;
    flex-grow: 0;
    width: 100%;
    height: 1.35cm;
    display: flex;
    align-items: center;
    justify-content: right;
    border-bottom: ${props => props.active ? '0.00cm solid #000' : 'none'};
    cursor: pointer;
`

const ImgContainer = styled.div`
    height: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
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
const Details = styled.span`
    display: ${props => props.active ? 'flex': 'none'};
    justify-content: right;
    align-items: center;
    width: calc(85% + 1.35cm);
    height: 1.35cm;
`
const Cancel = styled.div`
    background-color: ${props => props.theme.wc2};
    height: 100%;
    aspect-ratio: 3 / 2;
`






const SingleDate = ({ sT, obj }) => {

    const [active, setActive] = useState(false)
    const {user, setUser} = useContext(UserContext)

    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const dayNameShort= dayNames[obj.date.dayOfWeek].substring(0, 3)
    const monthName= monthNames[obj.date.month]

    useEffect(() => console.log(sT), [active])
    
    return(
        <>

        <StyledBoxItem
            active={active}
            onClick={() => setActive(prev => !prev) }
        >
            <Default active={active}>

            <Desc>
                 <Day>{ dayNameShort }, {obj.date.day}. {monthName}</Day>
                 <Time>{dateSplice(String(obj.period.start))} - {dateSplice(String(obj.period.end), ':')}</Time>
               
            </Desc>
            <ImgContainer>
                <img src={active ? activeIcon : icon}  />
            </ImgContainer>
            </Default>

            <Details active={active}>
                <Desc>
                    <Day>{sT.name}</Day>
                    <Time>{sT.price}zl</Time>
                    <Cancel onClick={() => cancelAppointment(obj._id, user.email, user.password)}>Cancel</Cancel>
                </Desc>
            </Details>
        </StyledBoxItem>
        </>
    )

}