import React, { useRef, useState } from 'react'

import './styles.scss'

import { HiOutlineDocumentAdd } from 'react-icons/hi'
import { useUser } from '../../../hooks/useUser'
import api from '../../../api'
import toast from 'react-hot-toast'

export function SubmitPaymentProveButton() {
  const { user, setUser } = useUser()
  const selectFileRef = useRef<HTMLInputElement>(null)
  const [apmPaymentComprove, setApmPaymentComprove] = useState<File>()
  const [loading, setLoading] = useState(false)

  function handleSelectPDF(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files) {
      setApmPaymentComprove(event.currentTarget.files[0])
    }
  }

  function handleSubmitPaymentProve(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (apmPaymentComprove) {
      const formData = new FormData()
      formData.append('apmRequisitionPDF', apmPaymentComprove)
      formData.append('student_ra', user.ra)
      setLoading(true)
      api
        .post('/apms', formData, { withCredentials: true })
        .then(res => {
          setLoading(false)
          setUser(res.data.student)
        })
        .catch(err => {
          setLoading(false)
          toast.error(err.response.data.erro)
        })
    }
  }

  return (
    <form id='submit-payment-prove' onSubmit={e => handleSubmitPaymentProve(e)}>
      <input
        type='file'
        accept='.pdf'
        ref={selectFileRef}
        onChange={event => handleSelectPDF(event)}
      />
      <button
        type='button'
        disabled={loading}
        onClick={() => {
          selectFileRef.current!.click()
        }}
        className={apmPaymentComprove && 'small-button'}
      >
        <HiOutlineDocumentAdd />
        <p>Submeter comprovante de pagamento da APM</p>
      </button>
      {apmPaymentComprove && (
        <div className='review-files-div'>
          <p>{apmPaymentComprove.name}</p>
          <button className='submit-button' type='submit' disabled={loading}>
            Enviar!
          </button>
        </div>
      )}
    </form>
  )
}
