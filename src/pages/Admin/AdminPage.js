import React from "react"
import styled from "styled-components"
import { PageWrapper } from "../../general_components/styledComponents1"
import { ViewAsTimeframe } from "./ViewAsTimeFrame"
import { ViewSessionTypes } from "./ViewSessionTypes"



const Header = styled.h1`
    text-align: center;
    margin: 1cm;
`


const Admin = () => {

    return(
        <PageWrapper>
        <Header>Manage Appointments</Header>
        <ViewAsTimeframe />
        <Header>Manage Session Types</Header>
        <ViewSessionTypes />
        </PageWrapper>
    )
}

export default Admin



