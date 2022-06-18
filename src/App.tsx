import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ScrollToTop from './utils/ScrollToTop'

import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import VerifyEmailPage from './Pages/VerifyEmailPage'
import CreatePasswordPage from './Pages/CreatePasswordPage'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import AboutUsPage from './Pages/AboutUsPage'
import ContactPage from './Pages/ContactPage'
import RentLockerPage from './Pages/RentLockerPage'
import ConfirmRentPage from './Pages/ConfirmRentPage'
import ProfilePage from './Pages/ProfilePage'

import { UserContextProvider } from './contexts/UserContext'
import { LockerContextProvider } from './contexts/LockerContext'

import './global.scss'

function App() {
  return (
    <LockerContextProvider>
      <UserContextProvider>
        <Router>
          <ScrollToTop>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route
                path='/login/verificar-email'
                element={<VerifyEmailPage />}
              />
              <Route
                path='/login/criar-senha'
                element={<CreatePasswordPage />}
              />
              <Route
                path='/login/recuperar-senha'
                element={<ForgotPasswordPage />}
              />
              <Route path='/sobre-nos' element={<AboutUsPage />} />
              <Route path='/contato' element={<ContactPage />} />
              <Route path='/perfil' element={<ProfilePage />} />
              <Route path='/alugar-armario' element={<RentLockerPage />} />
              <Route
                path='/alugar-armario/:lockersNumString'
                element={<ConfirmRentPage />}
              />
            </Routes>
          </ScrollToTop>
        </Router>
      </UserContextProvider>
    </LockerContextProvider>
  )
}

export default App
