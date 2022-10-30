import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { SessionTypeContext } from './contexts/SessionTypeContext'
import { UserContext } from './contexts/UserContext'
import { WindowAlertContext } from './contexts/WindowAlertContext'
import { WindowConfirmContext } from './contexts/WindowConfirmContext'
import { Footer } from './Footer'
import { getUserDataFromLocalStorage } from './general/functions'
import { Alert, Confirm } from './general_components/WindowPopups'
import { Header } from './Header'
import About from './pages/About/AboutPage'
import Admin from './pages/Admin/AdminPage'
import { Book } from './pages/Book/BookPage'
import Contact from './pages/Contact/ContactPage'
import { NewPassword } from './pages/NewPassword/NewPasswordPage'
import Quickadmin from './pages/Quickadmin/QuickadminPage'
import { Reservation } from './pages/Reservation/ReservationPage'
import User from './pages/User/UserPage'

                 
const userAgent = navigator.userAgent;

function getBrowserName() {
  let bN
  if(userAgent.match(/chrome|chromium|crios/i)){
    bN = "chrome";
  }else if(userAgent.match(/firefox|fxios/i)){
    bN = "firefox";
  }  else if(userAgent.match(/safari/i)){
    bN = "safari";
  }else if(userAgent.match(/opr\//i)){
    bN = "opera";
  } else if(userAgent.match(/edg/i)){
    bN = "edge";
  }else{
    bN ="No browser detection";
  }
  return bN
}


const Page = styled.div`
min-height: calc(100vh - 2cm - 5vh);
`
    


const theme1 = {
  c1: '#26bb73',
  c2: '#6eda6c',
  c3: '#fafafa',
  tc1: '#000',
  tc2: 'darkgreen',
  ic1: '#effff6',
  ic2: '#c9f7dc',
  ic3: '#a0ebc7',
  ic4: '#72e3ac',
  ic5: '#4ed996',
  ic6: '#26bb74',
  ic7: '#20a665',
  ic8: '#179a5b',
  ic9: '#14864f',
  ic0:' #147b4a',
  hc0: 'rgba(0, 62, 201, 0.1)',
  hc1: 'rgba(0, 62, 201, 0.2)',
  hc2: 'rgba(0, 62, 201, 0.3)',
  hc3: 'rgba(0, 62, 201, 0.4)',
  hc4: 'rgba(0, 62, 201, 0.5)',
  hc5: 'rgba(0, 62, 201, 0.6)',
  hc6: 'rgba(0, 62, 201, 0.7)',
  hc7: 'rgba(0, 62, 201, 0.8)',
  hc8: 'rgba(0, 62, 201, 0.9)',
  hc9: 'rgba(0, 62, 201, 1)',
  wc0: 'rgba(210, 25, 0, 0.1)',
  wc1: 'rgba(210, 25, 0, 0.2)',
  wc2: 'rgba(210, 25, 0, 0.3)',
  wc3: 'rgba(210, 25, 0, 0.4)',
  wc4: 'rgba(210, 25, 0, 0.5)',
  wc5: 'rgba(210, 25, 0, 0.6)',
  wc6: 'rgba(210, 25, 0, 0.7)',
  wc7: 'rgba(210, 25, 0, 0.8)',
  wc11: 'rgb(100, 10, 0)',
  boxWidth: 'calc(250px + 35vh)',
  boxHeightSmall: 'calc(150px + 20vh)',
  boxHeight: 'calc(200px + 30vh)',
  boxHeightL: 'calc(250px + 35vh)',
  boxHeightXL: 'calc(300px + 40vh)',
  boxRowHeight: 'calc( 200px + 30vh )',
  boxHeaderHeight: '12.3%',
  boxBodyHeight: '85%',
  bthk:  '0.07cm solid #000',
  bmed: '0.06cm solid #000',
  bthn: '0.05cm solid #000',
  bgrid: '1px solid #000',

  //this is there to link the width of the left and right sides of the header
  narrowness: '10%'
}

export const backendURL = process.env.REACT_APP_BACKEND_URL
export const thisURL = process.env.REACT_APP_THIS_URL

function App() {

  // Declaring Contexts

  const [user, setUser] = useState({password: '', email: '', firstName: '', lastName: '', isAdmin: false,})
  const [sTs, setSTs] = useState({})

  //for window confirm context
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState('Are you sure you want to do this?')
  const [fnToConfirm, setFnToConfirm] = useState(() => () => console.log('fntoconfirm'))

  const windowConfirm = (m, f) => {
    setMessage(m)
    setFnToConfirm(() => f)
    setActive(true)
  }
  // for window alert context
  const [activeA, setActiveA] = useState(false)
  const [messageA, setMessageA] = useState('Something happened.')
  
  const windowAlert = (m) => {
    setMessageA(m)
    setActiveA(true)
  }
  
  

  // navbar is generated based on this array
  let links = [
    ['/', 'about me', <About />],
    ['/contact', 'contact', <Contact />],
    ['/book', 'book a consultation', <Book />],
    ['/user', 'account', <User />], 
  ]
  //admin page is added if user is admin
  if( user.isAdmin ) links.push(['/admin', 'admin', <Admin />])
  let headerLinks = [];
  links.map((link) => headerLinks.push([link[0], link[1]]))



  useEffect(() => {
    //server is "pinged because the backend server should start up asap"
    const pingServer = async() => {
      return await fetch(`${backendURL}/`)
    }
    pingServer()

    getUserDataFromLocalStorage(setUser)

    // STs are Session Types
    const getSTs = async() => {
      const res = await fetch(`${backendURL}/sessiontypes`)
      const allSessionTypes = await res.json()
      setSTs(allSessionTypes)
      console.log(allSessionTypes)
    }
    getSTs()
  },[])

  

  return (
    <ThemeProvider theme={theme1}>
    <WindowAlertContext.Provider value={{activeA, setActiveA, messageA, windowAlert}}>
    <WindowConfirmContext.Provider value={{ active, setActive, message, fnToConfirm, windowConfirm }}>
    <UserContext.Provider value={{ user, setUser}}>
    <SessionTypeContext.Provider value={{ sTs, setSTs }}>

    <Router>
      <Alert />
      <Confirm/>

      <Header links={headerLinks} />

      <Page>

      <Routes>
        {links.map((link => ( <Route path={`${link[0]}`} element={link[2]} key={link[0]} /> )))}
        <Route path={'/reserve/:tokenid'} element={<Reservation />} />
        <Route path={'/newpassword/:tokenid'} element={<NewPassword />} key={'123213'} />
        <Route path={'/admin/quick'} element={<Quickadmin />} key={'a23rjfiod'} />
      </Routes>

      </Page>
      <Footer />



    </Router>
    </SessionTypeContext.Provider>
    </UserContext.Provider>
    </WindowConfirmContext.Provider>
    </WindowAlertContext.Provider>
    </ThemeProvider>
  );
}

export default App;
