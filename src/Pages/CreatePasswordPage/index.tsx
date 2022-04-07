import React from 'react'

import NavBar from '../../components/NavBar'

import Logo from '../../assets/LogoPainted.png'

import './styles.scss'

function VerifyLoginPage() {
  return (
    <div id='create-password-page'>
      <NavBar smallNav={true} />
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
                <p className='title'>Criar senha</p>
                <p className='subtitle'>Crie uma senha para sua conta</p>
              </div>
              <div className='input-container'>
                <div className='input-group'>
                  <input type='text' placeholder='Senha' />
                  <input type='text' placeholder='Confirmar Senha' />
                </div>
              </div>
            </div>
            <button>Continuar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyLoginPage
