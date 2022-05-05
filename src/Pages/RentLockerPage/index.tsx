import React, { useState } from 'react'
import ChooseLockersSection from '../../components/RentLocker/ChooseLockersSection'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

import './styles.scss'
import { ChooseLocker } from '../../components/RentLocker/ChooseLocker'

export type SectionsTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

function RentLockerPage() {
  const [sectionChoosed, setSectionChoosed] = useState<SectionsTypes | null>(
    null
  )

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
        {!sectionChoosed ? (
          <ChooseLockersSection navigateToSection={setSectionChoosed} />
        ) : (
          <ChooseLocker
            changeSection={setSectionChoosed}
            actualSection={sectionChoosed}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default RentLockerPage
