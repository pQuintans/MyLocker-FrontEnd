import React from 'react'

import './styles.scss'

interface ModalProps {
  closeModal: () => void
  open: boolean
  children: React.ReactNode
}

function Modal({ open, closeModal, children }: ModalProps) {
  if (!open) return null
  return (
    <div id='modal'>
      <div className='modal-background' onClick={closeModal}></div>
      <div className='modal-body'>{children}</div>
    </div>
  )
}

export default Modal
