import React, { useEffect, useState, useContext } from "react"
import { backendURL } from "../../App"
import { DetailWrapper, ExternalLink } from "./UserPage"
import { WindowAlertContext } from '../../contexts/WindowAlertContext'




export const EnterLoginCredentials = ({data, setData, loginTries, setAuthenticated, handleEnter}) => {
  //TODO make 'login failed' text actually work

  const [warn, setWarn] = useState({password: false, email: false})
  const { windowAlert } = useContext(WindowAlertContext)

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

    if(data.email === undefined || data.email === null || data.email === ''  ) {
      windowAlert('Please enter your email')
      return setWarn(prev => { return { ...prev, email: true } }) 
    }

    const res = await fetch(`${backendURL}/forgot`, { 
      method: 'POST', 
      headers: { "Content-Type" : "application/json" }, 
      body: JSON.stringify({ email: data.email }) 
    })

    const resData = await res.json()

    console.log(resData)

    if( !resData.userFound ) return windowAlert('This email does not have an account.\n Please register.')

    windowAlert('Please check your email account for a confirmation link')


  }

  //TODO explain in info box why I won't tell user whether his email or password is wrong
  return(
      <>
      <DetailWrapper row={3}>
        <input name='email' id='email' warning={warn.email} type={'text'} placeholder={'email'} onChange={(e) => handleEmail(e.target.value)}/>
      </DetailWrapper>
          <DetailWrapper warning={loginTries > 1 ? true : false} hide={loginTries > 0 ? false : true} row={4}>
            <div>login failed</div>
          </DetailWrapper>
      <DetailWrapper row={5}>
        <input name='password' id='password' warn={warn.password} type={'password'} placeholder={'password'} onChange={e => handlePW(e.target.value)} onKeyDown={e => handleEnter(e)}/>
      </DetailWrapper> 
      <DetailWrapper row={6}>
        <ExternalLink onClick={() => resetPassword()}>Reset Password</ExternalLink>
      </DetailWrapper>
      </>
    )

}