import React from 'react'

import { Link, useLocation } from 'react-router-dom'

// import DefaultProfilePic from '../../assets/DefaultProfilePicture.jpg'

import UnicampLogo from '../../assets/UnicampLogo.svg'

import './styles.scss'

type NavBarTypes = {
  smallNav?: boolean
}

function NavBar({ smallNav }: NavBarTypes) {
  const { pathname: actualPage } = useLocation()

  return (
    <nav>
      <div className='nav-header'>
        <p>Colégio Técnico de Limeira</p>
      </div>

      {!smallNav && (
        <div className='nav-body'>
          <div className='first-section'>
            {actualPage == '/' ? (
              <Link to='/' className='link actual-page'>
                Início
              </Link>
            ) : (
              <Link to='/' className='link'>
                Início
              </Link>
            )}

            {actualPage == '/alugar-armario' ? (
              <Link to='/alugar-armario' className='link actual-page'>
                Aluguel de Armários
              </Link>
            ) : (
              <Link to='/alugar-armario' className='link'>
                Aluguel de Armários
              </Link>
            )}
          </div>
          <img
            src={UnicampLogo}
            alt='Logo da Unicamp'
            className='unicamp-logo'
          />
          <div className='last-section'>
            {actualPage == '/sobre-nos' ? (
              <Link to='/sobre-nos' className='link actual-page'>
                Sobre Nós
              </Link>
            ) : (
              <Link to='/sobre-nos' className='link'>
                Sobre Nós
              </Link>
            )}
            {actualPage == '/contato' ? (
              <Link to='/contato' className='link actual-page'>
                Contato
              </Link>
            ) : (
              <Link to='/contato' className='link'>
                Contato
              </Link>
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
