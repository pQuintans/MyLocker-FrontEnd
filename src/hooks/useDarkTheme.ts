import { useContext } from 'react'
import { DarkThemeContext } from '../contexts/DarkThemeContext'

export function useDarkTheme() {
  const value = useContext(DarkThemeContext)

  return value
}
