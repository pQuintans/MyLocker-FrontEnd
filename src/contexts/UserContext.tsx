import React, { useState, createContext, ReactNode } from 'react'

interface Student {
  ra: string
  first_name: string
  last_name: string
  email: string
  password?: string
  code?: string
  locker_number?: number
  status?: number
}

interface UserContextType {
  user: Student
  setUser: React.Dispatch<React.SetStateAction<Student>>
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<Student>({
    ra: '',
    first_name: '',
    last_name: '',
    email: '',
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
