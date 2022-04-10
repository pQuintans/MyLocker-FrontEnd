import React from 'react'
import { Link } from 'react-router-dom'

import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
  AiOutlineMail,
} from 'react-icons/ai'

import ShortLogoWhite from '../../assets/ShortLogoWhite.png'

import './styles.scss'

function Footer() {
  return (
    <footer>
      <div className='footer-content'>
        <img src={ShortLogoWhite} alt='MyLocker' />
        <div className='right-section'>
          <div className='logo-section'>
            <a
              href='https://twitter.com/MyLockerTCC'
              target='_blank'
              className='logo twitter'
              rel='noreferrer'
            >
              <AiOutlineTwitter />
            </a>
            <a
              href='https://instagram.com/MyLocker_TCC'
              target='_blank'
              className='logo instagram'
              rel='noreferrer'
            >
              <AiOutlineInstagram />
            </a>
            <a
              href='https://www.youtube.com/channel/UC2adqJDQcWlhAO2y85D7Lkw'
              target='_blank'
              className='logo youtube'
              rel='noreferrer'
            >
              <AiFillYoutube />
            </a>
            <a
              href='mailto:mylocker.contato@gmail.com'
              target='_blank'
              className='logo email'
              rel='noreferrer'
            >
              <AiOutlineMail />
            </a>
          </div>
          <Link className='link' to='/sobre-nos'>
            Sobre Nós
          </Link>
          <Link className='link' to='/contato'>
            Precisa de Ajuda
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
