import {ThemeProvider} from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Patient from './pages/Patient'
import Corporate from './pages/Corporate'
import EConsultation from './pages/EConsultation'
import Contact from './pages/Contact'
import Prices from './pages/Prices'
import Info from './pages/Info'
import Banner from './nav/Banner'
import Admin from './pages/Admin'
import {Book} from './pages/Book'
import { AppointmentContext } from './contexts/AppointmentContext'
import React, {useState, useEffect} from 'react'
import Test from './pages/Test'
import User from './pages/User'
import { UserContext } from './contexts/UserContext'
import { NewPassword } from './pages/NewPassword'


function App() {

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
    boxHeight: 'calc(200px + 30vh)',
    boxHeightL: 'calc(250px + 35vh)',
    boxHeightXL: 'calc(300px + 40vh)',
    boxRowHeight: 'calc( 200px + 30vh )',
    boxHeaderHeight: '12.3%',
    boxBodyHeight: '85%',
    bthk: '0.07cm solid #000',
    bmed: '0.06cm solid #000',
    bthn: '0.05cm solid #000',

    //this is there to link the width of the left and right sides of the header
    narrowness: '10%'
  }

  //the links below the title in the header are generated based on this array
  const links = [
    ['/', 'home', <Home />], ['/about', 'o mnie', <About />], ['/patient', 'oferta dla pacjenta', <Patient />], 
    ['/corporate', 'oferta dla firm', <Corporate />], ['/prices', 'cennik', <Prices />],
    ['/contact', 'kontakt', <Contact />],
    ['/book', 'book appointment', <Book />], ['/admin', 'admin', <Admin />], 
  ]

  let bannerLinks = [];
  links.map((link) => bannerLinks.push([link[0], link[1]]))

  const [user, setUser] = useState({password: '', email: '', firstName: '', lastName: ''})

  useEffect(() => {
    let uid = localStorage.getItem('JMUDUYPTID')

    let ufn = localStorage.getItem('JMUDUYPTFN')

    let uln = localStorage.getItem('JMUDUYPTLN')

    let uem = localStorage.getItem('JMUDUYPTEM')

    setUser({id: uid, firstName: ufn, lastName: uln, email: uem})
    


  },[])

  return (
    <ThemeProvider theme={theme1}>
    <UserContext.Provider value={{ user, setUser}}>



    <Router>
      <Banner links={bannerLinks}/>


      <Routes>
        {links.map((link => ( <Route path={link[0]} element={link[2]} key={link[0]} /> )))}
        <Route path={'/user'} element={<User />} key={'login'} />
        <Route path={'/newpassword/:tokenid'} element={<NewPassword />} key={'login'} />
      </Routes>



    </Router>

    </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
