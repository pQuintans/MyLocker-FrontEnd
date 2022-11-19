import React from 'react'

import { PublicRoutes } from './publicRoutes'
import { PrivateRoutes } from './privateRoutes'

export function Routes() {
  return (
    <>
      <PublicRoutes />
      <PrivateRoutes />
    </>
  )
}
