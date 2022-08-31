import React, {useContext} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const StyledMiddle = styled.div`
    max-width: 60%;
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
      margin: 1cm;
      border-bottom: 0.08cm solid ${props => props.theme.c3};
      flex-shrink: 1;
      font-weight: 500;
      display: ${props => props.messageBelowNav !== undefined ? 'none' : 'flex'};
      transition: 0.5s;
      white-space: nowrap;
    }
    div > a:hover{
      border-bottom: 0.08cm solid ${props => props.theme.ic6};
    }
    div{
      width: 100%;
      height: 30%;
      display: flex;
      align-items: center;
      justify-content: left;
      border-radius: 5%;
      padding-left: 2cm;
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

  const { user } = useContext(UserContext)

  return (
    <StyledMiddle>
     <div>
        {links.map((link) => (<Link to={link[0]} key={link[0]}>{link[1]}</Link>))}
        <Link to='/user' key={'user'}>user</Link>
      </div>

    </StyledMiddle>
  )
}
