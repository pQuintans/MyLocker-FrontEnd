import React from 'react'

import DefaultProfilePic from '../../assets/DefaultProfilePicture.jpg'
import UnicampLogo from '../../assets/UnicampLogo.svg'

import './styles.scss'

function NavBar() {
  return (
    <nav>
      <div className='nav-header'>
        <p>Colégio Técnico de Limeira</p>
      </div>
      <div className='nav-body'>
        <div className='first-section'>
          <p className='actual-page'>Início</p>
          <p>Aluguel de Armários</p>
        </div>
        <img src={UnicampLogo} alt='Logo da Unicamp' className='unicamp-logo' />
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
  )
}

export default NavBar
