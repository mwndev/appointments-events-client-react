import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import discord from '../svgs/discord.svg'
import discordA from '../svgs/discordA.svg'
import telegram from '../svgs/telegram.svg'
import telegramA from '../svgs/telegramA.svg'
import phone from '../svgs/phone.svg'
import phoneA from '../svgs/phoneA.svg'
import gmail from '../svgs/gmail.svg'
import gmailA from '../svgs/gmailA.svg'
import github from '../svgs/github.svg'
import githubA from '../svgs/githubA.svg'
import openNT from '../svgs/openNT.svg'
import copy from '../svgs/copy.svg'
import copied from '../svgs/copied.svg'

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
    width: 10cm;
    gap: 0.5cm;
    span{
        font-size: 1.4em;
        min-width: calc(5cm + 100px);
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
    const [cT, setCT] = useState('')
    const [dA, sDA] = useState(false)
    const [tA, sTA] = useState(false)
    const [pA, sPA] = useState(false)
    const [mA, sMA] = useState(false)
    const [gA, sGA] = useState(false)

    
    const [dMsg, sDMsg] = useState(false)
    const [tMsg, sTMsg] = useState(false)
    const [pMsg, sPMsg] = useState(false)
    const [mMsg, sMMsg] = useState(false)
    const [gMsg, sGMsg] = useState(false)

    return(
        <PageWrapper >
            <Row onMouseOver={() => sDA(true)} onMouseLeave={() => sDA(false)}>
                <FirstIcon src={dA ? discordA : discord} alt="Discord:" />
                <span>Userman#0000</span>
                <SecondIcon src={ cT==='Userman#0000' ? copied :copy} alt="copy" 
                    onClick={() => {
                        console.log(dMsg)
                        navigator.clipboard.writeText('Userman#0000') 
                        sDMsg(true)
                        setTimeout(() => sDMsg(false), 1000)
                    }}
                />
                <HoverMsg show={dMsg} >Copied!</HoverMsg>
            </Row>
            <Row onMouseOver={() => sTA(true)} onMouseLeave={() => sTA(false)}>
                <FirstIcon src={tA ? telegramA : telegram} alt="Discord:" />
                <span>[telegram username]</span>
                <SecondIcon src={copy} onClick={() => console.log('stuff')} alt="copy"/>
            </Row>
            <ContactRow icon={discord} iconA={discordA} text={'Userman#0000'}/>
            <ContactRow icon={telegram} iconA={telegramA} text={'Name Firstname'}/>
            <ContactRow icon={gmail} iconA={gmailA} text={'private@gmail.com'}/>
            <ContactRow icon={phone} iconA={phoneA} text={'(+41)629 109 927 28'}/>
            <Row onMouseOver={() => sPA(true)} onMouseLeave={() => sPA(false)}>
                <FirstIcon src={pA ? phoneA : phone} alt="Discord:" />
                <span>(+41)629 109 927 28</span>
                <SecondIcon src={copy} onClick={() => console.log('stuff')} alt="copy"/>
            </Row>
            <Row onMouseOver={() => sMA(true)} onMouseLeave={() => sMA(false)}>
                <FirstIcon src={mA ? gmailA : gmail} alt="Discord:" />
                <span>joerogan@podcast.com</span>
                <SecondIcon src={copy} onClick={() => console.log('stuff')} alt="copy"/>
            </Row>
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