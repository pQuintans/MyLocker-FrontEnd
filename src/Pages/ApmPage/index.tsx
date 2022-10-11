import React, { useRef, useState } from 'react'

import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

import './styles.scss'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { SubmitPaymentProveButton } from '../../components/Apm/SubmitPaymentProveButon'
import { ApmSituation } from '../../components/Apm/ApmSituation'

function ApmPage() {
  const { darkTheme } = useDarkTheme()

  return (
    <div id='apm-page' className={darkTheme ? 'dark' : ''}>
      <NavBar />
      <main>
        <div className='title-container'>
          <p className='page-title'>APM</p>
          <p className='page-subtitle'>
            Submeta e acompanhe a situação de seu pedido de desconto pela APM.
          </p>
        </div>
        <SubmitPaymentProveButton />
        {/* <ApmSituation situation='Rejeitada' /> */}
      </main>
      <Footer />
    </div>
  )
}

export default ApmPage
