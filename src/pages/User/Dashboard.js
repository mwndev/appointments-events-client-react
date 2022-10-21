import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { SectionWrapper, SmallerBoxText } from "../../general_components/styledComponents1";
import { LogOut } from "./LogOut";
import { MyAppointments } from "./MyAppointments";
import { MyData } from "./MyData";
import { MyPrivacy } from "./MyPrivacy";

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