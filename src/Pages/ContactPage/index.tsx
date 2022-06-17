import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { MdEmail, MdPhone } from 'react-icons/md'

import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { Loading } from '../../components/Loading/Loading'

import { useUser } from '../../hooks/useUser'

import ContactUsIlustration from '../../assets/ContactUsIlustration.png'

import api from '../../api'

import './styles.scss'

function ContactPage() {
  const { user, setUser } = useUser()

  const [email, setEmail] = useState(user.email)
  const [name, setName] = useState(user.first_name + ' ' + user.last_name)
  const [loading, setLoading] = useState(false)

  const messageRef = useRef<HTMLTextAreaElement>(null)

  function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const message = messageRef.current!.value

    const requestBody = {
      name,
      email,
      message,
    }

    setLoading(true)

    api
      .post('/contact', requestBody)
      .then(() => {
        messageRef.current!.value = ''
        toast.success('Mensagem enviada com sucesso')
        setLoading(false)
      })
      .catch(err => {
        toast.error(err.response.data.erro)
        setLoading(false)
      })
  }

  useEffect(() => {
    setEmail(user.email)
    setName(user.first_name + ' ' + user.last_name)

    if (user.email != '' && user.ra == '') {
      setUser({
        ra: '',
        first_name: '',
        last_name: '',
        email: '',
      })
    }
  }, [user])

  return (
    <div id='contact-page'>
      <Toaster />
      <NavBar />
      <main>
        <div className='title-container'>
          <p className='page-title'>Fale Conosco</p>
          <p className='page-subtitle'>
            Alguma pergunta ou dúvida sobre o sistema? Mande uma mensagem!
          </p>
        </div>
        <div className='contact-container'>
          <div className='contact-header'>
            <div className='text-container'>
              <p className='title'>Informações de Contato</p>
              <p className='subtitle'>
                Preencha o formulário e nossa equipe entrará em contato em menos
                de 48 horas.
              </p>
            </div>
            <div className='data-container'>
              <div className='phone'>
                <MdPhone />
                <p>(019) 9XXXX-YYYY</p>
              </div>
              <div className='mail'>
                <MdEmail />
                <p>mylocker.contato@gmail.com</p>
              </div>
            </div>
            <div className='image-container'>
              <img src={ContactUsIlustration} alt='' />
            </div>
          </div>
          <div className='contact-body'>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                handleEmailSubmit(e)
              }}
            >
              <label htmlFor=''>E-mail institucional</label>
              <input
                type='text'
                id='input-first-name'
                value={email}
                onChange={event => setEmail(event.target.value)}
                disabled={user.email != ''}
              />
              <label htmlFor=''>Nome</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={event => setName(event.target.value)}
                disabled={user.first_name != ''}
              />
              <label htmlFor=''>Mensagem</label>
              <textarea
                id='input-message'
                ref={messageRef}
                disabled={loading}
              />
              <button type='submit' className={loading ? 'loading' : ''}>
                {loading ? <Loading /> : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage
