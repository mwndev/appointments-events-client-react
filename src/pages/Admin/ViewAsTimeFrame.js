import { Temporal } from '@js-temporal/polyfill'
import React, { useContext, useEffect, useState } from 'react'
import { backendURL } from '../../App'
import { UserContext } from '../../contexts/UserContext'
import { WindowAlertContext } from '../../contexts/WindowAlertContext'
import { WindowConfirmContext } from '../../contexts/WindowConfirmContext'
import { temporalDateToNum, timeAsNumber } from '../../general/functions'
import Calendar from '../../general_components/Calendar'
import { ButtonWrapper, Carousel, CarouselButtonL, CarouselButtonR, CarouselInnerBox, CarouselItem, CarouselOuterBox, FlexWrapper, ImportantButton, PageWrapper, SectionWrapper } from '../../general_components/styledComponents1'
import arrowup from '../../svgs/arrowup.svg'
import { CalendarFilter } from './CalendarFilter'
import { IndividualAppointments } from './IndividualAppointments'
import Period from './Period'
import Weekdays from './Weekdays'



//!TODO daysofweek isn't working, make it simpler (without converting 5 times)

const now = Temporal.Now.plainDateISO()
const time = Temporal.PlainTime.from({
    hour: 18,
    minute: 0,
})


export const ViewAsTimeframe = ({ simpleLayout, toggleLayout }) => {


    const [startingDate, setStartingDate] = useState(now)
    const [finishingDate, setFinishingDate] = useState(now.add({days: 7}))
    const [daysOfWeek, setDaysOfWeek] = useState([true, true, true, true, true, true, true])
    const [dow, sDOW] = useState([])
    const [appointmentsFromServer, setAppointmentsFromServer] = useState([])
    const [selectedAppointments, selectAppointmentsRaw] = useState([])
    const [period, setPeriod] = useState({start: time, end: time.with({hour: 20})})
    const [startPeriod, setStartPeriodRaw] = useState(time)
    const [endPeriod, setEndPeriodRaw] = useState(time.add({hours: 2}))
    const [carouselCount, setCount] = useState(0)

    const {user} = useContext(UserContext)
    const { windowConfirm } = useContext(WindowConfirmContext)
    const { windowAlert } = useContext(WindowAlertContext) 
    
    useEffect(() => {

        const initAdminGetAppointments = async() => {
            const res = await fetch(`${backendURL}/appointment/admin/${user.email}/${user.password}`)


            const { verified, appointments } = await res.json()

            if ( !verified ) return windowAlert('admin verification failed')
            
            setAppointmentsFromServer(appointments)
        }
        initAdminGetAppointments()
    },[])
    const adminGetAppointments = async() => {
        const res = await fetch(`${backendURL}/appointment/admin/${user.email}/${user.password}`)

        const { verified, appointments } = await res.json()

        if ( !verified ) return windowAlert('admin verification failed')
        
        setAppointmentsFromServer(appointments)
    }

    const selectAppointments = (id) => {
        if( ! selectedAppointments.includes(id) ) return selectAppointmentsRaw(prev => [...prev, id])
        selectAppointmentsRaw(prev => prev.filter(i => i !== id))
    }

   const setStartPeriod = (amount) => {
    const placeHolder = startPeriod.add(amount)
    if( (placeHolder.hour * 100) + placeHolder.minute < (endPeriod.hour*100) + endPeriod.minute){
        setStartPeriodRaw(prev => prev.add(amount))
    }
   }
   const setEndPeriod = (amount) => {
    const placeHolder = endPeriod.add(amount)
    if((startPeriod.hour * 100)+ startPeriod.minute < (placeHolder.hour * 100 + placeHolder.minute)){
        setEndPeriodRaw(prev => prev.add(amount))
    }
   }
  
    


    
   

    const serverDeleteAppointments = async() => {
        
        windowConfirm('Are you sure you want to DELETE ALL appointments within the specified timeframe?', async () => {
            try {
                //I have to repeat this process that also occurs in the IndividualAppointments Component to prevent rendering bug
                //TODO refactor IndividualAppointments to just use this as data?
                const fullyFiltered = filteredAppointments.filter(item => (
                    item.date.dateAsNum >=  temporalDateToNum(startingDate) &&
                    item.date.dateAsNum <=  temporalDateToNum(finishingDate) &&
                    daysOfWeek[ item.date.dayOfWeek - 1 ] === true 
                ))
                const bodyObj = {
                    userData: user,
                    idsArray: fullyFiltered.map(item => item._id)

                }
        


                const bodyAsJSON = JSON.stringify(bodyObj)



                const res = await fetch(`${backendURL}/appointment/admin`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: bodyAsJSON
                })
                const data = await res.json()

                windowAlert(`Number of appointments deleted: ${data.mongoRes.deletedCount}`)

            } catch (error) {
                console.log(error)
                windowAlert('server error')
            }
        })
    }



    const cancelSelectedAppointments = async (objectIDArray) => {

        const objectsFromIdArray = filteredAppointments.filter(item => (objectIDArray.includes(item._id))  )
        console.log(objectsFromIdArray)

        const toCancel = objectsFromIdArray.filter( item => {
                console.log(item)
                return(
                    item.date.dateAsNum >=  temporalDateToNum(startingDate) &&
                    item.date.dateAsNum <= temporalDateToNum(finishingDate) &&
                    item.period.start >= timeAsNumber(startPeriod) &&
                    item.period.end <= timeAsNumber(endPeriod) &&
                    daysOfWeek[ item.date.dayOfWeek - 1 ] === true
                )
        })
        console.log(toCancel)

        
        let ids = toCancel.map(item => item._id)
        
        const bodyAsJSON = JSON.stringify({
            objectIDArray: ids, 
            userData: user
        })

        const res = await fetch(`${backendURL}/cancel/admin`, {
            method: 'PUT', 
            headers: {
                "Content-Type" : "application/json",
            }, 
            body: bodyAsJSON, 
        })

        const data = await res.json()

        console.log(data)

        windowAlert(`${data.msg}`)


    }
    const deleteSelectedAppointments = async (objectIDArray) => {

        const objectsFromIdArray = filteredAppointments.filter(item => (objectIDArray.includes(item._id))  )
        console.log(objectsFromIdArray)

        const toCancel = objectsFromIdArray.filter( item => {
                console.log(item)
                return(
                    item.date.dateAsNum >=  temporalDateToNum(startingDate) &&
                    item.date.dateAsNum <= temporalDateToNum(finishingDate) &&
                    item.period.start >= timeAsNumber(startPeriod) &&
                    item.period.end <= timeAsNumber(endPeriod) &&
                    daysOfWeek[ item.date.dayOfWeek - 1 ] === true
                )
        })
        let ids = toCancel.map(item => item._id)
        console.log(ids)

        
        
        const bodyAsJSON = JSON.stringify({
            objectIDArray: ids, 
            userData: user
        })

        const res = await fetch(`${backendURL}/admin/byid`, {
            method: 'DELETE', 
            headers: {
                "Content-Type" : "application/json",
            }, 
            body: bodyAsJSON, 
        })

        const data = await res.json()

        console.log(data)

        windowAlert(`${data.msg}`)


    }
                

    const serverPostAppointments = async() => {

        try {

            const bodyObj = {
                userData: user,
                startDate: {
                    day: startingDate.day,
                    month: startingDate.month,
                    year: startingDate.year,
                    dayOfWeek: startingDate.dayOfWeek,
                    dateISOString: startingDate.toString(),
                },
                endDate: {
                    day: finishingDate.day,
                    month: finishingDate.month,
                    year: finishingDate.year,
                    dayOfWeek: finishingDate.dayOfWeek,
                    dateISOString: finishingDate.toString(),
                },
                period: {
                    startTime: timeAsNumber(startPeriod),
                    endTime: timeAsNumber(endPeriod),
                },
                onDaysOfWeek: daysOfWeek,
            }

            console.log(bodyObj)
            const bodyAsJSON = JSON.stringify(bodyObj)


            console.log(bodyAsJSON)
            
            const res = await fetch(`${backendURL}/appointment/admin`, {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: bodyAsJSON
            })
            const data = await res.json()


        } catch (error) {
            console.log(error)
            windowAlert('appointments could not be set')
        }
    }


    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [filter, setFilter] = useState('available')

    useEffect(() => {
        
        if(filter === 'available') setFilteredAppointments(
            appointmentsFromServer.filter(item => item.reservation.numOfGuests === 0)
        )
        if(filter === 'taken') setFilteredAppointments(
            appointmentsFromServer.filter(item => item.reservation.numOfGuests > 0)
        )
        if(filter === 'all') setFilteredAppointments(
            appointmentsFromServer
        )
        if(filter === 'period') setFilteredAppointments(
            appointmentsFromServer.filter(item => (
                item.period.start >= timeAsNumber(startPeriod) &&
                item.period.end <= timeAsNumber(endPeriod)  
            ))
        )
        if(filter === 'start') setFilteredAppointments(
            appointmentsFromServer.filter(item => item.period.start >= timeAsNumber(startPeriod))
        )
        if(filter === 'end') setFilteredAppointments(
            appointmentsFromServer.filter(item => item.period.start <= timeAsNumber(endPeriod))
        )


    }, [filter, appointmentsFromServer])



    //TODO add info button on single dates to show reservation details
    return(
        <>

        {
            simpleLayout ? (
                <FlexWrapper>
                    <CarouselOuterBox>
                        <CarouselButtonL onClick={() => { if(carouselCount !== 0) setCount(prev => prev - 1) }} ><img  src={arrowup} alt='L'/></CarouselButtonL>
                        <CarouselInnerBox>
                        <Carousel index={carouselCount}>

                            {
                                [
                                    [<Calendar parentISODate={startingDate} setDateForParent={setStartingDate} appointments={filteredAppointments} />, <h2>Set <span>starting date</span></h2>],
                                    [<Calendar parentISODate={finishingDate} setDateForParent={setFinishingDate} appointments={filteredAppointments} />, <h2>Set <span>finishing date</span></h2>],
                                    [<CalendarFilter filter={filter} setFilter={setFilter} />, <h2>Set <span>filter</span></h2>],
                                    [<Weekdays parentWeekdays={daysOfWeek} setParentWeekdays={setDaysOfWeek} dow={dow} sDOW={sDOW} trigger={false} /> , <h2><span>Filter</span> by weekdays.</h2>],
                                    [<IndividualAppointments 
                                        selectAppointments={selectAppointments} 
                                        appointments={filteredAppointments} 
                                        filters={{ 
                                            startDate: startingDate, 
                                            endDate : finishingDate, 
                                            startPeriod: startPeriod, 
                                            endPeriod: endPeriod, 
                                            daysOfWeek: daysOfWeek 
                                        }}
                                        selectedAppointments={selectedAppointments}
                                         /> , <h2><span>Select</span> single appointments</h2>],
                                    [<Period 
                                        period={period} setPeriod={setPeriod}
                                        startPeriod={startPeriod} setStartPeriod={setStartPeriod}
                                        endPeriod={endPeriod} setEndPeriod={setEndPeriod}
                                        /> , <h2>Set <span>time period</span></h2>],
                        
                                    [<ButtonWrapper>
                                        <ImportantButton onClick={() => {
                                            serverPostAppointments()
                                            adminGetAppointments()
                                        }}>
                                        <span>create new</span>
                                        </ImportantButton>
                                        <ImportantButton onClick={() => {
                                            serverDeleteAppointments()
                                            adminGetAppointments()
                                        }} >
                                        <span>delete visible</span>
                                        </ImportantButton>
                                        <ImportantButton onClick={() => {
                                            deleteSelectedAppointments(selectedAppointments)
                                            adminGetAppointments()
                                        }}>
                                        <span>delete selected</span>
                                        </ImportantButton>
                                        <ImportantButton onClick={() => {
                                            cancelSelectedAppointments(selectedAppointments)
                                            adminGetAppointments()
                                        }}>
                                        <span>cancel selected</span>
                                        </ImportantButton>
                                    </ButtonWrapper> , <h2><span>Commands</span></h2>],
                        
                                ].map((item, index) => (
                                    <CarouselItem index={index}>
                                        {item[1]}
                                        {item[0]}
                                    </CarouselItem>
                                ))
                            }
                        </Carousel>
                        </CarouselInnerBox>
                        <CarouselButtonR onClick={() => { if(carouselCount < 6) setCount(prev => prev + 1) }} ><img src={arrowup} alt='R'/></CarouselButtonR>
                    </CarouselOuterBox>    
                </FlexWrapper>
            ) : (

                <PageWrapper>

                    <FlexWrapper>
                    <SectionWrapper>
                        <h2><span>Highlight</span> in calendars</h2>
                        <CalendarFilter filter={filter} setFilter={setFilter} />
                    </SectionWrapper>

                    <SectionWrapper>
                        <h2><span>Beginning</span> of Timeframe</h2>
                        <Calendar parentISODate={startingDate} setDateForParent={setStartingDate} appointments={filteredAppointments} />
                    </SectionWrapper>
                    <SectionWrapper>
                        <h2><span>Ending</span> of Timeframe</h2>
                        <Calendar parentISODate={finishingDate} setDateForParent={setFinishingDate} appointments={filteredAppointments} />
                    </SectionWrapper>

                    <SectionWrapper>
                        <h2><span>Filter</span> by Weekdays</h2>
                        <Weekdays parentWeekdays={daysOfWeek} setParentWeekdays={setDaysOfWeek} dow={dow} sDOW={sDOW} trigger={false} />
                    </SectionWrapper>

                    <SectionWrapper>
                        <h2><span>Select</span> single appointments</h2>
                        <IndividualAppointments 
                        selectAppointments={selectAppointments} 
                        appointments={filteredAppointments} 
                        filters={{ 
                            startDate: startingDate, 
                            endDate : finishingDate, 
                            startPeriod: startPeriod, 
                            endPeriod: endPeriod, 
                            daysOfWeek: daysOfWeek 
                        }}
                        selectedAppointments={selectedAppointments}
                         />
                    </SectionWrapper>


                    <SectionWrapper>
                        <h2><span>Set</span> time period</h2>
                        <Period 
                        period={period} setPeriod={setPeriod}
                        startPeriod={startPeriod} setStartPeriod={setStartPeriod}
                        endPeriod={endPeriod} setEndPeriod={setEndPeriod}
                        />
                    </SectionWrapper>

                    <SectionWrapper>
                        <h2><span>Server commands</span> </h2>
                        <ButtonWrapper>
                            <ImportantButton onClick={() => {
                                serverPostAppointments()
                                adminGetAppointments()
                            }}>
                            <span>create new</span>
                            </ImportantButton>
                            <ImportantButton onClick={() => {
                                serverDeleteAppointments()
                                adminGetAppointments()
                            }} >
                            <span>delete filtered</span>
                            </ImportantButton>
                            <ImportantButton onClick={() => {
                                deleteSelectedAppointments(selectedAppointments)
                                adminGetAppointments()
                            }}>
                            <span>delete selected</span>
                            </ImportantButton>
                            <ImportantButton onClick={() => {
                                cancelSelectedAppointments(selectedAppointments)
                                adminGetAppointments()
                            }}>
                            <span>cancel selected</span>
                            </ImportantButton>
                        </ButtonWrapper>
                    </SectionWrapper>

 
                   </FlexWrapper>
                </PageWrapper>
            )
        }
        </>
        )
}

