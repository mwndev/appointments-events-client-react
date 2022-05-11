import React from 'react'
import styled from 'styled-components'
import menuIcon from '../svgs/menu.svg'


const StyledMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10vw;
    height: 90%;
    img{
      height: 60%;
      aspect-ratio: 1 / 1;
      margin-right: 5vw;
      cursor: pointer;

    }
    
`

export default function Menu() {
  return (
    <StyledMenu>
    <img src={menuIcon} alt='opcje'/>
    </StyledMenu>
  )
}
