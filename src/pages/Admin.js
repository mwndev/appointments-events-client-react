import React from "react"
import { ViewSessionTypes } from "../components/ViewAppointmentTypes"
import { ViewAsTimeframe } from "../components/ViewAsTimeFrame"
import { StyledPageWrapper } from "../styledComponents/styledComponents1"






const Admin = () => {


    return(
        <StyledPageWrapper>
        <ViewAsTimeframe />
        <ViewSessionTypes />
        </StyledPageWrapper>
    )
}


//here starts the viewing appointmentes as timeframe component



export default Admin



