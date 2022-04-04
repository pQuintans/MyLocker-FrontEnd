import React from 'react'
import NavBar from '../../components/NavBar'

import './styles.scss'

function LoginPage() {
  return (
    <div id='login-page'>
      <NavBar />
      <form>
        <img src='' alt='MyLocker' />
        <p>Entrar</p>
        <p>Digite seu e-mail da Unicamp</p>
        <input type='text' />
        <p>Esqueceu seu e-mail?</p>
        <button>Continuar</button>
      </form>
    </div>
  )
}

export default LoginPage
