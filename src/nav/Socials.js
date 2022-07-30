import React, {useState} from 'react'
import facebook from '../svgs/facebook.svg'
import instagram from '../svgs/instagram.svg'
import styled from 'styled-components'
import facebookgreen from '../svgs/facebookgreen.svg'
import instagramgreen from '../svgs/instagramgreen.svg'

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

`
const openInsta = () => {
    window.open('https://instagram.com')
}
const openZucc = () => {
    window.open('https://facebook.com')
}


export default function Socials() {

    const [src, setSrc] = useState({f: facebook, ig: instagram})


  return (
    <StyledSocials>
        <img onClick={openInsta} src={src.ig} alt="instagram" onMouseOver={() => setSrc({f: facebook, ig: instagramgreen})} onMouseLeave={() => setSrc({f: facebook, ig: instagram})}/>
        <img onClick={openZucc} src={src.f} alt='facebook'  onMouseOver={() => setSrc({f: facebookgreen, ig: instagram})} onMouseLeave={() => setSrc({f: facebook, ig: instagram})}/>
    </StyledSocials>
  )
}
