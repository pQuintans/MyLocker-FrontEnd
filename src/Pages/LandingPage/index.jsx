import React from 'react'

import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
  AiOutlineMail,
} from 'react-icons/ai'

import DefaultProfilePic from '../../assets/DefaultProfilePicture.jpg'
import LandingPageImage from '../../assets/LandingPageImage.jpg'
import ShortLogoWhite from '../../assets/ShortLogoWhite.png'
import UnicampLogo from '../../assets/UnicampLogo.svg'

import './styles.scss'

function LandingPage() {
  return (
    <div id='LandingPage'>
      <nav>
        <div className='nav-header'>
          <p>Colégio Técnico de Limeira</p>
        </div>
        <div className='nav-body'>
          <div className='first-section'>
            <p className='actual-page'>Início</p>
            <p>Aluguel de Armários</p>
          </div>
          <img
            src={UnicampLogo}
            alt='Logo da Unicamp'
            className='unicamp-logo'
          />
          <div className='last-section'>
            <p>Sobre Nós</p>
            <p>Contato</p>
            <img
              src={DefaultProfilePic}
              alt='Foto de Perfil'
              className='profile-picture'
            />
          </div>
        </div>
      </nav>
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
      <footer>
        <div className='footer-content'>
          <img src={ShortLogoWhite} alt='MyLocker' />
          <div className='right-section'>
            <div className='logo-section'>
              <div className='logo twitter'>
                <AiOutlineTwitter className='twitter' />
              </div>
              <div className='logo instagram'>
                <AiOutlineInstagram className='twitter' />
              </div>
              <div className='logo youtube'>
                <AiFillYoutube className='twitter' />
              </div>
              <div className='logo email'>
                <AiOutlineMail className='twitter' />
              </div>
            </div>
            <p>Sobre Nós</p>
            <p>Precisa de Ajuda</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
