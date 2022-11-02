import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import github from './svgs/github.svg'
import githubgreen from './svgs/githubgreen.svg'

const OuterWrapper = styled.div`
@media only screen and (max-width: 800px) {
    display: none !important;
}
    height: calc(2cm + 1vh);
    width: 100%;
    background-color: ${props => props.theme.c3};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${props => props.messageBelowBanner === undefined ?  '0 0 0.5cm' + props.theme.ic7 : 'none'};
    margin-bottom: 1.8cm;
    a{
        margin: 3vw;
        padding: 0.4cm 0.2cm;
        color: #000;
        text-decoration: none;
        flex-shrink: 0;
        font-size: 1.1em;
        cursor: pointer;
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

  const [gh, setgh] = useState(github)

  const ghLink = process.env.REACT_APP_GH_LINK

  return (
    <OuterWrapper>
        {links.map((link) => (
            <Link to={link[0]} key={uuidv4()}>
                {link[1]}
            </Link>
            ))}
        <SocialIcon onClick={() => window.open(ghLink || 'set env variable')}
        src={gh} 
        alt="github" 
        onMouseOver={() => setgh(githubgreen)} 
        onMouseLeave={() => setgh(github)}/>
    </OuterWrapper>
    
  )
}

