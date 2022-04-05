import React from 'react'

import LandingPageImage from '../../assets/LandingPageImage.jpg'
import Footer from '../../components/Footer'

import NavBar from '../../components/NavBar'

import './styles.scss'

function LandingPage() {
  return (
    <div id='LandingPage'>
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
