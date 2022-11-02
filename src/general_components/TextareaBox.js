import React from 'react'
import styled from 'styled-components'
import { BoxHeaderText } from './styledComponents1'

const LargeBox = styled.div`
    box-shadow: 0 0 0.3cm grey;
    aspect-ratio: 11 / 10;
    height: ${props => props.height === 'default' ? props.theme.boxHeight : props.height};
    max-height: ${props => props.height === 'default' ? props.theme.boxHeight : props.height};
    border: ${props => props.theme.bgrid};
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
        resize: none;
    }
    textarea:focus{
        outline: none;
    }
`

const LargeBoxHeader = styled.div`
    border-bottom: ${props => props.theme.bgrid};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    margin-bottom: 0.2cm;
`

export default function TextareaBox({title, parentSetState, height}) {

    const handleDesc = event => {
        parentSetState(event.target.value)
    }


    return (
        <LargeBox height={height}>
            <LargeBoxHeader>
                <BoxHeaderText>
                    {title}
                </BoxHeaderText>
            </LargeBoxHeader>
            <textarea placeholder="enter here" type={'text'} onChange={(e) => handleDesc(e)}/>
        </LargeBox>
  )
}
