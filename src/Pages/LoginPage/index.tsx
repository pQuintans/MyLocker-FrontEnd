import React, { useState } from 'react'

import NavBar from '../../components/NavBar'

import Logo from '../../assets/LogoPainted.png'

import './styles.scss'

function LoginPage() {
  const [email, setEmail] = useState(false)

  return (
    <div id='login-page'>
      <NavBar smallNav={true} />
      {!email ? (
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
              <button onClick={() => setEmail(true)}>Continuar</button>
            </div>
          </form>
        </div>
      ) : (
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
                  <p className='subtitle'>Digite sua senha para fazer login</p>
                  <p className='email'>cl200146@g.unicamp.br</p>
                </div>
                <div className='input-container'>
                  <input type='text' placeholder='E-mail Institucional' />
                  <p>Esqueceu sua senha?</p>
                </div>
              </div>
              <button onClick={() => setEmail(false)}>Continuar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default LoginPage
