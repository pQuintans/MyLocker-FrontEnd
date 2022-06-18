import React, { useRef } from 'react'

import SectionsMap from '../LockersMap'

import { SectionsTypes } from '../../../Pages/RentLockerPage'
import { Locker } from '../../../contexts/LockerContext'

import LockerImage from '../../../assets/LockerImage.png'

import '../styles.scss'
import './styles.scss'
import { useDarkTheme } from '../../../hooks/useDarkTheme'

interface ChooseLocker {
  changeSection: (sectionNumber: SectionsTypes) => void
  actualSection: number
  lockers: Locker[]
  selectLocker: (locker: Locker) => void
}

export function ChooseLocker({
  lockers,
  changeSection,
  actualSection,
  selectLocker,
}: ChooseLocker) {
  const { darkTheme } = useDarkTheme()
  const lockersRef = useRef<HTMLDivElement>(null)

  function splitArrayInPieces(lockers: Locker[], tamanho: number) {
    const lockersSplited = []
    let i = 0
    while (i < lockers.length) {
      lockersSplited.push(lockers.slice(i, i + tamanho))
      i += tamanho
    }
    return lockersSplited
  }

  const selectedLockers = splitArrayInPieces(
    lockers.reduce((selectedLockers: Locker[], locker) => {
      if (locker.FK_section_id == actualSection) {
        selectedLockers.push(locker)
      }
      return selectedLockers
    }, []),
    8
  )

  const lockersStyle = {
    backgroundColor: selectedLockers[0][0].section.color,
  }

  return (
    <>
      <div
        id='rent-lockers'
        className={(darkTheme ? 'dark' : '') + ' choose-locker '}
      >
        <div className='top-section'>
          <p>{selectedLockers[0][0].section.left_room}</p>
          <div className='lockers' ref={lockersRef}>
            {selectedLockers.map((lockersParsed, index) => {
              return (
                <div className='lockers-parsed' key={index}>
                  {lockersParsed.map(locker => {
                    return (
                      <div
                        className={
                          'img-container' + (locker.isRented ? ' rented' : '')
                        }
                        key={locker.number}
                        style={lockersStyle}
                      >
                        <img
                          src={LockerImage}
                          onClick={() => {
                            selectLocker(locker)
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <p>{selectedLockers[0][0].section.right_room}</p>
        </div>
        <SectionsMap
          actualSection={actualSection}
          navigateToSection={changeSection}
        />
      </div>
    </>
  )
}
