import React from 'react'
import { Locker, SectionsTypes } from '../../../Pages/RentLockerPage'

import '../styles.scss'

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
  const selectedLockers = lockers.reduce(
    (selectedLockers: Locker[], locker) => {
      if (locker.FK_section_id == actualSection) {
        selectedLockers.push(locker)
      }
      return selectedLockers
    },
    []
  )

  const lockersStyle = {
    backgroundColor: selectedLockers[0].section.color,
  }

  return (
    <>
      <div id='rent-lockers' className='choose-locker'>
        {selectedLockers.map(locker => {
          return (
            <div style={lockersStyle} key={locker.number}>
              <p>{locker.number}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
