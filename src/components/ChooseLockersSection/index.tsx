import React, { useState } from 'react'

import LockerSectionBlue from '../../assets/LockerSectionBlue.png'
import LockerSectionGreen from '../../assets/LockerSectionGreen.png'
import LockerSectionRed from '../../assets/LockerSectionRed.png'
import LockerSectionYellow from '../../assets/LockerSectionYellow.png'

import './styles.scss'

function ChooseLockersSection() {
  const [lockersSectionIsChoosed, setLockersSectionIsChoosed] = useState(false)
  return (
    <>
      {!lockersSectionIsChoosed ? (
        <div id='choose-lockers-section' className='choose-locker'>
          <div className='in-section'>
            <p>Sala 10</p>
            <img
              onClick={() => setLockersSectionIsChoosed(true)}
              id='1'
              src={LockerSectionYellow}
              alt='Bloco Amarelo 1'
            />
            <p>Sala 11</p>
            <img
              onClick={() => setLockersSectionIsChoosed(true)}
              id='2'
              src={LockerSectionYellow}
              alt='Bloco Amarelo 2'
            />
            <p>Sala 12</p>
          </div>
          <div className='in-section'>
            <p>Sala 10</p>
            <img
              onClick={() => setLockersSectionIsChoosed(true)}
              id='3'
              src={LockerSectionRed}
              alt='Bloco Vermelho 1'
            />
            <p>Sala 11</p>
            <img
              onClick={() => setLockersSectionIsChoosed(true)}
              id='4'
              src={LockerSectionRed}
              alt='Bloco Vermelho 2'
            />
            <p>Sala 11</p>
            <img
              onClick={() => setLockersSectionIsChoosed(true)}
              id='5'
              src={LockerSectionRed}
              alt='Bloco Vermelho 3'
            />
            <p>Sala 12</p>
          </div>
          <div className='in-section'>
            <p>Sala 2</p>
            <img
              onClick={() => setLockersSectionIsChoosed(true)}
              id='6'
              src={LockerSectionGreen}
              alt='Bloco Verde'
            />
            <p>Sala 3</p>
          </div>
          <div className='in-section'>
            <p>Sala 2</p>
            <img
              onClick={() => setLockersSectionIsChoosed(true)}
              id='7'
              src={LockerSectionBlue}
              alt='Bloco Azul 1'
            />
            <p>Sala 3</p>
            <img
              onClick={() => setLockersSectionIsChoosed(true)}
              id='8'
              src={LockerSectionBlue}
              alt='Bloco Azul 2'
            />
            <p>Sala 3</p>
          </div>
        </div>
      ) : (
        <div className='choose-locker'></div>
      )}
    </>
  )
}

export default ChooseLockersSection
