import React, {useState, useContext, useEffect} from "react"
import { UserContext } from "../../contexts/UserContext"
import { ExternalLink, DetailWrapper } from "../../pages/User"
import baseURL from "../../contexts/serverURL"








export const EnterLoginCredentials = ({data, setData, loginTries, setAuthenticated, handleEnter}) => {
  //TODO make 'login failed' text actually work

  const [warn, setWarn] = useState({password: false, email: false})

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

  useEffect(() => {
    setAuthenticated(true)
  },[])

  const resetPassword = async () => {
    console.log(data)
    if(data.email === null || data.email === '') {
      window.alert('Please enter your email')
      return setWarn(prev => { return { ...prev, email: true } }) 
    }

    const res = await fetch(`${baseURL}/forgot`, { 
      method: 'POST', 
      headers: { "Content-Type" : "application/json" }, 
      body: JSON.stringify({ email: data.email }) 
    })

    const resData = await res.json()

    if( !resData.userFound ) return window.alert('This email does not have an account.\n Please register.')

    else     window.alert('Please check your email account for a confirmation link')


  }

  //TODO explain in info box why I won't tell user whether his email or password is wrong
  return(
      <>
      <DetailWrapper row={3}>
        <input warning={warn.email} type={'text'} placeholder={'email'} onChange={(e) => handleEmail(e.target.value)}/>
      </DetailWrapper>
          <DetailWrapper warning={loginTries > 1 ? true : false} hide={loginTries > 0 ? false : true} row={4}>
            <div>login failed</div>
          </DetailWrapper>
      <DetailWrapper row={5}>
        <input warn={warn.password} type={'password'} placeholder={'password'} onChange={e => handlePW(e.target.value)} onKeyDown={e => handleEnter(e)}/>
      </DetailWrapper> 
      <DetailWrapper row={6}>
        <ExternalLink onClick={() => resetPassword()}>Reset Password</ExternalLink>
      </DetailWrapper>
      </>
    )

}