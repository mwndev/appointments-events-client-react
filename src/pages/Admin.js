import React from "react"
import { ViewSessionTypes } from "../components/ViewSessionTypes"
import { ViewAsTimeframe } from "../components/ViewAsTimeFrame"
import { PageWrapper } from "../styledComponents/styledComponents1"






const Admin = () => {


    return(
        <PageWrapper>
        <ViewAsTimeframe />
        
        <ViewSessionTypes />
        </PageWrapper>
    )
}


//here starts the viewing appointmentes as timeframe component



export default Admin



