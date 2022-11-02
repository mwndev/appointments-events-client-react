import React from "react"
import styled from "styled-components"
import circle from '../../svgs/circle.svg'
import dot from '../../svgs/dot.svg'

const Box = styled.div`
    aspect-ratio: 6 / 8;
    height: ${props => props.theme.boxHeight};
    border: ${props => props.theme.bgrid};
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 7fr;
    box-shadow: 0 0 0.3cm grey;
    margin-bottom: 0.3cm;
`
const Header = styled.div`
    border-bottom: ${props => props.theme.bgrid};
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.ic4};
    span{
        font-weight: 400;
        font-size: 1.8em;
    }
`
const Main = styled.div`
    grid-row: 2 / 3;
    //scrollbar is 0.5vw
    padding: 0.3cm ${navigator.userAgent.match(/firefox|fxios/i) ? 'calc(0.5vw + 0.1cm) 0.3cm' : '0.1cm 0'}   calc(0.5vw + 0.1cm);
    gap: 0.3cm;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: scroll;
`
const StyledItem = styled.div`
    flex-shrink: 1;
    flex-grow: 1;
    min-height: 0;
    margin: 0 auto;
    height: 14%;
    flex-grow: 1;
    width: 100%;
    border: ${props => props.theme.bgrid};
    display: flex;
    align-items: center;
    justify-content: right;
    cursor: pointer;
    background-color: ${props => props.active  ? props.theme.hc1 : 'inherit'};
    

    span{
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1.4rem;
        margin-left: 0.2cm;
        
    }
    span > span{
        display: inline;
        font-size: 1.4rem;
    }
    div{
        height: 100%;
        aspect-ratio: 1 / 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img{
        height: ${props => props.active ? '40%' : '20%' };
        aspect-ratio: 1 / 1;
    }
`


export const CalendarFilter = ({filter, setFilter}) => {
    

    return(
        <Box>
            <Header><span>Filters</span></Header>
            <Main>
                
                <FilterBox desc='All' name='all' filter={filter} setFilter={setFilter}/>
                <FilterBox desc='Available' name='available' filter={filter} setFilter={setFilter}/>
                <FilterBox desc='Reserved' name='taken' filter={filter} setFilter={setFilter}/>
                <FilterBox desc='Within Period' name='period' filter={filter} setFilter={setFilter}/>
                <FilterBox desc='After Period Start' name='start' filter={filter} setFilter={setFilter}/>
                <FilterBox desc='Before Period End' name='end' filter={filter} setFilter={setFilter}/>
            </Main>
        </Box>
    )
}

const FilterBox = ({name, desc, filter, setFilter}) => {

    return(
        <StyledItem active={ filter === name} onClick={() => setFilter(name)}>
            <span>{desc}</span>
            <div>
                <img src={ filter === name ? circle : dot} alt='' />
            </div>
        </StyledItem>
    )
}

