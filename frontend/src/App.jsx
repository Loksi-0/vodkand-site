import Index from '@/pages/index/Index.jsx'
import Plugins from '@/pages/plugins/Plugins'
import Account from '@/pages/account/Account'
import Legal from '@/pages/legal/Legal'
import Rules from '@/pages/rules/Rules'
import Prices from '@/pages/prices/Prices'
import Activate from '@/pages/activate/Activate'
import Auth from '@/pages/auth/Auth'
import ProtectedRoute from './global-components/ProtectedRoute/ProtectedRoute'
import Whitelist from './pages/whitelist/Whitelist'
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { useContext, useEffect } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import NotFound from './pages/notFound/notFound'
import GoogleAuth from './pages/googleAuth/googleAuth'
import ScrollToTop from './global-components/ScrollToTop/ScrollToTop'

const App = () => {
    const { store } = useContext(Context)

    useEffect(() => {
        store.initAuth()
    }, [])

    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === null) {
        localStorage.setItem('theme', 'light')
    }

    document.documentElement.setAttribute('theme', savedTheme === 'dark' ? 'dark' : 'light')

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/plugins' element={<Navigate to='/plugins/brewery' replace />} />
                <Route path='/plugins/:page' element={<Plugins />} />
                <Route path='/rules' element={<Navigate to='/rules/bans' replace />} />
                <Route path='/rules/:page' element={<Rules />} />
                <Route path='/legal' element={<Navigate to='/legal/privacy-policy' replace />} />
                <Route path='/legal/:page' element={<Legal />} />
                <Route path='/account' element={
                    <ProtectedRoute redirect='/auth'>
                        <Account />
                    </ProtectedRoute>
                } />
                <Route path='/prices' element={<Prices />} />
                <Route path='/activate' element={<Activate />} />
                <Route path='/auth' element={
                    <ProtectedRoute redirect='/account' access='not-auth'>
                        <Auth />
                    </ProtectedRoute>
                } />
                <Route path='/whitelist' element={
                    <ProtectedRoute redirect='/account' access='has-not-nick'>
                        <Whitelist />
                    </ProtectedRoute>
                } />
                <Route path='/auth/google' element={<GoogleAuth />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>   
    )
}

export default observer(App)