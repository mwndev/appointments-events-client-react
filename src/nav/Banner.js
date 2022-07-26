import React from 'react';
import styled from 'styled-components'
import Menu from './Menu';
import Middle from './Middle'
import Socials from './Socials';

const StyledBanner = styled.header`
    height: calc(2cm + 1vh);
    background-color: ${props => props.theme.c3};
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow:  0 0 1cm ${props => props.theme.c1};
    margin-bottom: 1.8cm;



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