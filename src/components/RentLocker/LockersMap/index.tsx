import React, { useEffect, useRef } from 'react'

import LockerSectionBlue from '../../../assets/LockerSectionBlue.png'
import LockerSectionGreen from '../../../assets/LockerSectionGreen.png'
import LockerSectionRed from '../../../assets/LockerSectionRed.png'
import LockerSectionYellow from '../../../assets/LockerSectionYellow.png'

import { SectionsTypes } from '../../../Pages/RentLockerPage'

import '../styles.scss'
import './styles.scss'

interface SectionsMap {
  navigateToSection: (sectionNumber: SectionsTypes) => void
  actualSection: number
}

function SectionsMap({ navigateToSection, actualSection }: SectionsMap) {
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const section4Ref = useRef<HTMLDivElement>(null)
  const section5Ref = useRef<HTMLDivElement>(null)
  const section6Ref = useRef<HTMLDivElement>(null)
  const section7Ref = useRef<HTMLDivElement>(null)
  const section8Ref = useRef<HTMLDivElement>(null)

  const sectionsRefs = [
    section1Ref,
    section2Ref,
    section3Ref,
    section4Ref,
    section5Ref,
    section6Ref,
    section7Ref,
    section8Ref,
  ]

  useEffect(() => {
    sectionsRefs.forEach(element => {
      if (parseInt(element.current!.id) == actualSection) {
        element.current!.classList.add('active')
      } else {
        element.current!.classList.remove('active')
      }
    })
  }, [actualSection])

  return (
    <>
      <div id='sections-map' className='choose-locker-section'>
        <div className='in-section'>
          <div className='locker-section' id='1' ref={section1Ref}>
            <img
              onClick={() => navigateToSection(1)}
              src={LockerSectionYellow}
              alt='Bloco Amarelo 1'
            />
          </div>
          <div className='locker-section' id='2' ref={section2Ref}>
            <img
              onClick={() => navigateToSection(2)}
              src={LockerSectionYellow}
              alt='Bloco Amarelo 2'
            />
          </div>
        </div>
        <div className='in-section'>
          <div className='locker-section' id='3' ref={section3Ref}>
            <img
              onClick={() => navigateToSection(3)}
              src={LockerSectionRed}
              alt='Bloco Vermelho 1'
            />
          </div>
          <div className='locker-section' id='4' ref={section4Ref}>
            <img
              onClick={() => navigateToSection(4)}
              src={LockerSectionRed}
              alt='Bloco Vermelho 2'
            />
          </div>
          <div className='locker-section' id='5' ref={section5Ref}>
            <img
              onClick={() => navigateToSection(5)}
              src={LockerSectionRed}
              alt='Bloco Vermelho 3'
            />
          </div>
        </div>
        <div className='in-section'>
          <div className='locker-section' id='6' ref={section6Ref}>
            <img
              onClick={() => navigateToSection(6)}
              src={LockerSectionGreen}
              alt='Bloco Verde'
            />
          </div>
        </div>
        <div className='in-section'>
          <div className='locker-section' id='7' ref={section7Ref}>
            <img
              onClick={() => navigateToSection(7)}
              src={LockerSectionBlue}
              alt='Bloco Azul 1'
            />
          </div>

          <div className='locker-section' id='8' ref={section8Ref}>
            <img
              onClick={() => navigateToSection(8)}
              src={LockerSectionBlue}
              alt='Bloco Azul 2'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SectionsMap
