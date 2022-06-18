import React, { useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BsMoonFill } from 'react-icons/bs'
import { MdOutlineLogout } from 'react-icons/md'
import { Switch } from '@mui/material'

import { useUser } from '../../hooks/useUser'

import UnicampLogo from '../../assets/UnicampLogo.svg'
import UnicampWhiteLogo from '../../assets/UnicampWhiteLogo.svg'
import DefaultProfilePic from '../../assets/DefaultProfilePicture.jpg'
import DefaultProfilePicDarkMode from '../../assets/DefaultProfilePictureDarkMode.jpg'

import api from '../../api'

import './styles.scss'
import { useDarkTheme } from '../../hooks/useDarkTheme'

type NavBarTypes = {
  smallNav?: boolean
}

function NavBar({ smallNav }: NavBarTypes) {
  const { user, setUser } = useUser()
  const { darkTheme, setDarkTheme } = useDarkTheme()
  const { pathname: actualPage } = useLocation()
  const navigate = useNavigate()

  const dropdown = useRef<HTMLDivElement>(null)

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(event.target.checked)
  }

  function handleDropdown() {
    const dropdownDisplay = dropdown.current!.style.display
    if (dropdownDisplay == '' || dropdownDisplay == 'none') {
      dropdown.current!.style.display = 'flex'
      dropdown.current!.style.animation = 'fade_in_show 300ms'
    } else {
      dropdown.current!.style.display = 'none'
    }
  }

  function handleLogout() {
    api.get('/logout/students', { withCredentials: true }).then(() => {
      setUser({
        ra: '',
        first_name: '',
        last_name: '',
        email: '',
      })
      navigate('/')
    })
  }

  return (
    <nav className={darkTheme ? 'dark' : ''}>
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

            {actualPage.startsWith('/alugar-armario') ? (
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
            src={darkTheme ? UnicampWhiteLogo : UnicampLogo}
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

            {user.ra != '' ? (
              <div className='profile-picture-container'>
                <img
                  src={
                    user.profile_picture_url
                      ? user.profile_picture_url
                      : darkTheme
                      ? DefaultProfilePicDarkMode
                      : DefaultProfilePic
                  }
                  alt='Foto de Perfil'
                  className='profile-picture'
                  onClick={handleDropdown}
                />
                <div className='profile-picture-dropdown' ref={dropdown}>
                  {actualPage == '/perfil' ? (
                    <div className='dropdown-content actual-page'>
                      <CgProfile />
                      <Link to={'/perfil'}>Meu Perfil</Link>
                    </div>
                  ) : (
                    <div className='dropdown-content'>
                      <CgProfile />
                      <Link to={'/perfil'}>Meu Perfil</Link>
                    </div>
                  )}
                  <div className='dropdown-content'>
                    <BsMoonFill />
                    <p>Modo Noturno</p>
                    <Switch
                      inputProps={{ 'aria-label': 'controlled' }}
                      onChange={handleThemeChange}
                      checked={darkTheme}
                    />
                  </div>
                  <div className='dropdown-content'>
                    <MdOutlineLogout />
                    <p onClick={handleLogout} className='logout-button'>
                      Sair
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Link to='/login' className='login-button'>
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
