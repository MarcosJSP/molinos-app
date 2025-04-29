import { AuthContext, AuthContextType } from '@/context/auth/authContext'
import { useContext } from 'react'

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
export default useAuth
