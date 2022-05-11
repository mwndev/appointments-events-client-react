import React from 'react'
import facebook from '../svgs/facebook.svg'
import instagram from '../svgs/instagram.svg'
import styled from 'styled-components'
import { faWindowAlt } from '@fortawesome/pro-duotone-svg-icons'

const StyledSocials = styled.div`
    width: ${props => props.theme.narrowness};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90%;
    
    img{
        height: 70%;
        aspect-ratio: 1 / 1;
        cursor: pointer;
        padding: 0.1cm;
        border-radius: 0.2cm;
        margin: 0 0.3cm;
    }
    img:hover{
        border: 0.07cm solid ${props => props.theme.tc1};

    }

`
const openInsta = () => {
    window.open('https://instagram.com')
}
const openZucc = () => {
    window.open('https://facebook.com')
}

export default function Socials() {
  return (
    <StyledSocials>
        <img onClick={openInsta} src={instagram} alt="instagram" />
        <img onClick={openZucc} src={facebook} alt='facebook' />
    </StyledSocials>
  )
}
