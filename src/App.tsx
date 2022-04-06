import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import AboutUsPage from './Pages/AboutUsPage'
import ContactPage from './Pages/ContactPage'

import './global.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sobre-nos' element={<AboutUsPage />} />
        <Route path='/contato' element={<ContactPage />} />
      </Routes>
    </Router>
  )
}

export default App
