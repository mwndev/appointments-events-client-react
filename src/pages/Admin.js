import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'
import Calendar from '../components/Calendar'

const now = Temporal.Now.plainDateISO()


const Admin = () => {


    return(
        <>

        <h1>Admin</h1>
        <ViewAsTimeframe />
        </>
    )
}


//here starts the viewing appointmentes as timeframe component



const ViewAsTimeframe = () => {


    const [startingDate, setStartingDate] = useState(now)
    const [finishingDate, setFinishingDate] = useState(now.add({weeks: 1}))
    const [weekdays, setWeekdays] = useState([])

    return(
        <>
            <h1>ViewAsTimeframe</h1>
            <Calendar initialISODate={now} setDateForParent={setStartingDate}  />
            <h4>{startingDate.toString()}</h4>
            <Calendar initialISODate={now} setDateForParent={setFinishingDate}  />
            <h4>{finishingDate.toString()}</h4>
        </>
        )
}


export default Admin



