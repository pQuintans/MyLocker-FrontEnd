import React, { useState } from 'react'

import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

import './styles.scss'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { SubmitPaymentProveButton } from '../../components/Apm/SubmitPaymentProveButon'
import { ApmSituation } from '../../components/Apm/ApmSituation'
import { Toaster } from 'react-hot-toast'
import { useUser } from '../../hooks/useUser'

function ApmPage() {
  const { user } = useUser()
  const [sendApm, setSendApm] = useState(user.apmCount > 0 ? false : true)
  const { darkTheme } = useDarkTheme()

  console.log(user.apm)
  console.log(user.apmCount)

  return (
    <div id='apm-page' className={darkTheme ? 'dark' : ''}>
      <Toaster />
      <NavBar />
      <main>
        <div className='title-container'>
          <p className='page-title'>APM</p>
          <p className='page-subtitle'>
            Submeta e acompanhe a situação de seu pedido de desconto pela APM.
          </p>
        </div>
        {sendApm ? (
          <SubmitPaymentProveButton setSendApm={setSendApm} />
        ) : (
          <ApmSituation
            setSendApm={setSendApm}
            situation={
              user.apm[0]?.status == 0
                ? 'Rejeitada'
                : user.apm[0]?.status == 1
                ? 'Em Análise'
                : 'Aprovada'
            }
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ApmPage
