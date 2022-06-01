import React, { useEffect, useState } from 'react'
import ChooseLockersSection from '../../components/RentLocker/ChooseLockersSection'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

import './styles.scss'
import { ChooseLocker } from '../../components/RentLocker/ChooseLocker'
import api from '../../api'
import { AxiosResponse } from 'axios'

export type SectionsTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type SectionType = {
  id: number
  color: string
  left_room: string
  right_room: string
  status: number
}
export interface Locker {
  number: number
  isRented: boolean
  rentedAt: string | null
  FK_section_id: number
  status: number
  section: SectionType
}

function RentLockerPage() {
  const [sectionChoosed, setSectionChoosed] = useState<SectionsTypes | null>(
    null
  )
  const [lockers, setLockers] = useState<Locker[]>()

  function loadSections() {
    api
      .get('/lockers')
      .then((response: AxiosResponse) => {
        setLockers(response.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  useEffect(() => {
    loadSections()
  }, [])

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
            lockers={lockers!}
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
