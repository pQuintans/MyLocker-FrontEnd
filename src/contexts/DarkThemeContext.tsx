import React, { useState, createContext, ReactNode, useEffect } from 'react'

interface DarkThemeContextType {
  darkTheme: boolean
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
}

interface DarkThemeContextProviderProps {
  children: ReactNode
}

export const DarkThemeContext = createContext({} as DarkThemeContextType)

export function DarkThemeContextProvider({
  children,
}: DarkThemeContextProviderProps) {
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    const isDarkModeSet = localStorage.getItem('darkMode')
    if (isDarkModeSet == 'true') {
      return true
    } else if (isDarkModeSet == 'false') {
      return false
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  })

  useEffect(() => {
    localStorage.setItem('darkMode', darkTheme.toString())
  }, [darkTheme])

  return (
    <DarkThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </DarkThemeContext.Provider>
  )
}
