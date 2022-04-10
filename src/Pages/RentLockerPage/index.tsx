import React from 'react'
import ChooseLockersSection from '../../components/ChooseLockersSection'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

import './styles.scss'

function RentLockerPage() {
  return (
    <div id='rent-locker-page'>
      <NavBar />
      <main>
        <div className='title-container'>
          <p className='page-title'>Alugue um Armário</p>
          <p className='page-subtitle'>
            Selecione o bloco de armários que você deseja.
          </p>
        </div>
        <ChooseLockersSection />
      </main>
      <Footer />
    </div>
  )
}

export default RentLockerPage
