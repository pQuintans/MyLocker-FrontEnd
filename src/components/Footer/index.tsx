import React from 'react'

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
          <p>Sobre Nós</p>
          <p>Precisa de Ajuda</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
