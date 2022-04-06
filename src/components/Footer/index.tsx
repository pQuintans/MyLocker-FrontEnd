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
