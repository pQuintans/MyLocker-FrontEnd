import { useContext } from 'react'
import { LockerContext } from '../contexts/LockerContext'

export function useLocker() {
  const value = useContext(LockerContext)

  return value
}
