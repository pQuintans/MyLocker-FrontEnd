import React from 'react'

import { Routes as MyRoutes, Route } from 'react-router-dom'
import { PrivateRoute } from './privateRoute'

import ProfilePage from '../Pages/ProfilePage'
import ApmPage from '../Pages/ApmPage'
import ConfirmRentPage from '../Pages/ConfirmRentPage'

export function PrivateRoutes() {
  return (
    <MyRoutes>
      <Route
        path='/perfil'
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path='/apm'
        element={
          <PrivateRoute>
            <ApmPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/alugar-armario/:lockersNumString'
        element={
          <PrivateRoute>
            <ConfirmRentPage />
          </PrivateRoute>
        }
      />
    </MyRoutes>
  )
}
