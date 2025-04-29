import Button from '@/components/button/Button'
import { LogoIcon } from '@/components/icons'
import { FC } from 'react'
import { Link } from 'react-router'

const Login: FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 flex h-full flex-col items-center justify-center duration-800">
      <p className="text-app-gray-200 text-2xl">Welcome to</p>
      <p className="text-app-gray-200 flex items-center gap-1 text-3xl font-extrabold">
        <LogoIcon />
        molinos-app
      </p>

      <Link to="/browser-auth">
        <Button className="mt-8">Log in with Freesound</Button>
      </Link>
    </div>
  )
}

export default Login
