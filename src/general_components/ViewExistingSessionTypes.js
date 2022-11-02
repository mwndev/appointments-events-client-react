import React, { useState } from "react"
import styled from "styled-components"
import sGIIcon from '../svgs/infothin-green.svg'
import sIIcon from '../svgs/infothin.svg'
import redx from '../svgs/red-x.svg'
import x from '../svgs/x.svg'
import { BoxHeaderText } from "./styledComponents1"

let greenInfoIcon 
let infoIcon
greenInfoIcon = sGIIcon
infoIcon = sIIcon


const Box = styled.div`
    box-shadow: 0 0 0.3cm grey;
    margin: 1cm;
    height: ${props => props.height};
    max-height: ${props => props.height};
    aspect-ratio: 7 / 7;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    grid-auto-rows: 1fr;
    border: ${props => props.theme.bgrid};


    ::-webkit-scrollbar{
        width: 10%;
        background-color: blue;
    }
    ::-webkit-scrollbar-thumb{
        background: ${props => props.theme.ic6};

    }
    ::-webkit-scrollbar-track{
        background-color: ${props => props.theme.c3};
    }
    header{
        grid-column: 1 / 2;
        margin-bottom: 0.2cm;
        background-color: ${props => props.theme.ic4 };
    }
`
const SessionType = styled.div`
    border: ${props => props.theme.bgrid};
    height: 15%;
    width: 100%;
    background-color: ${props => props.selectedST === props.thisType ? props.theme.hc2 : 'inherit'};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.3cm 0;
    cursor: pointer;
    section{
        height: 50%;
        width: 80%;
        padding: 0.1cm;
    }
    span{
        height: 90%;
        display: flex;
        justify-content: left;
        align-items: center;
        flex-grow: 1;

    }
    span > span{
        font-size: 1.4em;
        margin-left: 0.2cm;
    }
    img{
        height: 60%;
        margin-right: 0.3cm;
        aspect-ratio: 1 / 1;
        cursor: pointer;
    }
`
const BoxHeader = styled.div`
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${props => props.theme.ic4};
    border-bottom: ${props => props.theme.bgrid};
`

const BoxMain = styled.div`
    //scrollbar is 0.5vw
    padding: 0 ${navigator.userAgent.match(/firefox|fxios/i) ? '0.3cm 0.2cm' : '0.1cm 0'} calc(0.1cm + 0.5vw);
    height: 85%;
    width: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar{
    }
    /* ::-webkit-scrollbar-track{
        display: none;
    } */
`

const STDescription = styled.div`
    height: 96%;
    width: 92%;
    max-width: calc(160px + 20vh);
    margin: 0.2cm auto;
    border: ${props => props.theme.bgrid};
    position: relative;
    img{
        height: 1cm;
        aspect-ratio: 1 / 1;
    }

`
const STHeader = styled.div`
    width: 100%; 
    height: 16%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.2cm;
    border-bottom: ${props => props.theme.bgrid};
    background-color: ${props => props.theme.ic3};
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        span{
            font-size: 1.8em;
            font-weight: 400;
            color: ${props => props.theme.tc};
 
        }
    }
    section{
        height: 100%;
        aspect-ratio: 1 / 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img{
        height: 55%;
        aspect-ratio: 1 / 1;
        cursor: pointer;
    }
`
const STBody = styled.section`
    font-size: 1.3em;
    section{
        white-space: normal;
        padding: 0.2cm 0.3cm;
        max-height: 
        
    }
`




export const ViewExistingSessionTypes = ({height, parentSTs, selectedST, setSelectedST, activeST, setActiveST}) => {

    const [sourceX, setSourceX] = useState(x)
    const [sourceInfo, setSourceInfo] = useState('')



    return(
        <>
        <Box height={height}>
            <BoxHeader onClick={() => console.log(activeST)}>
                <BoxHeaderText>Session Types</BoxHeaderText>
            </BoxHeader>
            <BoxMain>

            {
            activeST === null ?
                parentSTs.map((item, index) =>  (
                    <SessionType selectedST={selectedST} thisType={item} index={index} key={index}>
                        <span onClick={() => item === selectedST ? setSelectedST(null) : setSelectedST(item)}><span>{item.name}</span></span>
                        <img  onClick={() => setActiveST(item)} src={item === sourceInfo ? greenInfoIcon : infoIcon} onMouseOver={() => setSourceInfo(item)} onMouseLeave={() => setSourceInfo('')} alt='i'/>
                    </SessionType>
                    )
                ) : 
                <STDescription>
                    <STHeader><div><span>{activeST.name}</span></div>
                    <section>
                        <img onClick={() => setActiveST(null)} src={sourceX} onMouseOver={() => setSourceX(redx)} onMouseLeave={() => setSourceX(x)} alt='x'/>
                    </section>
                    </STHeader>
                    <STBody>

                    <section> {activeST.description}</section>
                    <section>
                        Number of clients: &nbsp;
                        {activeST.participants.min === activeST.participants.max ? activeST.participants.min : `${activeST.participants.min} - ${activeST.participants.max}`}
                    </section>
                    <section>
                        Price:&nbsp;
                        {activeST.price}$
                    </section>
                    </STBody>

                </STDescription>
            }
            </BoxMain>
        </Box>
        </>
    )
}