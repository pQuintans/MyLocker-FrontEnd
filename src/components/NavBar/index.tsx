import React from 'react'
import { Link } from 'react-router-dom'

// import DefaultProfilePic from '../../assets/DefaultProfilePicture.jpg'
import UnicampLogo from '../../assets/UnicampLogo.svg'

import './styles.scss'

type NavBarTypes = {
  smallNav?: boolean
  active?: 'landing' | 'rent-locker' | 'about-us' | 'contact'
}

function NavBar({ smallNav, active }: NavBarTypes) {
  return (
    <nav>
      <div className='nav-header'>
        <p>Colégio Técnico de Limeira</p>
      </div>
      {!smallNav && (
        <div className='nav-body'>
          <div className='first-section'>
            {active == 'landing' ? (
              <p className='actual-page'>Início</p>
            ) : (
              <p>Início</p>
            )}
            {active == 'rent-locker' ? (
              <p className='actual-page'>Aluguel de Armários</p>
            ) : (
              <p>Aluguel de Armários</p>
            )}
          </div>
          <img
            src={UnicampLogo}
            alt='Logo da Unicamp'
            className='unicamp-logo'
          />
          <div className='last-section'>
            {active == 'about-us' ? (
              <p className='actual-page'>Sobre Nós</p>
            ) : (
              <p>Sobre Nós</p>
            )}
            {active == 'contact' ? (
              <p className='actual-page'>Contato</p>
            ) : (
              <p>Contato</p>
            )}
            {/* <img
            src={DefaultProfilePic}
            alt='Foto de Perfil'
            className='profile-picture'
          /> */}
            <Link to='/login' className='login-button'>
              Entrar
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
