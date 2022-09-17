import React, {useState, useEffect, useContext} from "react"
import styled from "styled-components"
import circle from '../../svgs/circle.svg'
import dot from '../../svgs/dot.svg'


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
    justify-content: space-between;
    cursor: pointer;
    background-color: ${props => props.active  ? props.theme.hc1 : 'inherit'};

    span{
        height: 1cm;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        margin-left: 0.5cm;
    }
    span > span{
        font-size: 1.4rem;
    }
    div{
        height: 1cm;
        aspect-ratio: 1 / 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img{
        height: ${props => props.active ? '50%' : '40%' };
        aspect-ratio: 1 / 1;
    }
    
`


//available taken all period
export const CalendarFilter = ({filter, setFilter}) => {
    

    return(
        <Box>
            <Header><span>Highlight</span></Header>
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
                <img src={ filter === name ? circle : dot} />
            </div>
        </StyledItem>
    )
}

