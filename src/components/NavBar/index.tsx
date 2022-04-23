import React, { useRef } from 'react'

import { Link, useLocation } from 'react-router-dom'
import { alpha, styled, Switch } from '@mui/material'
import { common } from '@mui/material/colors'

import { CgProfile } from 'react-icons/cg'
import { BsMoonFill } from 'react-icons/bs'
import { MdOutlineLogout } from 'react-icons/md'

import UnicampLogo from '../../assets/UnicampLogo.svg'
import DefaultProfilePic from '../../assets/DefaultProfilePicture.jpg'
import { useUser } from '../../hooks/useUser'

import './styles.scss'

type NavBarTypes = {
  smallNav?: boolean
}

function NavBar({ smallNav }: NavBarTypes) {
  const { user } = useUser()
  const { pathname: actualPage } = useLocation()
  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  const dropdown = useRef<HTMLDivElement>(null)

  const StyledSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: common.black,
      '&:hover': {
        backgroundColor: alpha(common.black, theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: common.black,
    },
  }))

  function handleDropdown() {
    const dropdownDisplay = dropdown.current!.style.display
    console.log(dropdownDisplay)
    if (dropdownDisplay == '' || dropdownDisplay == 'none') {
      dropdown.current!.style.display = 'flex'
      dropdown.current!.style.animation = 'fade_in_show 300ms'
    } else {
      dropdown.current!.style.display = 'none'
    }
  }

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

            {user.ra != '' ? (
              <div className='profile-picture-container'>
                <img
                  src={
                    user.profile_picture_url
                      ? user.profile_picture_url
                      : DefaultProfilePic
                  }
                  alt='Foto de Perfil'
                  className='profile-picture'
                  onClick={handleDropdown}
                />
                <div
                  className='profile-picture-dropdown'
                  ref={dropdown}
                  onClick={() => console.log('a')}
                >
                  <div className='dropdown-content'>
                    <CgProfile />
                    <p>Meu Perfil</p>
                  </div>
                  <div className='dropdown-content'>
                    <BsMoonFill />
                    <p>Modo Noturno</p>
                    <StyledSwitch {...label} />
                  </div>
                  <div className='dropdown-content'>
                    <MdOutlineLogout />
                    <p>Sair</p>
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
