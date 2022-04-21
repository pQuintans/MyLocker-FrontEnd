import React, { useEffect, useRef, useState } from 'react'

import NavBar from '../../components/NavBar'

import Logo from '../../assets/LogoPainted.png'

import { useUser } from '../../hooks/useUser'

import './styles.scss'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface handleCodeTypeProps {
  event: React.KeyboardEvent<HTMLInputElement>
  prevInput?: React.RefObject<HTMLInputElement>
  nextInput?: React.RefObject<HTMLInputElement>
}

function VerifyLoginPage() {
  const { user } = useUser()
  const [codeType, setCodeType] = useState('')
  const navigate = useNavigate()

  const input1 = useRef<HTMLInputElement>(null)
  const input2 = useRef<HTMLInputElement>(null)
  const input3 = useRef<HTMLInputElement>(null)
  const input4 = useRef<HTMLInputElement>(null)
  const input5 = useRef<HTMLInputElement>(null)
  const input6 = useRef<HTMLInputElement>(null)

  function handleCodeType({
    event,
    prevInput,
    nextInput,
  }: handleCodeTypeProps) {
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

    setCodeType(actualCode)

    if (prevInput) {
      if (event.key === 'Backspace') {
        prevInput.current?.focus()
        return
      }
    }

    if (nextInput) {
      if (event.key !== 'Backspace') {
        nextInput.current?.focus()
      }
    }
  }

  function handleCodeSubmit() {
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
  }, [])

  return (
    <>
      <div>
        <Toaster />
      </div>
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
                    Digite o código o e-mail {user.email}
                  </p>
                </div>
                <div className='input-container'>
                  <div className='input-group'>
                    <input
                      type='text'
                      step={1}
                      ref={input1}
                      onKeyUp={event =>
                        handleCodeType({
                          event: event,
                          nextInput: input2,
                        })
                      }
                    />
                    <input
                      type='text'
                      ref={input2}
                      step={1}
                      onKeyUp={event =>
                        handleCodeType({
                          event: event,
                          prevInput: input1,
                          nextInput: input3,
                        })
                      }
                    />
                    <input
                      type='text'
                      ref={input3}
                      step={1}
                      onKeyUp={event =>
                        handleCodeType({
                          event: event,
                          prevInput: input2,
                          nextInput: input4,
                        })
                      }
                    />
                    <input
                      type='text'
                      ref={input4}
                      step={1}
                      onKeyUp={event =>
                        handleCodeType({
                          event: event,
                          prevInput: input3,
                          nextInput: input5,
                        })
                      }
                    />
                    <input
                      type='text'
                      ref={input5}
                      step={1}
                      onKeyUp={event =>
                        handleCodeType({
                          event: event,
                          prevInput: input4,
                          nextInput: input6,
                        })
                      }
                    />
                    <input
                      type='text'
                      ref={input6}
                      step={1}
                      onKeyUp={event =>
                        handleCodeType({
                          event: event,
                          prevInput: input5,
                        })
                      }
                    />
                  </div>
                  <p>Reenviar código</p>
                </div>
              </div>
              <button onClick={handleCodeSubmit}>Continuar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default VerifyLoginPage
