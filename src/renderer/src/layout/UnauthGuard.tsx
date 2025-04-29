import { AUTH_STATUS } from '@/context/auth/authEnums'
import useAuth from '@/context/auth/useAuth'
import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

const UnauthGuard: FC = () => {
  const { status } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (status == AUTH_STATUS.AUTHENTICATED) {
      navigate('/browse')
    }
  }, [status, navigate])
  return <Outlet />
}

export default UnauthGuard
