import Index from '@/pages/indexPage/index'
import Plugins from '@/pages/plugins'
import Account from '@/pages/account'
import Legal from '@/pages/legal'
import Rules from '@/pages/rules'
import Prices from '@/pages/prices'
import Activate from '@/pages/activate'
import Auth from '@/pages/auth'
import Payment from '@/pages/payment'
import Pending from '@/features/payment-page/Pending/Pending'
import Whitelist from '@/pages/whitelist'
import NotFound from '@/pages/notFound'
import GoogleAuth from '@/pages/googleAuth'

import ProtectedRoute from '@/features/protected-route/ProtectedRoute'
import ScrollToTop from '@/shared/ui/ScrollToTop/ScrollToTop'

import { AuthProvider } from '@/features/auth-page'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

// prettier-ignore

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/plugins' element={
            <Navigate to='/plugins/brewery' replace />
          }
        />
        <Route path='/plugins/:page' element={<Plugins />} />
        <Route path='/rules' element={
            <Navigate to='/rules/bans' replace
            />
          }
        />
        <Route path='/rules/:page' element={<Rules />} />
        <Route path='/legal' element={
            <Navigate to='/legal/privacy-policy' replace />
          }
        />
        <Route path='/legal/:page' element={<Legal />} />
        <Route path='/account' element={
            <ProtectedRoute redirect='/auth' access='auth'>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path='/prices' element={<Prices />} />
        <Route path='/activate' element={<Activate />} />
        <Route path='/auth' element={
            <ProtectedRoute redirect='/account' access='not-auth'>
              <AuthProvider>
                <Auth />
              </AuthProvider>
            </ProtectedRoute>
          }
        />
        <Route path='/whitelist' element={
            <ProtectedRoute redirect='/account' access='has-not-nick'>
              <Whitelist />
            </ProtectedRoute>
          }
        />
        <Route path='/payment' element={
            <ProtectedRoute redirect='/account' access='activated'>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route path='/payment/:status' element={
            <ProtectedRoute redirect='/account' access='activated'>
              <Pending />
            </ProtectedRoute>
          }
        />
        <Route path='/auth/google' element={<GoogleAuth />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
