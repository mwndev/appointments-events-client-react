import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledMiddle = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    flex-grow: 1;
    a{
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${props => props.theme.tc1};
      text-decoration: none;
      height: 60%;

    }
    div > a{
      padding: 0.4cm 0.2cm;
      flex-shrink: 0;
      font-size: 1.1em;
      cursor: pointer;
      margin: 1rem;
      border-bottom: 0.08cm solid ${props => props.theme.c3};
      flex-shrink: 1;
      font-weight: 500;
      display: ${props => props.messageBelowNav !== undefined ? 'none' : 'flex'};
      transition: 0.5s;
    }
    div > a:hover{
      border-bottom: 0.08cm solid ${props => props.theme.ic6};
    }
    div{
      width: 90%;
      height: 30%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border-radius: 5%;
    }
  `

    const Name = styled.h1`
      margin: none;
      display: inline-block;
      height: 100%;
      cursor: pointer;
    
    `

// link[0] is the route, link[1] is the name
export default function Middle({links}) {
  return (
    <StyledMiddle>
     <div>
        {links.map((link) => (<Link to={link[0]} key={link[0]}>{link[1]}</Link>))}
      </div>

    </StyledMiddle>
  )
}
