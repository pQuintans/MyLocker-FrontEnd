import React from 'react'

import LockerSectionBlue from '../../assets/LockerSectionBlue.png'
import LockerSectionGreen from '../../assets/LockerSectionGreen.png'
import LockerSectionRed from '../../assets/LockerSectionRed.png'
import LockerSectionYellow from '../../assets/LockerSectionYellow.png'

import './styles.scss'

function ChooseLockersSection() {
  return (
    <div id='choose-lockers-section'>
      <div className='section'>
        <div className='in-section'>
          <p>Sala 10</p>
          <img src={LockerSectionYellow} alt='Bloco Amarelo 1' />
          <p>Sala 11</p>
          <img src={LockerSectionYellow} alt='Bloco Amarelo 2' />
          <p>Sala 12</p>
        </div>
        <div className='in-section'>
          <p>Sala 2</p>
          <img src={LockerSectionGreen} alt='Bloco Verde' />
          <p>Sala 3</p>
        </div>
      </div>
      <div className='section'>
        <div className='in-section'>
          <p>Sala 10</p>
          <img src={LockerSectionRed} alt='Bloco Vermelho 1' />
          <p>Sala 11</p>
          <img src={LockerSectionRed} alt='Bloco Vermelho 2' />
          <p>Sala 11</p>
          <img src={LockerSectionRed} alt='Bloco Vermelho 3' />
          <p>Sala 12</p>
        </div>
        <div className='in-section'>
          <p>Sala 2</p>
          <img src={LockerSectionBlue} alt='Bloco Azul 1' />
          <p>Sala 3</p>
          <img src={LockerSectionBlue} alt='Bloco Azul 2' />
          <p>Sala 3</p>
        </div>
      </div>
    </div>
  )
}

export default ChooseLockersSection
