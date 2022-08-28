import React, {userState, useContext, useEffect} from "react"
import { UserContext } from "../../contexts/UserContext"
import { ExternalLink, DetailWrapper, ImgWrapper } from "../../pages/User"
import baseURL from "../../contexts/serverURL"
import check from '../../svgs/check.svg'
import dots from '../../svgs/dots.svg'

export const EnterRegisterCredentials = ({data, setData, handleEnter}) => {

  const emailValidation = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  //nameValidation only checks if a letter exists in the entire string, need to learn more about how to make regex myself
  const nameValidation = new RegExp('[a-z]')
  const passwordValidation = new RegExp('[a-z]')

  useEffect(() => {
    setData({})
  },[])

  
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
        <input type={'text'} name={'email'} id={'email'} placeholder={'email'} onChange={(e) => handleEmail(e)} />
        <ImgWrapper><img src={data.emailValid ? check : dots} /></ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={3}>
        <input type={'text'} id={'firstname'} placeholder={'first name'} onChange={(e) => handleFN(e)}/>
        <ImgWrapper>
          <img src={data.firstNameValid ? check : dots}/>
        </ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={4}>
        <input type={'text'} placeholder={'last name'} onChange={(e) => handleLN(e)}/>
        <ImgWrapper><img src={data.lastNameValid ? check : dots} /></ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={5}>
        <input type={'password'} name={'password'} id={'password'} placeholder={'password'} onChange={(e) => handlePW(e)}/>
        <ImgWrapper><img src={data.passwordValid ? check : dots} /></ImgWrapper>
      </DetailWrapper>
      <DetailWrapper row={6}>
        <input type={'password'} placeholder={'confirm password'} onChange={((e) => handleCPW(e))} onKeyDown={(e) => handleEnter(e)}/>
        <ImgWrapper><img src={data.passwordsMatch ? check : dots} /></ImgWrapper>
      </DetailWrapper>
      

      </>

    )
    }  


