import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import NavBar from '../../components/NavBar'
import { Loading } from '../../components/Loading/Loading'

import { useUser } from '../../hooks/useUser'

import Logo from '../../assets/LogoPainted.png'

import api from '../../api'

import './styles.scss'

function ForgotPasswordPage() {
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  function handleEmailInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const requestBody = {
      email: email,
    }

    setLoading(true)

    api
      .put('/students/generate-code', requestBody)
      .then((response: AxiosResponse) => {
        const { randomCode } = response.data
        setUser({ ...user, email: email, code: randomCode })
        setLoading(false)
        toast.success('Bem vindo de volta - Crie sua nova senha!')
        setTimeout(() => {
          toast.dismiss()
          navigate('/login/verificar-email')
        }, 1500)
      })
      .catch(err => {
        toast.error(err.response.data.erro)
      })
  }

  return (
    <div id='forgot-password-page'>
      <Toaster />
      <NavBar smallNav={true} />
      <div className='form-container'>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleEmailInput(e)
          }
        >
          <img src={Logo} alt='MyLocker' />
          <div className='bottom-section'>
            <div className='content'>
              <div className='text-container'>
                <p className='title'>Recuperar Senha</p>
                <p className='subtitle'>Digite seu e-mail da Unicamp</p>
              </div>
              <div className='input-container'>
                <input
                  type='text'
                  placeholder='E-mail Institucional'
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                />
              </div>
            </div>
            <button type='submit' className={loading ? 'loading' : ''}>
              {loading ? <Loading /> : 'Continuar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
