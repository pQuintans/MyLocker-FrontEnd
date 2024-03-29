import { AxiosResponse } from 'axios'
import React, { useState, createContext, ReactNode, useEffect } from 'react'
import api from '../api'

interface Apm {
  id: number
  status: number
}

export interface Student {
  ra: string
  first_name: string
  last_name: string
  email: string
  password?: string
  code?: string
  locker_number?: number
  status?: number
  profile_picture_url?: string
  apm: Apm[]
  apmCount: number
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
    apm: [],
    apmCount: 0,
  })

  useEffect(() => {
    api
      .get('/validate/students', { withCredentials: true })
      .then((response: AxiosResponse) => {
        setUser(response.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
