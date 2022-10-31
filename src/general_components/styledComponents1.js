import styled from "styled-components";


export const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-shrink: 0;
    flex-wrap: wrap;
    gap: ${props => props.gap};
`

export const FlexContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
`
export const PageWrapper = styled.div`
    //display: flex;
    //justify-content: space-evenly;
    //align-items: center;
    padding-bottom: 2cm;
`

export const SectionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding-top: 1cm;
    h2{
        font-family: inherit;
        font-weight: 400;
        font-size: 1.7em;

        span{
            background-color: ${props => props.theme.ic4};
        }
    }
`

export const SmallBox = styled.div`
    aspect-ratio: 7 / 8;
    height: calc(160px + 26vh);
    border: ${props => props.theme.bgrid};
    gap: 0.1cm;
    margin: 1cm;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(6, 1fr);
    padding-bottom: 0.4cm !important;
`
export const SmallBoxHeader = styled.div`
    border-bottom: 3px solid ${props => props.theme.tc};
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    background-color: ${props => props.theme.ic4};
    span{
        font-weight: 500;
        font-size: 1.3em;
    }
    
`
export const BoxBody= styled.div`
    width: calc(100% + 2px);
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
    padding: 0.2cm;
`
export const AppointmentContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 0.3cm 0.3cm 0 0.3cm;
    grid-column: 1 / -1;
    grid-row: ${props => props.index + 2} / ${props => props.index + 3};
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledItem = styled.div`
    height: 100%;
    width: 100%;
    border: 3px solid ${props => props.theme.tc};
    display: flex;
    align-items: center;
    justify-content: right;
    cursor: pointer;
    background-color: ${props => props.isActive  ? props.theme.hc1 : 'inherit'};

    span{
        width: 5cm;
        height: 1cm;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
    }
    span > span{
        display: inline;
        font-size: 1.4rem;
    }
    div{
        height: 1cm;
        aspect-ratio: 1 / 1;
        border-left: 3px solid ${props => props.theme.tc};
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img{
        height: 60%;
        aspect-ratio: 1 / 1;
    }
`
export const ButtonWrapper = styled.div`
    width: ${props => props.theme.boxHeight};
    aspect-ratio: 12 / 5.5;
    border: ${props => props.theme.bgrid};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 1cm;
    padding: 0.3cm;
`
export const CommandsWrapper = styled.div`
    width: 40vw;
    justify-content: center;
    align-items: center;
    display: flex;

`

export const ImportantButton = styled.div`
    border: ${props => props.theme.bgrid};
    border-radius: 0%;
    background-color: ${props => props.theme.ic9};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    flex-grow: 1;
    max-width: 40%;
    padding: 0;
    margin: 0.2cm 0.3cm ;
    cursor: pointer;
    width: 40%;
    height: 30%;
    span{
        color: ${props => props.theme.c3};
        font-weight: 400;
        font-size: 1.15em;

    }
    &:hover{
        background-color: ${props => props.theme.hc7};
    }
`
export const LargeBox = styled.div`
    aspect-ratio: 13 / 10;
    height: ${props => props.theme.boxHeight};
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;
    display: grid;
    grid-template: repeat(7, 1fr) / repeat(9, 1fr);

`
export const LargeBoxHeader = styled.div`
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    span{
        font-weight: 500;
        font-size: 1.7em;
    }
`


export const BoxHeaderText = styled.span`
    font-size: 1.8rem;
    font-weight: 400;
`
export const MidBoxText = styled.span`
    font-size: 1.38em;
    font-weight: 500;
`
export const SmallerBoxText = styled.span`
    font-size: 1.3em;
    font-weight: 500;
`