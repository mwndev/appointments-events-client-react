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
import {Calendar} from './pages/Book'
import { AppointmentContext } from './contexts/AppointmentContext'
import React, {useState} from 'react'
import Test from './pages/Test'


function App() {

  const theme1 = {
    c1: '#32e42f',
    c2: '#6eda6c',
    c3: '#fafafa',
    tc1: '#000',
    //this is there to link the width of the left and right sides of the header
    narrowness: '10%'
  }

  //the links below the title in the header are generated based on this array
  const links = [
    ['/', 'home', <Home />], ['/about', 'o mnie', <About />], ['/patient', 'oferta dla pacjenta', <Patient />], 
    ['/corporate', 'oferta dla firm', <Corporate />], ['/e_consultation', 'e-konsultacje', <EConsultation />],
    ['/info', 'warto wiedzieć', <Info />], ['/prices', 'cennik', <Prices />], ,['/contact', 'kontakt', <Contact />],
    ['/book', 'book appointment', <Calendar />], ['/admin', 'admin', <Admin />], ['/test', 'test', <Test />]
  ]

  let bannerLinks = [];
  links.map((link) => bannerLinks.push([link[0], link[1]]))

  const [contextValue, setContextValue] = useState(null)

  return (
    <ThemeProvider theme={theme1}>
    <AppointmentContext.Provider value={([contextValue, setContextValue])}>


    <Router>
      <Banner links={bannerLinks}/>


      <Routes>
        {links.map((link => ( <Route path={link[0]} element={link[2]} key={link[0]} /> )))}
      </Routes>



    </Router>

    </AppointmentContext.Provider>
    </ThemeProvider>
  );
}

export default App;
