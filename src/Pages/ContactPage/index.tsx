import React from 'react'

import { MdEmail, MdPhone } from 'react-icons/md'

import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

import ContactUsIlustration from '../../assets/ContactUsIlustration.png'

import './styles.scss'

function ContactPage() {
  return (
    <div id='contact-page'>
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
              <p>Informações de Contato</p>
              <p>
                Preencha o formulário e nossa equipe entrará em contato em menos
                de 48 horas.
              </p>
            </div>
            <div className='data-container'>
              <div className='phone'>
                <MdPhone />
                <p>mylocker.contato@gmail.com</p>
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
            <form>
              <label htmlFor=''>Primeiro Nome</label>
              <input type='text' id='input-first-name' />
              <label htmlFor=''>Último Nome</label>
              <input type='text' id='input-last-name' />
              <label htmlFor=''>Mensagem</label>
              <textarea id='input-message' />
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage
