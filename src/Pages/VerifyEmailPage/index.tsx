import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import NavBar from '../../components/NavBar'

import Logo from '../../assets/LogoPainted.png'
import LogoWhite from '../../assets/LogoPaintedWhite.png'

import { useUser } from '../../hooks/useUser'

import './styles.scss'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import api from '../../api'
import { AxiosResponse } from 'axios'

const ALLOWED_CHARACTERS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  'r',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
]

function VerifyLoginPage() {
  const { user, setUser } = useUser()
  const { darkTheme } = useDarkTheme()
  const navigate = useNavigate()

  const [codeType, setCodeType] = useState('')

  const input1 = useRef<HTMLInputElement>(null)
  const input2 = useRef<HTMLInputElement>(null)
  const input3 = useRef<HTMLInputElement>(null)
  const input4 = useRef<HTMLInputElement>(null)
  const input5 = useRef<HTMLInputElement>(null)
  const input6 = useRef<HTMLInputElement>(null)
  const submitButton = useRef<HTMLButtonElement>(null)

  function handleCodeType() {
    const input1Value = input1.current!.value
    const input2Value = input2.current!.value
    const input3Value = input3.current!.value
    const input4Value = input4.current!.value
    const input5Value = input5.current!.value
    const input6Value = input6.current!.value

    const actualCode =
      input1Value +
      input2Value +
      input3Value +
      input4Value +
      input5Value +
      input6Value

    if (actualCode != codeType) {
      setCodeType(actualCode)
    }
  }

  function handleCodeSubmit() {
    handleCodeType()
    if (codeType == user.code) {
      toast.success('Verificação realizada com sucesso')
      setTimeout(() => {
        toast.dismiss()
        navigate('/login/criar-senha')
      }, 1500)
    } else {
      toast.error('Código Incorreto')
    }
  }

  useEffect(() => {
    toast.dismiss()

    const inputs = [
      input1.current!,
      input2.current!,
      input3.current!,
      input4.current!,
      input5.current!,
      input6.current!,
    ]

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('keydown', function (event) {
        if (event.key === 'Backspace') {
          inputs[i].value = ''
          if (i !== 0) inputs[i - 1].focus()
        } else if (ALLOWED_CHARACTERS.includes(event.key.toLowerCase())) {
          if (i === inputs.length - 1 && inputs[i].value !== '') {
            event.preventDefault()
            inputs[i].value = inputs[i].value.split('')[0]
            submitButton.current!.focus()
            return true
          } else {
            inputs[i].value = event.key
            i !== inputs.length - 1
              ? inputs[i + 1].focus()
              : (submitButton.current!.focus(), handleCodeType())
            event.preventDefault()
          }
        } else if (event.key === 'Enter' && i != inputs.length - 1) {
          event.preventDefault()
        } else {
          inputs[i].value = inputs[i].value.charAt(0)
          return true
        }
      })
    }
  }, [])

  function handleCodeResubmit() {
    const requestBody = {
      email: user.email,
    }

    toast.loading('Reenviando código...')

    api
      .put('/students/generate-code', requestBody)
      .then((response: AxiosResponse) => {
        const { randomCode } = response.data
        setUser({ ...user, code: randomCode })
        toast.dismiss()
        toast.success('Código reenviado!')
      })
      .catch(err => {
        toast.error(err.response.data.erro)
      })
  }

  return (
    <>
      <div>
        <Toaster
          toastOptions={{
            style: {
              background: darkTheme ? '#333' : '#fff',
              color: darkTheme ? '#fff' : '#000',
            },
          }}
        />
      </div>
      <div id='verify-email-page' className={darkTheme ? 'dark' : ''}>
        <NavBar smallNav={true} />
        <div className='form-container'>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()
            }}
          >
            <img src={darkTheme ? LogoWhite : Logo} alt='MyLocker' />
            <div className='bottom-section'>
              <div className='content'>
                <div className='text-container'>
                  <p className='title'>Verifique seu e-mail</p>
                  <p className='subtitle'>
                    Digite o código o e-mail {user.email}
                  </p>
                </div>
                <div className='input-container'>
                  <div className='input-group'>
                    <input type='text' ref={input1} onKeyUp={handleCodeType} />
                    <input type='text' ref={input2} onKeyUp={handleCodeType} />
                    <input type='text' ref={input3} onKeyUp={handleCodeType} />
                    <input type='text' ref={input4} onKeyUp={handleCodeType} />
                    <input type='text' ref={input5} onKeyUp={handleCodeType} />
                    <input type='text' ref={input6} onKeyUp={handleCodeType} />
                  </div>
                  <p onClick={handleCodeResubmit}>Reenviar código</p>
                </div>
              </div>
              <button onClick={handleCodeSubmit} ref={submitButton}>
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default VerifyLoginPage
