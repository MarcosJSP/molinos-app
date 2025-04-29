import { AuthProvider } from '@/context/auth/authContext'
import AuthGuard from '@/layout/AuthGuard'
import UnauthGuard from '@/layout/UnauthGuard'
import UnauthLayout from '@/layout/UnauthLayout'
import Browse from '@/pages/Browse'
import BrowserAuth from '@/pages/BrowserAuth'
import Login from '@/pages/Login'
import { JSX } from 'react'
import { HashRouter, Route, Routes } from 'react-router'

function App(): JSX.Element {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route element={<UnauthGuard />}>
            <Route element={<UnauthLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="/browser-auth" element={<BrowserAuth />} />
            </Route>
          </Route>
          <Route element={<AuthGuard />}>
            <Route path="/browse" element={<Browse />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
