import React, { useState, createContext, ReactNode } from 'react'

type SectionType = {
  id: number
  color: string
  left_room: string
  right_room: string
  status: number
}
export interface Locker {
  number: number
  isRented: boolean
  rentedAt: string | null
  FK_section_id: number
  status: number
  section: SectionType
}

interface LockerContextType {
  locker: Locker | null
  setLocker: React.Dispatch<React.SetStateAction<Locker | null>>
}

interface LockerContextProviderProps {
  children: ReactNode
}

export const LockerContext = createContext({} as LockerContextType)

export function LockerContextProvider({
  children,
}: LockerContextProviderProps) {
  const [locker, setLocker] = useState<Locker | null>(null)

  return (
    <LockerContext.Provider value={{ locker, setLocker }}>
      {children}
    </LockerContext.Provider>
  )
}
