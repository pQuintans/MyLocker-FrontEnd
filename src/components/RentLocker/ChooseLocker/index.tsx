import React, { useState } from 'react'
import { SectionsTypes } from '../../../Pages/RentLockerPage'

import '../styles.scss'

interface ChooseLocker {
  changeSection: (sectionNumber: SectionsTypes) => void
  actualSection: number
}

export function ChooseLocker({ changeSection, actualSection }: ChooseLocker) {
  return (
    <>
      <div id='rent-lockers' className='choose-locker'>
        {actualSection}
      </div>
    </>
  )
}
