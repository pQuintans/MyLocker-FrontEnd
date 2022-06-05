import React, { useEffect, useRef } from 'react'
import { Locker, SectionsTypes } from '../../../Pages/RentLockerPage'

import LockerImage from '../../../assets/LockerImage.png'

import '../styles.scss'
import './styles.scss'
import SectionsMap from '../LockersMap'

interface ChooseLocker {
  changeSection: (sectionNumber: SectionsTypes) => void
  actualSection: number
  lockers: Locker[]
}

export function ChooseLocker({
  lockers,
  changeSection,
  actualSection,
}: ChooseLocker) {
  const lockersRef = useRef<HTMLDivElement>(null)

  const selectedLockers = lockers.reduce(
    (selectedLockers: Locker[], locker) => {
      if (locker.FK_section_id == actualSection) {
        selectedLockers.push(locker)
      }
      return selectedLockers
    },
    []
  )

  useEffect(() => {
    lockersRef.current!.style.gridTemplateColumns = `repeat(${Math.round(
      selectedLockers.length / 4
    )}, 1fr)`
  }, [actualSection])

  const lockersStyle = {
    backgroundColor: selectedLockers[0].section.color,
  }

  return (
    <>
      <div id='rent-lockers' className='choose-locker'>
        <div className='top-section'>
          <p>{selectedLockers[0].section.left_room}</p>
          <div className='lockers' ref={lockersRef}>
            {selectedLockers.map(locker => {
              return (
                <img
                  style={lockersStyle}
                  src={LockerImage}
                  key={locker.number}
                />
              )
            })}
          </div>
          <p>{selectedLockers[0].section.right_room}</p>
        </div>
        <SectionsMap
          actualSection={actualSection}
          navigateToSection={changeSection}
        />
      </div>
    </>
  )
}
