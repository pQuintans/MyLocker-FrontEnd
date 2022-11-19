import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import NavBar from '../../components/NavBar'
import { Loading } from '../../components/Loading/Loading'

import { useUser } from '../../hooks/useUser'

import Logo from '../../assets/LogoPainted.png'
import LogoWhite from '../../assets/LogoPaintedWhite.png'

import api from '../../api'

import './styles.scss'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

function VerifyLoginPage() {
  const { user, setUser } = useUser()
  const { darkTheme } = useDarkTheme()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const [passwordConfirmationIsVisible, setPasswordConfirmationIsVisible] =
    useState(false)

  const passwordInput = useRef<HTMLInputElement>(null)
  const passwordConfirmationInput = useRef<HTMLInputElement>(null)

  function handleCreatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const password = passwordInput.current!.value
    const passwordConfirm = passwordConfirmationInput.current!.value
    const regex = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)

    const passwordHasLettersAndNumbers = regex.test(password)

    if (!passwordHasLettersAndNumbers) {
      toast.error(
        'Sua senha deve conter numeros, letras minusculas e letras maiusculas'
      )
      return
    }

    const passwordsMatches = password == passwordConfirm

    if (!passwordsMatches) {
      toast.error('Senhas não coincidem')
      return
    }

    if (passwordsMatches) {
      const requestBody = {
        email: user.email,
        password: password,
      }

      setLoading(true)

      api.get('/logout/students', { withCredentials: true }).then(() => {
        setUser({
          ra: '',
          first_name: '',
          last_name: '',
          email: '',
          code: '',
          password: '',
          locker_number: undefined,
          status: undefined,
          apm: [],
          apmCount: 0,
        })

        api
          .put('/students/update-password', requestBody)
          .then(() => {
            toast.success('Senha criada com sucesso')
            setLoading(false)
            setTimeout(() => {
              toast.dismiss()
              navigate('/login')
            }, 1500)
          })
          .catch(err => {
            toast.error(err.response.data.erro)
            setLoading(false)
          })
      })
    }
  }

  function changePasswordVisibility() {
    setPasswordIsVisible(value => !value)
  }

  function changePasswordConfirmationVisibility() {
    setPasswordConfirmationIsVisible(value => !value)
  }

  useEffect(() => {
    toast.dismiss()
  }, [])

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: darkTheme ? '#333' : '#fff',
            color: darkTheme ? '#fff' : '#000',
          },
        }}
      />
      <div id='create-password-page' className={darkTheme ? 'dark' : ''}>
        <NavBar smallNav={true} />
        <div className='form-container'>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              handleCreatePassword(e)
            }}
          >
            <img src={darkTheme ? LogoWhite : Logo} alt='MyLocker' />
            <div className='bottom-section'>
              <div className='content'>
                <div className='text-container'>
                  <p className='title'>Criar senha</p>
                  <p className='subtitle'>Crie uma senha para sua conta</p>
                </div>
                <div className='input-container'>
                  <div className='input-group'>
                    <div className='password-input'>
                      <input
                        type={passwordIsVisible ? 'text' : 'password'}
                        placeholder='Senha'
                        className='password-input'
                        ref={passwordInput}
                      />
                      {passwordIsVisible ? (
                        <AiOutlineEyeInvisible
                          onClick={changePasswordVisibility}
                        />
                      ) : (
                        <AiOutlineEye onClick={changePasswordVisibility} />
                      )}
                    </div>
                    <div className='password-input'>
                      <input
                        type={
                          passwordConfirmationIsVisible ? 'text' : 'password'
                        }
                        className='password-input'
                        placeholder='Confirmar Senha'
                        ref={passwordConfirmationInput}
                      />
                      {passwordConfirmationIsVisible ? (
                        <AiOutlineEyeInvisible
                          onClick={changePasswordConfirmationVisibility}
                        />
                      ) : (
                        <AiOutlineEye
                          onClick={changePasswordConfirmationVisibility}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button type='submit' className={loading ? 'loading' : ''}>
                {loading ? <Loading /> : 'Continuar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default VerifyLoginPage
