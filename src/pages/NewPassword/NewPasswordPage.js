import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { backendURL, thisURL } from "../../App";
import { WindowAlertContext } from "../../contexts/WindowAlertContext";
import { SectionWrapper } from "../../general_components/styledComponents1";
import check from '../../svgs/check.svg';
import dots from '../../svgs/dots.svg';

const Icon = styled.img`
    height: 1cm;
    aspect-ratio: 1 / 1;
`
const Input = styled.input`
    height: 1cm;
    width: 8cm;
    font-size: 1.3em;
`
const Confirm = styled.div`
  height: 1cm;
  width: 8cm;
  background-color: ${props => props.theme.ic5};
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${props => props.theme.bthk};
  cursor: pointer;
  &:hover{
    background-color: ${props => props.theme.hc3};
  }
`

const HoverMsg = styled.span`
    display: ${props => props.show ? 'inline-block' : 'none'};
    border: ${props => props.theme.bthn};
    padding: 0.1cm;
    position: absolute;
    top: ${props => props.y + 'px'};
    left: ${props => props.x + 'px'};
    background-color: #fff;
    z-index: 1;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4cm;
    gap: 0.3cm;
    section{
        height: 1cm;
        aspect-ratio: 1 / 1;
    }
`


export const NewPassword = () => {

    const [data, setData] = useState({pw: '', cpw: '', match: false, valid: false, showCPW: false, showPW: false,})

    const {tokenid} = useParams()
    const {windowAlert} = useContext(WindowAlertContext)

    //fix
    const passwordValidation = new RegExp('[a-z]')

    const handlePW = (e) => {
        setData(prev => {
            return{...prev, pw: e.target.value, match: e.target.value === prev.cpw, valid: passwordValidation.test(e.target.value)}
        })
    }
    const handleCPW = (e) => {
        setData(prev => {
            return{...prev, cpw: e.target.value, match: e.target.value === prev.pw }
        })
    }

    const handlePWIcon = (e) => {
        setData(prev => {
            return { ...prev, x: e.pageX, y: e.pageY, showPW: true }
        })
    }
    const handleCPWIcon = (e) => {
        setData(prev => {
            return { ...prev, x: e.pageX, y: e.pageY, showCPW: true }
        })
    }


    const confirmPassword = async () => {
        const res = await fetch(`${backendURL}/forgot/${tokenid}`, {  method: 'POST', headers: {"Content-Type" : "application/json"}, body: JSON.stringify({ password: data.pw }),}) 
        const jres = await res.json()

        if(res.status === 400) if( window.confirm(jres.msg) ) return window.open(`${thisURL}/user`, '_self') 

        if(jres.updated  === null) {
            const res = await fetch(`${backendURL}/forgot/${tokenid}`, {  
                method: 'POST', 
                headers: {"Content-Type" : "application/json"}, 
                body: JSON.stringify({ 
                    description: 'the reset password link did not work',
                    details: {
                        res: jres,
                        url: window.location.href,
                    } 
                })
            })
            return windowAlert('something went wrong. The developer has been notified')
        }
        console.log(jres.updated)



        windowAlert('Password successfully updated!')

        localStorage.setItem('JMUDUYPTPW', data.pw)

        window.open(`${backendURL}/user`, '_self') 

    }


    return(
        <SectionWrapper>
            <h2>Enter and repeat your <span>new password</span></h2>
            <Wrapper>
                <Input type={'password'} onChange={(e) => handlePW(e)}/>
                <Icon  src={ data.valid ? check : dots} onMouseOver={(e) => handlePWIcon(e)} onMouseLeave={() => setData(prev => { return { ...prev, showPW: false } })}/>
                <HoverMsg show={data.showPW} x={data.x} y={data.y}>Choose a secure password</HoverMsg>
            </Wrapper>

            <Wrapper>
                <Input type={'password'} onChange={(e) => handleCPW(e)} />
                <Icon  src={ data.match ? check : dots} onMouseOver={(e) => handleCPWIcon(e)} onMouseLeave={() => setData(prev => { return { ...prev, showCPW: false } })}/>
                <HoverMsg show={data.showCPW} x={data.x} y={data.y}>Passwords must match</HoverMsg>
            </Wrapper>
            <Wrapper>
                <Confirm onClick={() => confirmPassword()}>confirm</Confirm>
                <section></section>
            </Wrapper>
        </SectionWrapper>
    )
}
