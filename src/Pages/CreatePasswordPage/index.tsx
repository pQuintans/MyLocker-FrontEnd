import React, { useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import NavBar from '../../components/NavBar'

import { useUser } from '../../hooks/useUser'

import Logo from '../../assets/LogoPainted.png'

import api from '../../api'

import './styles.scss'

function VerifyLoginPage() {
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  const passwordInput = useRef<HTMLInputElement>(null)
  const passwordConfirmationInput = useRef<HTMLInputElement>(null)

  function handleCreatePassword() {
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

      api
        .put('/students/update-password', requestBody)
        .then(() => {
          setUser({
            ra: '',
            first_name: '',
            last_name: '',
            email: '',
            code: '',
            password: '',
            locker_number: undefined,
            status: undefined,
          })
          toast.success('Senha criada com sucesso')
          setTimeout(() => {
            toast.dismiss()
            navigate('/login')
          }, 1500)
        })
        .catch(err => {
          toast.error(err.response.data.erro)
        })
    }
  }

  useEffect(() => {
    toast.dismiss()
  }, [])

  return (
    <>
      <Toaster />
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
                    <input
                      type='text'
                      placeholder='Senha'
                      ref={passwordInput}
                    />
                    <input
                      type='text'
                      placeholder='Confirmar Senha'
                      ref={passwordConfirmationInput}
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleCreatePassword}>Continuar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default VerifyLoginPage
