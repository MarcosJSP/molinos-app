import { FC } from 'react'
import { Outlet } from 'react-router'

const UnauthLayout: FC = () => {
  return (
    <div className="h-screen w-screen max-w-full overflow-hidden bg-[radial-gradient(133.48%_52.24%_at_50%_100%,_rgba(13,_91,_254,_0.35)_0%,_rgba(237,_240,_246,_0.1015)_100%)] px-3.5 pt-6 pb-2">
      <Outlet />
    </div>
  )
}

export default UnauthLayout
