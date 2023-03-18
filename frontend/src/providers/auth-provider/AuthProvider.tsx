import React, { FC, PropsWithChildren } from 'react'
import { TypeComponentAuthFields } from './auth-page.types'

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({ Component: { isOnlyUser }, children}) => {
  return (
    <div>AuthProvider</div>
  )
}

export default AuthProvider