import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren, useEffect } from 'react'
import { useActions } from '../../hooks/useAction'
import { useAuth } from '../../hooks/useAuth'
import { getAccessToken } from '../../services/auth/auth.helper'
import { TypeComponentAuthFields } from './auth-page.types'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({ Component: { isOnlyUser }, children}) => {
    const { user } = useAuth()

    const { checkAuth, logout } = useActions()

    const { pathname } = useRouter()

    useEffect(() => {
        const accessToken = getAccessToken()

        if (accessToken) checkAuth()
    }, [])
    
    useEffect(() => {
        const refreshToken = Cookies.get('refreshToken')
        
        if (!refreshToken && user) logout()
    }, [pathname])

    return isOnlyUser ? <DynamicCheckRole Component={{isOnlyUser}} children={children} /> : <>{children}</>
}

export default AuthProvider