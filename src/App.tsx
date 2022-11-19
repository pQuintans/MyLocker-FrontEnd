import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import ScrollToTop from './utils/ScrollToTop'

import { UserContextProvider } from './contexts/UserContext'
import { LockerContextProvider } from './contexts/LockerContext'
import { DarkThemeContextProvider } from './contexts/DarkThemeContext'

import { Routes } from './routes'
import './global.scss'

function App() {
  return (
    <DarkThemeContextProvider>
      <LockerContextProvider>
        <UserContextProvider>
          <Router>
            <ScrollToTop>
              <Routes />
            </ScrollToTop>
          </Router>
        </UserContextProvider>
      </LockerContextProvider>
    </DarkThemeContextProvider>
  )
}

export default App
