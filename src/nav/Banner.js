import React from 'react';
import styled from 'styled-components';
import Middle from './Middle';
import Socials from './Socials';

const StyledBanner = styled.header`
    height: calc(2cm + 1vh);
    background-color: ${props => props.theme.c3};
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${props => props.messageBelowBanner === undefined ?  '0 0 0.5cm' + props.theme.ic7 : 'none'};
    margin-bottom: 1.8cm;
`
const StyledMessage = styled.div`
    background-color: ${props => props.theme.ic7};
    display:  ${props => props.messageBelowBanner === undefined ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    span{
        font-size: 0.8rem;
        font-style: ${props => props.theme.ic9};
    }
`
// link[0] is the route, link[1] is the name
const Banner = ({links, messageBelowBanner}) => {
    return(
        <>
        <StyledBanner>
        <Middle links={links}/>
        <Socials />
        </StyledBanner>
        <StyledMessage messageBelowBanner={messageBelowBanner}>
            <span>
                {messageBelowBanner}
            </span>
        </StyledMessage>

        </>
    )
}

export default Banner