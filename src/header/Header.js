import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import facebook from '../svgs/facebook.svg'
import instagram from '../svgs/instagram.svg'
import facebookgreen from '../svgs/facebookgreen.svg'
import instagramgreen from '../svgs/instagramgreen.svg'
import { v4 as uuidv4 } from 'uuid'

const OuterWrapper = styled.div`
    height: calc(2cm + 1vh);
    background-color: ${props => props.theme.c3};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${props => props.messageBelowBanner === undefined ?  '0 0 0.5cm' + props.theme.ic7 : 'none'};
    margin-bottom: 1.8cm;
    a{
        color: #000;
        text-decoration: none;
        padding: 0.4cm 0.2cm;
        flex-shrink: 0;
        font-size: 1.1em;
        cursor: pointer;
        margin: 1cm;
        border-bottom: 0.08cm solid ${props => props.theme.c3};
        flex-shrink: 1;
        font-weight: 500;
        display: ${props => props.messageBelowNav !== undefined ? 'none' : 'flex'};
        transition: 0.5s;
        white-space: nowrap;
    }
    a:hover{
        border-bottom: 0.08cm solid ${props => props.theme.ic6};
    }
`
   
const SocialIcon = styled.img`
    height: 70%;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    padding: 0.1cm;
    border-radius: 0.2cm;
    margin: 0 0.3cm;
`

export const Header = ({ links, messageBelowBanner }) => {

    const [src, setSrc] = useState({f: facebook, ig: instagram})




  return (
    <OuterWrapper>
        {links.map((link) => (
            <Link to={link[0]} key={uuidv4()}>
                {link[1]}
            </Link>
            ))}
        <SocialIcon onClick={() => window.open('https://instagram.com')} src={src.ig} alt="instagram" onMouseOver={() => setSrc({f: facebook, ig: instagramgreen})} onMouseLeave={() => setSrc({f: facebook, ig: instagram})}/>
        <SocialIcon onClick={() => window.open('https://facebook.com')} src={src.f} alt='facebook'  onMouseOver={() => setSrc({f: facebookgreen, ig: instagram})} onMouseLeave={() => setSrc({f: facebook, ig: instagram})}/>
    </OuterWrapper>
    
  )
}

