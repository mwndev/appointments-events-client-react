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
    padding: 0.3cm;
    cursor: pointer;
`


const ContentWrapper = styled.div`
    width: 80vw;
    display: flex;
    flex-wrap: wrap;
`




export const Dashboard = () => {

    const {user, setUser} = useContext(UserContext)
    const [content, setContent] = useState(<MyData />)


    const sidebar = [['My Data', <MyData />], ['My Appointments', <MyAppointments />], ['Privacy', <MyPrivacy />], ['Log out', <LogOut />]]

    return(
        <SectionWrapper>
        <h2>Welcome back {user.firstName}</h2>
        <OuterBox>

            <SidebarWrapper>
                {
                    sidebar.map((item,) => (
                        <SidebarItem key={item[0]} onClick={() => setContent(item[1])}>
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