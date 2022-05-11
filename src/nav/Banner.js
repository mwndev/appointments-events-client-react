import React from 'react';
import styled from 'styled-components'
import Menu from './Menu';
import Middle from './Middle'
import Socials from './Socials';

const StyledBanner = styled.header`
    height: calc(2cm + 1vh);
    background-color: ${props => props.theme.c1};
    display: flex;
    align-items: center;
    justify-content: space-between;



`
// link[0] is the route, link[1] is the name
const Banner = ({links}) => {
    return(
        <StyledBanner>
        <Menu />
        <Middle links={links}/>
        <Socials />
        </StyledBanner>
    )
}

export default Banner