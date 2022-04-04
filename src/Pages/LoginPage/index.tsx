import React from 'react'
import NavBar from '../../components/NavBar'

import Logo from '../../assets/LogoPainted.png'

import './styles.scss'

function LoginPage() {
  return (
    <div id='login-page'>
      <NavBar />
      <div className='form-container'>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
          }}
        >
          <img src={Logo} alt='MyLocker' />
          <div className='bottom-section'>
            <div className='content'>
              <div className='text-container'>
                <p className='title'>Entrar</p>
                <p className='subtitle'>Digite seu e-mail da Unicamp</p>
              </div>
              <div className='input-container'>
                <input type='text' placeholder='E-mail Institucional' />
                <p>Esqueceu seu e-mail?</p>
              </div>
            </div>
            <button>Continuar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
