import React from 'react'

import { Routes as MyRoutes, Route } from 'react-router-dom'

import LandingPage from '../Pages/LandingPage'
import LoginPage from '../Pages/LoginPage'
import VerifyEmailPage from '../Pages/VerifyEmailPage'
import CreatePasswordPage from '../Pages/CreatePasswordPage'
import ForgotPasswordPage from '../Pages/ForgotPasswordPage'
import AboutUsPage from '../Pages/AboutUsPage'
import ContactPage from '../Pages/ContactPage'
import RentLockerPage from '../Pages/RentLockerPage'

export function PublicRoutes() {
  return (
    <MyRoutes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/login/verificar-email' element={<VerifyEmailPage />} />
      <Route path='/login/criar-senha' element={<CreatePasswordPage />} />
      <Route path='/login/recuperar-senha' element={<ForgotPasswordPage />} />
      <Route path='/sobre-nos' element={<AboutUsPage />} />
      <Route path='/contato' element={<ContactPage />} />
      <Route path='/alugar-armario' element={<RentLockerPage />} />
    </MyRoutes>
  )
}
