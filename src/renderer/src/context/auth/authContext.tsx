import { AUTH_STATUS } from '@/context/auth/authEnums'
import * as authService from '@/services/auth'
import { createContext, FC, PropsWithChildren, useLayoutEffect, useState } from 'react'

type AuthContextType = {
  status: AUTH_STATUS
  login: (code: string) => Promise<void>
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>(undefined!)

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [status, setStatus] = useState(AUTH_STATUS.PENDING)

  useLayoutEffect(() => {
    // Initial check for authentication status
    const { accessToken, refreshToken } = getTokenData()

    if (accessToken && refreshToken) {
      setStatus(AUTH_STATUS.AUTHENTICATED)
    } else {
      setStatus(AUTH_STATUS.UNAUTHENTICATED)
    }
  }, [])

  const saveTokenData = (data: authService.TokenData): void => {
    const { accessToken, refreshToken } = data
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  const getTokenData = (): { accessToken?: string; refreshToken?: string } => {
    const accessToken = localStorage.getItem('accessToken') || undefined
    const refreshToken = localStorage.getItem('refreshToken') || undefined
    return { accessToken, refreshToken }
  }

  const login = async (code: string): Promise<void> => {
    try {
      const data = await authService.login(code)
      saveTokenData(data)
      setStatus(AUTH_STATUS.AUTHENTICATED)
    } catch {
      setStatus(AUTH_STATUS.UNAUTHENTICATED)
      throw new Error('Login failed')
    }
  }

  const refreshToken = async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refresh_token')

    if (!refreshToken) {
      throw new Error('No refresh token found in local storage')
    }

    try {
      const data = await authService.refreshToken(refreshToken)
      saveTokenData(data)
      setStatus(AUTH_STATUS.AUTHENTICATED)
    } catch {
      setStatus(AUTH_STATUS.UNAUTHENTICATED)
      throw new Error('Refresh token failed')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        status,
        login,
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export type { AuthContextType }
export { AuthProvider, AuthContext }
