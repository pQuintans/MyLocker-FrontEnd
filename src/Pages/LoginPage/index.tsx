import React, { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import NavBar from '../../components/NavBar'
import { Loading } from '../../components/Loading/Loading'

import { useUser } from '../../hooks/useUser'

import Logo from '../../assets/LogoPainted.png'

import api from '../../api'

import './styles.scss'

function LoginPage() {
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  const [loginWithEmailSucceed, setLoginWithEmailSucceed] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordInput = useRef<HTMLInputElement>(null)

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const requestBody = {
      email: email,
    }

    setLoading(true)

    api
      .post('/students/verifyPasswordExistence', requestBody)
      .then((response: AxiosResponse) => {
        const { hasPassword } = response.data

        if (hasPassword) {
          setLoginWithEmailSucceed(true)
          setLoading(false)
        } else {
          api
            .put('/students/generate-code', requestBody)
            .then((response: AxiosResponse) => {
              const { randomCode } = response.data
              setUser({ ...user, email: email, code: randomCode })
              setLoading(false)
              toast.success('Bem vindo ao MyLocker - Crie sua senha!')
              setTimeout(() => {
                toast.dismiss()
                navigate('/login/verificar-email')
              }, 1500)
            })
            .catch(err => {
              toast.error(err.response.data.erro)
            })
        }
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.response.data.erro)
      })
  }

  async function handlePasswordVerification(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()
    const password = passwordInput.current!.value

    const requestBody = {
      email: email,
      password: password,
    }

    setLoading(true)

    api
      .post('/students/session', requestBody, { withCredentials: true })
      .then((response: AxiosResponse) => {
        setUser(response.data)
        setLoading(false)
        toast.success('Login realizado com sucesso')
        setTimeout(() => {
          toast.dismiss()
          navigate('/')
        }, 1500)
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.response.data.erro)
      })
  }

  return (
    <div id='login-page'>
      <Toaster />
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
              <button type='submit' className={loading ? 'loading' : ''}>
                {loading ? <Loading /> : 'Continuar'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className='form-container'>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              handlePasswordVerification(e)
            }
          >
            <img src={Logo} alt='MyLocker' />
            <div className='bottom-section'>
              <div className='content'>
                <div className='text-container'>
                  <p className='title'>Entrar</p>
                  <p className='subtitle'>Digite sua senha para fazer login</p>
                  <p className='email'>{email}</p>
                </div>
                <div className='input-container'>
                  <input
                    type='text'
                    placeholder='Senha'
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                    ref={passwordInput}
                  />
                  <p>Esqueceu sua senha?</p>
                </div>
              </div>
              <button type='submit' className={loading ? 'loading' : ''}>
                {loading ? <Loading /> : 'Continuar'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default LoginPage
