import React from 'react'

import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

import LandingPageImage from '../../assets/LandingPageImage.jpg'

import './styles.scss'
import { useDarkTheme } from '../../hooks/useDarkTheme'

function LandingPage() {
  const { darkTheme } = useDarkTheme()
  return (
    <div id='LandingPage' className={darkTheme ? 'dark' : ''}>
      <NavBar />
      <main>
        <img src={LandingPageImage} alt='Armários' />
        <div className='text-container'>
          <p className='title'>O MyLocker chegou!</p>
          <p>
            Plataforma Oficial do Colégio Técnico de Limeira para propriciar uma
            locação de armários de forma eficiente e inteligente
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
