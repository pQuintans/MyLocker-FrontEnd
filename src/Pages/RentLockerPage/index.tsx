import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import ChooseLockersSection from '../../components/RentLocker/ChooseLockersSection'
import { ChooseLocker } from '../../components/RentLocker/ChooseLocker'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import Modal from '../../components/Modal'

import api from '../../api'

import './styles.scss'

import LockerImage from '../../assets/LockerImage.png'

import { useUser } from '../../hooks/useUser'
import { Locker } from '../../contexts/LockerContext'
import { useLocker } from '../../hooks/useLocker'

export type SectionsTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

function RentLockerPage() {
  const { setLocker } = useLocker()
  const [sectionChoosed, setSectionChoosed] = useState<SectionsTypes | null>(
    null
  )
  const [lockers, setLockers] = useState<Locker[]>()
  const [lockerModalIsOpen, setLockerModalIsOpen] = useState(false)
  const [selectedLocker, setSelectedLocker] = useState<Locker | null>(null)

  const selectedLockerImgRef = useRef<HTMLImageElement>(null)
  const colorSpanRef = useRef<HTMLSpanElement>(null)
  const disponibilitySpanRef = useRef<HTMLSpanElement>(null)

  const { user } = useUser()

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

  useEffect(() => {
    if (selectedLocker != null) {
      selectedLockerImgRef.current!.style.backgroundColor =
        selectedLocker.section.color

      colorSpanRef.current!.style.backgroundColor = selectedLocker.section.color
      let color
      if (selectedLocker.isRented == true) {
        color = '#db1717'
      } else {
        color = '#26DB17'
      }
      disponibilitySpanRef.current!.style.backgroundColor = color
    }
  }, [selectedLocker])

  function handleChangeLockerModalState() {
    if (lockerModalIsOpen) {
      document.body.style.overflow = 'auto'
      setLockerModalIsOpen(false)
    } else {
      document.body.style.overflow = 'hidden'
      setLockerModalIsOpen(true)
    }
  }

  function selectLocker(locker: Locker) {
    handleChangeLockerModalState()
    setSelectedLocker(locker)
    setLocker(locker)
  }

  function transformHexToPlainText(hex: string) {
    if (hex == '#FDFF97') {
      return 'Amarelo'
    } else if (hex == '#FF7B7B') {
      return 'Vermelho'
    } else if (hex == '#92B7FF') {
      return 'Azul'
    } else if (hex == '#A6FFEA') {
      return 'Verde Água'
    }
  }

  return (
    <div id='rent-locker-page'>
      <Modal open={lockerModalIsOpen} closeModal={handleChangeLockerModalState}>
        <div className='modal-container locker-modal'>
          <img ref={selectedLockerImgRef} src={LockerImage} />
          {selectedLocker ? (
            <>
              <div className='content'>
                <p className='title'>Armário {selectedLocker.number}</p>
                <div className='info'>
                  <p>
                    Andar:{' '}
                    <span>
                      {selectedLocker!.FK_section_id <= 5
                        ? 'Segundo'
                        : 'Primeiro'}
                    </span>
                  </p>
                  <p>
                    Cor:{' '}
                    <span className='color-span'>
                      {transformHexToPlainText(selectedLocker!.section.color)}
                      <span
                        className='color-span-content'
                        ref={colorSpanRef}
                      ></span>
                    </span>
                  </p>
                  <p>
                    Sala na Esquerda:{'  '}
                    <span>{selectedLocker!.section.left_room}</span>
                  </p>
                  <p>
                    Sala na Direita:{'  '}
                    <span>{selectedLocker!.section.right_room}</span>
                  </p>
                  <p>
                    Situação:{'  '}
                    <span className='disponibility-span'>
                      {selectedLocker!.isRented == false
                        ? 'Disponível'
                        : 'Indisponível'}
                      <span
                        className='disponibility-span-content'
                        ref={disponibilitySpanRef}
                      ></span>
                    </span>
                  </p>
                </div>
                {user.ra != '' ? (
                  <Link
                    to={`/alugar-armario/${selectedLocker!.number}`}
                    onClick={handleChangeLockerModalState}
                  >
                    Quero Alugar!
                  </Link>
                ) : (
                  <Link to='/login' onClick={handleChangeLockerModalState}>
                    Fazer login!
                  </Link>
                )}
              </div>{' '}
            </>
          ) : (
            <div></div>
          )}
        </div>
      </Modal>

      <NavBar />
      <main>
        <div className='title-container'>
          <p className='page-title'>Alugue um Armário</p>
          <p className='page-subtitle'>
            {sectionChoosed
              ? 'Selecione o armário que você deseja alugar.'
              : 'Selecione o bloco de armários que você deseja.'}
          </p>
        </div>
        {!sectionChoosed ? (
          <ChooseLockersSection navigateToSection={setSectionChoosed} />
        ) : (
          <ChooseLocker
            lockers={lockers!}
            changeSection={setSectionChoosed}
            actualSection={sectionChoosed}
            selectLocker={selectLocker}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default RentLockerPage
