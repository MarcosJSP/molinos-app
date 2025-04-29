import { AuthProvider } from '@/providers/authProvider/authProvider'
import AuthGuard from '@/layout/AuthGuard'
import UnauthGuard from '@/layout/UnauthGuard'
import UnauthLayout from '@/layout/UnauthLayout'
import Browse from '@/pages/Browse'
import BrowserAuth from '@/pages/BrowserAuth'
import Login from '@/pages/Login'
import { JSX } from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import QueryProvider from '@/providers/queryProvider'

function App(): JSX.Element {
  return (
    <QueryProvider>
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
    </QueryProvider>
  )
}

export default App
