import React, {useState} from 'react'
import styled from 'styled-components'

const LargeBox = styled.div`
    aspect-ratio: 11 / 10;
    height: ${props => props.height === 'default' ? props.theme.boxHeight : props.height};
    max-height: ${props => props.height === 'default' ? props.theme.boxHeight : props.height};
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;
    display: grid;
    grid-template: repeat(6, 1fr) / repeat(10, 1fr);
    grid-gap: 0.2cm;
    textarea{
        border: none;
        grid-column: 1 / -1;
        grid-row: 2 / -1;
        margin: 0 0.5cm 0.5cm 0.5cm;
        font-family: inherit;
        font-size: 1.3em;
    }
    textarea:focus{
        outline: none;
    }
`

const LargeBoxHeader = styled.div`
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    margin-bottom: 0.2cm;
    span{
        font-weight: 500;
        font-size: 1.7em;
    }
`

export default function TextareaBox({title, parentSetState, height}) {

    const handleDesc = event => {
        parentSetState(event.target.value)
    }


    return (
        <LargeBox height={height}>
            <LargeBoxHeader>
                <span>
                    {title}
                </span>
            </LargeBoxHeader>
            <textarea placeholder="enter here" type={'text'} onChange={(e) => handleDesc(e)}/>
        </LargeBox>
  )
}
