import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";
import { SectionWrapper, SmallerBoxText } from "../styledComponents/styledComponents1";
import { v4 as uuidv4 } from "uuid";
import { MyData } from "./dashboardComponents/MyData";
import { MyAppointments } from "./dashboardComponents/MyAppointments";
import { MyPrivacy } from "./dashboardComponents/MyPrivacy";
import { LogOut } from "./dashboardComponents/LogOut";

const OuterBox = styled.div`
    width: calc(30% + 8cm);
    display: flex;
    margin-right: 4cm;
`
const SidebarWrapper = styled.div`
    width: 10cm;
    margin-right: 2cm;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: baseline;
`
const SidebarItem = styled.div`
    transition: all 0.4s;
    padding: 0.3cm;
    cursor: pointer;
    border-bottom: 0.08cm solid ${props => props.active ? props.theme.ic6 : 'white'};
    &:hover{
        border-bottom: 0.08cm solid ${props => props.theme.ic6};
    }
`


const ContentWrapper = styled.div`
    width: 70vw;
    display: flex;
    flex-wrap: wrap;
`




export const Dashboard = () => {

    const {user, setUser} = useContext(UserContext)
    const [content, setContent] = useState(<MyAppointments/>)
    const [activeIndex, setActiveIndex] = useState(1)


    const sidebar = [['My Account', <MyData />], ['My Appointments', <MyAppointments />], ['Privacy', <MyPrivacy />], ['Log out', <LogOut />]]
        // <button onClick={() => console.log(user)} >user</button>

    return(
        <SectionWrapper>
        <OuterBox>
            <SidebarWrapper>
                {
                    sidebar.map((item, index) => (
                        <SidebarItem key={item[0]} index={index} active={activeIndex === index} 
                        onClick={() => { 
                            setContent(item[1])
                            setActiveIndex(index)
                            } 
                        }>
                            <SmallerBoxText>
                                {item[0]} 
                            </SmallerBoxText>
                        </SidebarItem>
                    ))
                }
            </SidebarWrapper>
            <ContentWrapper>
                {content}
            </ContentWrapper>
        </OuterBox>
        </SectionWrapper>
    )
}