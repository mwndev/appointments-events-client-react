import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { UserContext } from '../contexts/UserContext'
import { BoxHeaderText, MidBoxText, SmallerBoxText } from '../styledComponents/styledComponents1'
import emailIcon from '../svgs/email.svg'
import signature from '../svgs/signature.svg'
import check from '../svgs/check.svg'
import dots from '../svgs/dots.svg'



const TextInput = styled.input`
  height: 1cm;
  width: 10cm;
  border: ${((props) => props.theme.bthk)};
  background-color: ${props => props.theme.ic5};

`
const MessageArea = styled.div`
  width: 10cm;
  display: ${props => props.pwsMatch ? 'none' : 'block' };
`
const UserBox = styled.div`
  height: ${props => props.theme.boxHeightL};
  aspect-ratio: 7 / 9;
  border: ${props => props.theme.bthk};
  display: grid;
  grid-template-rows: 20% repeat(6, 1fr);
  gap: 0.4cm;


`
const DetailFlexWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: ${props => props.row} / -2;
  input{
    height: calc(20px + 4vh);
  }
`

const ImgWrapper = styled.div`
  height: 80%;
  max-height: 80%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    height: 75%;
    aspect-ratio: 1 / 1;
  }
  
`

const DetailWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: ${props => props.row} / span 1;
  input{
    height: 80%;
    width: 60%;
    font-size: 1.3em;
    outline: none;
  }
`
const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.7cm;
`

const Header = styled.div`
  height: 102%;
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1 / span 1;
  background-color: ${props => props.newUser ? props.theme.ic5 : props.theme.ic3};
  border: ${props => props.newUser ? props.theme.bthk : 'none'};
  cursor: pointer;
`
const Confirm = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.ic5};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: ${props => props.theme.bthk};
  cursor: pointer;
  &:hover{
    background-color: ${props => props.theme.hc3};
  }
`



export default function User() {
  const [lastName, setLastName] = useState()
  const [lastNameValid, setLastNameValid] = useState()
  const [firstName, setFirstName] = useState()
  const [fnV, setFnV] = useState()
  const [email, setEmail] = useState()
  const [emailValid, setEmailValid] = useState()
  const [passCon, setPassCon] = useState()
  const [passConValid, setPassConValid] = useState()
  const [password, setPassword] = useState()
  const [passwordV, setPasswordV] = useState()
  const [pwsMatch, setMatch] = useState()
  const [newUser, toggleNewUser] = useState(false)

  const {user, setUser} = useContext(UserContext)

  //useEffect(() => {
  //  setMatch(passCon === password)
  //}, [password, passCon])

  const createUser = async(adrs, fn, ln, pw ) => {

    const JSONbody = JSON.stringify({
      email: adrs,
      firstName: fn,
      lastName: ln,
      password: pw,
    })
    const res = await fetch('http://localhost:5040/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONbody,
    })
  }

  const authenticateUser = async(adrs, pw) => {
    //! THIS IS COMPLETELY UNSECURED IF HTTP REQUEST DOESN'T GO THROUGH HTTPS
    const JSONbody = JSON.stringify({
      email: adrs,
      password: pw,
    })

    const res = await fetch('http://localhost:5040/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
       },
       body: JSONbody,
    })
  }


  const emailValidation = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  const nameValidation = new RegExp('[a-z]{1, 40}')
  const passwordValidation = new RegExp('')


  const handleEmail = e => {
    setEmail(e.target.value)
    console.log(e.target)
    console.log(email)
    
  }
  const handleFirstName = e => {
    if(nameValidation.test(e.target.value)){

    }
  }
  const handleLastName = e => {
      setLastNameValid(nameValidation.test(e.target.value))
      setLastName(e.target.value)
  }
  const handlePw = e => {
    setPassword(e.target.value)
    if(passwordValidation.test(e.target.value)){
      setPasswordV(true)
    }
    else{
      setPasswordV(false)
    }
  }
  const handleCPw = event => {
    console.log('hiee')
    setPassCon(event.target.value)
  }
  useEffect(() => console.log('register has rerendered'))

  const EnterRegisterCredentials = () => {
    return(
      <>

      <DetailWrapper row={2}>
        <input type={'text'} placeholder={'email'} onChange={(e) => handleEmail(e)}/>
        <ImgWrapper><img src={emailValid ? check : dots} /></ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={3}>
        <input type={'text'} placeholder={'first name'} onChange={(e) => setFirstName(e.target.value)}/>
        <ImgWrapper>
          <img src={firstName}/>
        </ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={4}>
        <input type={'text'} placeholder={'last name'} onChange={(e) => handleLastName(e)}/>
        <ImgWrapper><img src={dots} /></ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={5}>
        <input type={'password'} placeholder={'password'} onChange={(e) => handlePw(e)}/>
        <ImgWrapper><img src={emailIcon} /></ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={6}>
        <input type={'password'} placeholder={'confirm password'} onChange={((e) => handleCPw(e))}/>
        <ImgWrapper><img src={passConValid ? check : dots} /></ImgWrapper>
      </DetailWrapper>
      

      </>

    )
  }
  const EnterLoginCredentials = () => {
    return(
      <>
      <DetailWrapper row={3}>
        <input type={'text'} placeholder={'email'} onChange={(e) => (e) => setEmail(e.target.value)}/>
      </DetailWrapper>

      <DetailWrapper row={5}>
        <input type={'password'} placeholder={'password'} onChange={(e) => e => setPassword(e.target.value)}/>
      </DetailWrapper> 
      </>
    )

  }

  const EnterCredentials = () => {

    return(
      <>
      <UserBox>
      <HeaderWrapper>

        <Header newUser={!newUser} onClick={() => toggleNewUser(false)}>
          <BoxHeaderText>Login</BoxHeaderText>
        </Header>
        <Header newUser={newUser} onClick={() => toggleNewUser(true)}>
          <BoxHeaderText >Register</BoxHeaderText>
        </Header>
      </HeaderWrapper>


      {newUser ? <EnterRegisterCredentials /> : <EnterLoginCredentials />}

      <DetailWrapper row={7}>
        <Confirm onClick={() => newUser ? createUser() : authenticateUser(email, password)}>
          <MidBoxText>
            Confirm
          </MidBoxText>
        </Confirm>
      </DetailWrapper>
      </UserBox>
      <button onClick={() => console.log(email)}>email click here</button>
      </>
    )
  
  }





  return (
    <>
    <EnterCredentials  />
    
    </>
  )
}



