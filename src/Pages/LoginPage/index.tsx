import React, { useState } from 'react'

import NavBar from '../../components/NavBar'

import Logo from '../../assets/LogoPainted.png'

import './styles.scss'
import api from '../../api'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'

interface Student {
  ra: string
  first_name: string
  last_name: string
  email: string
  password?: string
  code?: string
  locker_number?: number
  status?: number
}

function LoginPage() {
  const { setUser } = useUser()

  const [loginWithEmailSucceed, setLoginWithEmailSucceed] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    api
      .get(`/students/${email}`)
      .then((response: AxiosResponse) => {
        const res: Student = response.data
        if (res.password) {
          setLoginWithEmailSucceed(true)
          setUser(res)
        } else {
          const requestBody = {
            ra: res.ra,
            email: res.email,
          }
          api
            .put('/students/generate-code', requestBody)
            .then((response: AxiosResponse) => {
              setUser({ ...res, code: response.data })
            })
            .catch(err => {
              console.log(err.response.data)
            })
          navigate('/login/verificar-email')
        }
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  return (
    <div id='login-page'>
      <NavBar smallNav={true} />
      {!loginWithEmailSucceed ? (
        <div className='form-container'>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}
          >
            <img src={Logo} alt='MyLocker' />
            <div className='bottom-section'>
              <div className='content'>
                <div className='text-container'>
                  <p className='title'>Entrar</p>
                  <p className='subtitle'>Digite seu e-mail da Unicamp</p>
                </div>
                <div className='input-container'>
                  <input
                    type='text'
                    placeholder='E-mail Institucional'
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                  />
                  <p>Esqueceu seu e-mail?</p>
                </div>
              </div>
              <button type='submit'>Continuar</button>
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
                  <input
                    type='text'
                    placeholder='Senha'
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                  />
                  <p>Esqueceu sua senha?</p>
                </div>
              </div>
              <button>Continuar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default LoginPage
