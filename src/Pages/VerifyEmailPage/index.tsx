import React from 'react'

import NavBar from '../../components/NavBar'

import Logo from '../../assets/LogoPainted.png'

import './styles.scss'

function VerifyLoginPage() {
  return (
    <div id='verify-email-page'>
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
                <p className='title'>Verifique seu e-mail</p>
                <p className='subtitle'>
                  Digite o código enviado para o seu e-mail
                </p>
              </div>
              <div className='input-container'>
                <div className='input-group'>
                  <input type='number' step={1} />
                  <input type='number' step={1} />
                  <input type='number' step={1} />
                  <input type='number' step={1} />
                  <input type='number' step={1} />
                  <input type='number' step={1} />
                </div>
                <p>Reenviar código</p>
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
