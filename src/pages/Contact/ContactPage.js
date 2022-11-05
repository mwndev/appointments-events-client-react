import React, { useState } from "react";
import styled from "styled-components";
import copy from '../../svgs/copy.svg';
import discord from '../../svgs/discord.svg';
import discordA from '../../svgs/discordA.svg';
import gmail from '../../svgs/gmail.svg';
import gmailA from '../../svgs/gmailA.svg';
import phone from '../../svgs/phone.svg';
import phoneA from '../../svgs/phoneA.svg';
import telegram from '../../svgs/telegram.svg';
import telegramA from '../../svgs/telegramA.svg';

const PageWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 50vh;
    gap: 0.5cm;
    margin-top: 0.8cm;
`

const Row = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    height: 1.7cm;
    width: 12cm;
    span{
        font-size: 1.4em;
        min-width: calc(6cm + 108px);
        flex-grow: 1;
        padding-left: 0.5cm;
    }
`
const FirstIcon = styled.img`
        height: 70%;
        aspect-ratio: 1 / 1;
`

const SecondIcon = styled.img`
        height: 27%;
        aspect-ratio: 1 / 1;
        cursor: pointer;
        
`
const HoverMsg = styled.section`
    transition: ${props => props.show ? '2s' : '0.1s' };
    display: ${props => props.show ? 'inline-block' : 'none'};
    border: ${props => props.theme.bthn};
    padding: 0.1cm;
    background-color: #fff;
    z-index: 1;
`


const Contact = () => {

    const dsc = process.env.REACT_APP_DSC
    const tel= process.env.REACT_APP_TEL
    const mail = process.env.REACT_APP_MAIL
    const phn = process.env.REACT_APP_PHONE
    
    return(
        <PageWrapper >
            <ContactRow icon={discord} iconA={discordA} text={dsc || 'set env variable'}/>
            <ContactRow icon={telegram} iconA={telegramA} text={tel|| 'set env variable'}/>
            <ContactRow icon={gmail} iconA={gmailA} text={mail|| 'set env variable'}/>
            <ContactRow icon={phone} iconA={phoneA} text={phn|| 'set env variable'}/>
        </PageWrapper>
    )
}
export default Contact

const ContactRow = ({icon, iconA, text}) => {

    const [gA, sGA] = useState(false)
    const [sM, setSM] = useState(false)

    return(

        <Row onMouseOver={() => sGA(true)} onMouseLeave={() => sGA(false)}>
            <FirstIcon src={gA ? iconA : icon} alt="Discord:" />
            <span>{text}</span>
            <SecondIcon 
                src={ copy }
                alt="copy" 
                onClick={() => {
                    navigator.clipboard.writeText(text) 
                    setSM(true)
                    setTimeout(() => setSM(false), 1000)
                }}
            />
            <HoverMsg show={sM} >Copied!</HoverMsg>
        </Row>
    )
}