import React, { useEffect, useRef, useState } from 'react'

// import '../styles.scss'
import './styles.scss'

import { HiOutlineDocumentAdd } from 'react-icons/hi'

export function SubmitPaymentProveButton() {
  const selectFileRef = useRef<HTMLInputElement>(null)
  const [apmPaymentComprove, setApmPaymentComprove] = useState('')

  function handleSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files) {
      const objectUrl = URL.createObjectURL(event.currentTarget.files[0])
      setApmPaymentComprove(objectUrl)
    }
  }

  return (
    <div id='submit-payment-prove'>
      <input
        type='file'
        accept='.pdf'
        ref={selectFileRef}
        onChange={event => handleSelectImage(event)}
      />
      <button
        onClick={() => {
          selectFileRef.current!.click()
        }}
      >
        <HiOutlineDocumentAdd />
        <p>Submeter comprovante de pagamento da APM</p>
      </button>
    </div>
  )
}
