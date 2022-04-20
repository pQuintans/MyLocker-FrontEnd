import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export function useUser() {
  const value = useContext(UserContext)

  return value
}
