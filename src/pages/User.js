import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { UserContext } from '../contexts/UserContext'
import { BoxHeaderText, FlexWrapper, MidBoxText, PageWrapper, SmallerBoxText } from '../styledComponents/styledComponents1'
import emailIcon from '../svgs/email.svg'
import signature from '../svgs/signature.svg'
import check from '../svgs/check.svg'
import dots from '../svgs/dots.svg'
import { faHandMiddleFinger } from '@fortawesome/pro-duotone-svg-icons'

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
  section{
    height: 80%;
    width: 60%;
    font-size: 1.3em;
    background-color: ${props => props.theme.wc2};
    color: ${props => props.theme.wc6};
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
    const {user, setUser} = useContext(UserContext)
 


  return (
    <PageWrapper>
    <FlexWrapper>

    <EnterCredentials />
    <button onClick={() => console.log(user)}>see user</button>
    </FlexWrapper>
    
    </PageWrapper>
  )
}







const EnterLoginCredentials = ({data, setData, authenticated}) => {

  const handleEmail = v => {
    setData(prev => {
      return {...prev, email: v}
    })
  }
  const handlePW = v => {
    setData(prev => {
      return {...prev, password: v}
    })
  }
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {

    }
  }

  //TODO explain in info box why I won't tell user whether his email or password is wrong
  return(
      <>
      <DetailWrapper row={3}>
        <input  type={'text'} placeholder={'email'} onChange={(e) => handleEmail(e.target.value)}/>
      </DetailWrapper>
      {
        authenticated ?  (
          <DetailWrapper row={2}>
          <div>login successful</div> 
          </DetailWrapper>
        ) : (
          <DetailWrapper row={4}>
          <div>login failed</div>
          </DetailWrapper>
        ) 
      }
      <DetailWrapper row={5}>
        <input  type={'password'} placeholder={'password'} onChange={e => handlePW(e.target.value)}/>
      </DetailWrapper> 
      </>
    )

}







const EnterCredentials = () => {

  const {user, setUser} = useContext(UserContext)

  const [regData, setRegData] = useState({})
  const [loginData, setLoginData] = useState({})
  const [newUser, toggleNewUser] = useState()
  const [authenticated, setAuthenticated] = useState()

  const [sTs, setSTs] = useState([])
  const [selectedST, setSelectedST] = useState()
  const [activeST, setActiveST] = useState(null)

  const authenticateUser = async(dataOBJ) => {
    //! THIS IS COMPLETELY UNSECURED IF SERVER REQUEST DOESN'T GO THROUGH HTTPS
    const JSONbody = JSON.stringify({
      email: dataOBJ.email,
      password: dataOBJ.password,
    })
  
    const res = await fetch('http://localhost:5040/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
       },
       body: JSONbody,
    })
    const data = await res.json()

    if(data.authenticated){
      setUser(data.userData)
      console.log(data.userData)
      localStorage.setItem('JMUDUYPT80085', data.userData)
      setAuthenticated(true)
    }else{
      setAuthenticated(false)
    }
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

    const res = await fetch('http://localhost:5040/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONbody,
    })
  }
  
  
  

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


      {newUser ? <EnterRegisterCredentials authWarning={authenticated} data={regData} setData={setRegData} /> : <EnterLoginCredentials authenticated={authenticated} data={loginData} setData={setLoginData}/>}

      <DetailWrapper row={7}>
        <Confirm onClick={() => newUser ? createUser(regData) : authenticateUser(loginData)}>
          <MidBoxText>
            Confirm
          </MidBoxText>
        </Confirm>
      </DetailWrapper>
      </UserBox>
      <button onClick={() => console.log(regData)}>email click here</button>
      </>
    )
  
  }




const EnterRegisterCredentials = ({data, setData}) => {

  const emailValidation = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  //nameValidation only checks if a letter exists in the entire string, need to learn more about how to make regex myself
  const nameValidation = new RegExp('[a-z]')
  const passwordValidation = new RegExp('[a-z]')



  const handleEmail = (e) => {
    setData(prev => {
      return {...prev, email: e.target.value, emailValid: emailValidation.test(e.target.value)}
    })
  }
  const handleFN = (e) => {
    setData(prev => {
      return{...prev, firstName: e.target.value, firstNameValid: nameValidation.test(e.target.value)}
    })
  }
  const handleLN = (e) => {
    setData(prev => {
      return{...prev, lastName: e.target.value, lastNameValid: nameValidation.test(e.target.value)}
    })
  }
  const handlePW = (e) => {
    setData(prev => {
      return{...prev, password: e.target.value, passwordValid: passwordValidation.test(e.target.value)}
    })
  }
  const handleCPW = (e) => {
    setData(prev => {
      return{...prev, confirmPassword: e.target.value, passwordsMatch: e.target.value === prev.password}
    })
  }

  

    return(
      <>

      <DetailWrapper row={2}>
        <input type={'text'} placeholder={'email'} onChange={(e) => handleEmail(e)} />
        <ImgWrapper><img src={data.emailValid ? check : dots} /></ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={3}>
        <input type={'text'} placeholder={'first name'} onChange={(e) => handleFN(e)}/>
        <ImgWrapper>
          <img src={data.firstNameValid ? check : dots}/>
        </ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={4}>
        <input type={'text'} placeholder={'last name'} onChange={(e) => handleLN(e)}/>
        <ImgWrapper><img src={data.lastNameValid ? check : dots} /></ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={5}>
        <input type={'password'} placeholder={'password'} onChange={(e) => handlePW(e)}/>
        <ImgWrapper><img src={data.passwordValid ? check : dots} /></ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={6}>
        <input type={'password'} placeholder={'confirm password'} onChange={((e) => handleCPW(e))}/>
        <ImgWrapper><img src={data.passwordsMatch ? check : dots} /></ImgWrapper>
      </DetailWrapper>
      

      </>

    )
    }  
