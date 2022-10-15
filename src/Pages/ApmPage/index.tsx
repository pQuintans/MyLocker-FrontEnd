import React, { useEffect, useState } from 'react'

import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

import './styles.scss'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { SubmitPaymentProveButton } from '../../components/Apm/SubmitPaymentProveButon'
import { ApmSituation } from '../../components/Apm/ApmSituation'
import toast, { Toaster } from 'react-hot-toast'
import { useUser } from '../../hooks/useUser'
import api from '../../api'

interface ApmData {
  id: number
  requisitionPDF: string
  status: number
  FK_functionary_cpf?: string
}

function ApmPage() {
  const { user } = useUser()
  const [apm, setApm] = useState<ApmData>()
  const { darkTheme } = useDarkTheme()

  useEffect(() => {
    console.log(user)
    if (user.apm_id) {
      api
        .get(`/apms/${user.apm_id}`)
        .then(res => {
          setApm(res.data)
          console.log(res.data)
        })
        .catch(err => {
          toast.error(err.response.data)
        })
    } else {
      setApm(undefined)
    }
  }, [user])

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
        {apm == undefined ? (
          <SubmitPaymentProveButton />
        ) : (
          <ApmSituation
            situation={
              apm.status == 0
                ? 'Rejeitada'
                : apm.status == 1
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
