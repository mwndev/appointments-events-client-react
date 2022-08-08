import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { UserContext } from '../contexts/UserContext'
import { BoxHeaderText, SmallerBoxText } from '../styledComponents/styledComponents1'



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
  grid-template-rows: 15% repeat(6, 1fr);
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

const DetailWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: ${props => props.row} / span 1;
  div{
    height: 40%;
  }
  input{
    height: 60%
  }
`
const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Header = styled.div`
  height: 102%;
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1 / span 1;
  background-color: ${props => props.mode ? props.theme.ic5 : props.theme.ic3};
  border: ${props => props.mode ? props.theme.bthk : 'none'};
`
const Confirm = styled.div`
  height: 60%;
  width: 40%;
  background-color: ${props => props.theme.ic5};
  display: flex;
  justify-content: center;
  align-items: center;
`



export default function User() {
  const [lastName, setLastName] = useState()
  const [firstName, setFirstName] = useState()
  const [email, setEmail] = useState()
  const [passCon, setPassCon] = useState()
  const [password, setPassword] = useState()
  const [pwsMatch, setMatch] = useState()
  const [newUser, toggleNewUser] = useState(false)

  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    setMatch(passCon === password)
  }, [password, passCon])

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


  let emailValidation = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  const EnterRegisterCredentials = () => {
    return(
      <>

      <DetailWrapper row={2}>
        <input type={'text'} placeholder={'email'} onChange={(e) => (e) => setEmail(e.target.value)}/>
      </DetailWrapper>
      <DetailWrapper row={3}>
        <input type={'text'} placeholder={'first name'} onChange={(e) => e =>setFirstName(e.target.value)}/>
      </DetailWrapper>
      <DetailWrapper row={4}>
        <input type={'text'} placeholder={'last name'} onChange={(e) => e => setLastName(e.target.value)}/>
      </DetailWrapper>
      <DetailWrapper row={5}>
        <input type={'password'} placeholder={'password'} onChange={(e) => e => setPassword(e.target.value)}/>
      </DetailWrapper>
      <DetailWrapper row={6}>
        <input type={'password'} placeholder={'confirm password'} onChange={(e) => e =>  setPassCon(e.target.value)}/>
      </DetailWrapper>
      

      </>

    )
  }
  const EnterLoginCredentials = () => {
    return(
      <DetailFlexWrapper>
        <

      </DetailFlexWrapper>
    )

  }

  const EnterCredentials = () => {

    return(
      <UserBox>
      <HeaderWrapper>

        <Header mode={!newUser} onClick={() => toggleNewUser(false)}>
          <BoxHeaderText>Login</BoxHeaderText>
        </Header>
        <Header mode={newUser} onClick={() => toggleNewUser(true)}>
          <BoxHeaderText >Register</BoxHeaderText>
        </Header>
      </HeaderWrapper>


      {newUser ? <EnterRegisterCredentials /> : <EnterLoginCredentials />}

      <DetailWrapper row={7}>
        <Confirm onClick={() => newUser ? createUser() : authenticateUser(email, password)}>
          <SmallerBoxText>
            Confirm
          </SmallerBoxText>
        </Confirm>
      </DetailWrapper>
      </UserBox>
    )
  
  }





  return (
    <>
    <EnterCredentials  />
    </>
  )
}



