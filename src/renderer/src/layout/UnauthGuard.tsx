import { AUTH_STATUS } from '@/providers/authProvider/authEnums'
import useAuth from '@/providers/authProvider/useAuth'
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
