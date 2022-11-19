import React from 'react'

import LockerSectionBlue from '../../../assets/LockerSectionBlue.png'
import LockerSectionGreen from '../../../assets/LockerSectionGreen.png'
import LockerSectionRed from '../../../assets/LockerSectionRed.png'
import LockerSectionYellow from '../../../assets/LockerSectionYellow.png'
import { useDarkTheme } from '../../../hooks/useDarkTheme'

import { SectionsTypes } from '../../../Pages/RentLockerPage'

import '../styles.scss'
import './styles.scss'

interface ChooseLockersSection {
  navigateToSection: (sectionNumber: SectionsTypes) => void
}

function ChooseLockersSection({ navigateToSection }: ChooseLockersSection) {
  const { darkTheme } = useDarkTheme()

  return (
    <>
      <div
        id='rent-lockers'
        className={(darkTheme ? 'dark' : '') + ' choose-locker-section'}
      >
        <div className='in-section'>
          <p>Sala 10</p>
          <img
            onClick={() => navigateToSection(1)}
            id='1'
            src={LockerSectionYellow}
            alt='Bloco Amarelo 1'
          />
          <p>Sala 11</p>
          <img
            onClick={() => navigateToSection(2)}
            id='2'
            src={LockerSectionYellow}
            alt='Bloco Amarelo 2'
          />
          <p>Sala 12</p>
        </div>
        <div className='in-section'>
          <p>Saúde</p>
          <img
            onClick={() => navigateToSection(3)}
            id='3'
            src={LockerSectionRed}
            alt='Bloco Vermelho 1'
          />
          <p>Sala 13</p>
          <img
            onClick={() => navigateToSection(4)}
            id='4'
            src={LockerSectionRed}
            alt='Bloco Vermelho 2'
          />
          <p>Sala 14</p>
          <img
            onClick={() => navigateToSection(5)}
            id='5'
            src={LockerSectionRed}
            alt='Bloco Vermelho 3'
          />
          <p>Sala 15</p>
        </div>
        <div className='in-section'>
          <p>Sala 2</p>
          <img
            onClick={() => navigateToSection(6)}
            id='6'
            src={LockerSectionGreen}
            alt='Bloco Verde'
          />
          <p>Sala 3</p>
        </div>
        <div className='in-section'>
          <p>Vestiário Masculino</p>
          <img
            onClick={() => navigateToSection(7)}
            id='7'
            src={LockerSectionBlue}
            alt='Bloco Azul 1'
          />
          <p>Sala 4</p>
          <img
            onClick={() => navigateToSection(8)}
            id='8'
            src={LockerSectionBlue}
            alt='Bloco Azul 2'
          />
          <p>Sala 5</p>
        </div>
      </div>
    </>
  )
}

export default ChooseLockersSection
