import React from "react"
import { PageWrapper } from "../../general_components/styledComponents1"
import { ViewAsTimeframe } from "./ViewAsTimeFrame"
import { ViewSessionTypes } from "./ViewSessionTypes"






const Admin = () => {

    return(
        <PageWrapper>
        <ViewAsTimeframe />
        
        <ViewSessionTypes />
        </PageWrapper>
    )
}

export default Admin



