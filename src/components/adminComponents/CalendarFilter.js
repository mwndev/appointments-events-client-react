import React, {useState, useEffect, useContext} from "react"
import styled from "styled-components"
import plus from '../../svgs/calendarplus.svg'
import minus from '../../svgs/calendarminus.svg'


const Box = styled.div`
    aspect-ratio: 5 / 8;
    height: ${props => props.theme.boxHeight};
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;
    display: grid;
    grid-template-rows: 1fr 7fr;
`
const Header = styled.div`
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    background-color: ${props => props.theme.ic4};
    span{
        font-weight: 500;
        font-size: 1.4em;
    }
`
const Main = styled.div`
    grid-row: 2 / 3;
    padding: 0.3cm 0.3cm;
    gap: 0.3cm;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const StyledItem = styled.div`
    height: 100%;
    width: 100%;
    border: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    align-items: center;
    justify-content: right;
    cursor: pointer;
    background-color: ${props => props.active  ? props.theme.hc1 : 'inherit'};

    span{
        width: 5cm;
        height: 1cm;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
    }
    span > span{
        font-size: 1.4rem;
    }
    div{
        height: 1cm;
        aspect-ratio: 1 / 1;
        border-left: 0.07cm solid ${props => props.theme.tc};
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img{
        height: 60%;
        aspect-ratio: 1 / 1;
    }
`
//available taken all period
export const CalendarFilter = ({filter, setFilter}) => {
    

    return(
        <Box>
            <Header><span>Highlight</span></Header>
            <Main>
                <StyledItem active={filter === 'all'} onClick={() => setFilter('all')}>
                    <span>All</span>
                    <div>
                        <img src={filter === 'all' ? minus : plus} />
                    </div>
                </StyledItem>

                <StyledItem active={filter === 'available'} onClick={() => setFilter('available')}>
                    <span><span>available</span></span>
                    <div>
                        <img src={filter === 'available' ? minus : plus} />
                    </div>
                </StyledItem>
                <StyledItem  active={filter === 'taken'} onClick={() => setFilter('taken')}>
                    <span><span>taken</span></span>
                    <div>
                        <img src={filter === 'taken' ? minus : plus} />
                    </div>
                </StyledItem>
                <StyledItem  active={filter === 'period'} onClick={() => setFilter('period')}>
                    <span><span>within period</span></span>
                    <div>
                        <img src={filter === 'period' ? minus : plus} />
                    </div>
                </StyledItem>
                <StyledItem active={filter === 'start'} onClick={() => setFilter('start')}>
                    <span>after period start</span>
                    <div>
                        <img src={filter === 'start' ? minus : plus} />
                    </div>
                </StyledItem>
                <StyledItem active={filter === 'end'} onClick={() => setFilter('end')}>
                    <span>before period end</span>
                    <div>
                        <img src={filter === 'end' ? minus : plus} />
                    </div>
                </StyledItem>
            </Main>
        </Box>
    )
}

