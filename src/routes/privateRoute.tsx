import React from 'react'

import { Navigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

interface privateRoutesInterface {
  children: JSX.Element
}

export function PrivateRoute({ children }: privateRoutesInterface) {
  const { user } = useUser()

  if (!user.ra) {
    return <Navigate to='/login' />
  }

  return children
}
