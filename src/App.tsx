import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ScrollToTop from './utils/ScrollToTop'

import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import AboutUsPage from './Pages/AboutUsPage'
import ContactPage from './Pages/ContactPage'
import VerifyEmailPage from './Pages/VerifyEmailPage'
import CreatePasswordPage from './Pages/CreatePasswordPage'
import RentLockerPage from './Pages/RentLockerPage'

import './global.scss'

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/login/verificar-email' element={<VerifyEmailPage />} />
          <Route path='/login/criar-senha' element={<CreatePasswordPage />} />
          <Route path='/sobre-nos' element={<AboutUsPage />} />
          <Route path='/contato' element={<ContactPage />} />
          <Route path='/alugar-armario' element={<RentLockerPage />} />
        </Routes>
      </ScrollToTop>
    </Router>
  )
}

export default App
