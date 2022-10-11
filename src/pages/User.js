import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { UserContext } from '../contexts/UserContext'
import { BoxHeaderText, FlexWrapper, MidBoxText, PageWrapper } from '../styledComponents/styledComponents1'
import { Dashboard } from '../components/Dashboard'
import { EnterLoginCredentials } from '../components/userComponents/Login'
import { EnterRegisterCredentials } from '../components/userComponents/Register'
import { saveUserDataToLocalStorage } from '../functions'
import { backendURL } from '../App'

//!TODO add session to make login persist between reloads


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
  max-height: ${props => props.theme.boxHeightL};
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
//TODO set max-height to only apply when firefox

export const ImgWrapper = styled.div`
  height: 80%;
  max-height: calc(23px + 3.2vh);
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    height: 75%;
    aspect-ratio: 1 / 1;
  }
  
`

export const DetailWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: ${props => props.hide ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  grid-row: ${props => props.row} / span 1;
  transform: all 0.2s;
  input{
    height: 80%;
    width: 60%;
    font-size: 1.3em;
    outline: none;
  }
  section{
    height: 80%;
    width: 60%;
    font-size: 1.3em;
    background-color: ${props => props.theme.wc2};
    color: ${props => props.theme.wc6};
  }
  div{
    color: ${props => props.warning ? 'red' : 'inherit'};
  }
`
export const ExternalLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
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
  height: 100%;
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
  height: 100% ;
  width: 100% ;
  position: relative;
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
    const {user, setUser} = useContext(UserContext)
 
  return (
    <PageWrapper>
    <FlexWrapper>
    {
      !user.id ? <EnterCredentials /> : <Dashboard />
    }
    </FlexWrapper>
    
    </PageWrapper>
  )
}















const EnterCredentials = () => {

  const {user, setUser} = useContext(UserContext)

  const [regData, setRegData] = useState({})
  const [loginData, setLoginData] = useState({})
  const [newUser, toggleNewUser] = useState()
  const [authenticated, setAuthenticated] = useState(true)
  const [trigger, pullTrigger] = useState(false)
  const [loginTries, setLoginTries] = useState(-1)


  useEffect(() => {
    confirmOnclick()  
  },[trigger])

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      pullTrigger(prev => !prev)
    }
  }

  const authenticateUser = async(dataOBJ) => {
    console.log('authenticating users')


    const JSONbody = JSON.stringify({
      email: dataOBJ.email,
      password: dataOBJ.password,
    })
  
    const res = await fetch(`${backendURL}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
       },
       body: JSONbody,
    })
    const data = await res.json()


    if(data.authenticated){
      await setUser(data.userData)

      saveUserDataToLocalStorage(data.userData)

      return
    }
    setLoginTries(prev => prev + 1)
  }

 

  const createUser = async(dataOBJ) => {
    const allIsValid = () => dataOBJ.emailValid && dataOBJ.passwordValid && dataOBJ.firstNameValid && dataOBJ.lastNameValid

    if(!allIsValid()) window.alert('not all is valid')



    //REMEMBER ABOUT HTTPS!!!
    const JSONbody = JSON.stringify({
      email: dataOBJ.email,
      firstName: dataOBJ.firstName,
      lastName: dataOBJ.lastName,
      password: dataOBJ.password,
    })

    const res = await fetch(`${backendURL}/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONbody,
    })
    const data = await res.json()
    if(data.emailIsTaken) window.alert('Email is already in use. Please login')
    else window.alert('Please check your email for a registration link.')

  }
  
  const confirmOnclick = () => newUser ? createUser(regData) : authenticateUser(loginData)
  

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


      {newUser ? (
        <EnterRegisterCredentials 
          handleEnter={handleEnter} 
          authWarning={authenticated} 
          data={regData} 
          setData={setRegData} />
          ) : (
        <EnterLoginCredentials
          loginTries={loginTries} 
          handleEnter={handleEnter} 
          authenticated={authenticated} 
          setAuthenticated={setAuthenticated} 
          data={loginData} 
          setData={setLoginData}/>)
      }

      <DetailWrapper row={7}>
        <Confirm onClick={() => confirmOnclick()}>
          <MidBoxText>
            Confirm
          </MidBoxText>
        </Confirm>
      </DetailWrapper>
      </UserBox>
      <button onClick={() => console.log(loginTries)}>login tries</button>
      <button onClick={() => fetch(`${backendURL}/users/all`, { method: 'DELETE' })}>delete all users</button>
      </>
    )
  
  }
  




